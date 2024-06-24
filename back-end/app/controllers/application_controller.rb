class ApplicationController < ActionController::API
    include ActionController::Cookies

    IDP_CERT = File.read('config/saml/idp.crt')
    SP_CERT = File.read('config/saml/certificate.crt')
    SP_KEY = File.read('config/saml/privateKey.key')
    SP_ENTITIY_ID = "https://securityadvisory.com" # this value must start with http:// or https BUT does not have to be a "real" url (i.e. does not have to resolve).
    SP_ACS = "http://localhost:3001/saml" # this is going to be where you want the IDP to send the data after the user logs in.
  

    def saml_auth
        request = OneLogin::RubySaml::Authrequest.new
        redirect_to request.create(saml_settings), allow_other_host: true
    end

    # get the saml response, and do with it as you will
    def saml_consume
        logger = Logger.new('log/saml.log')
        saml_response = OneLogin::RubySaml::Response.new(params['SAMLResponse'], settings: saml_settings,
                                                                                allowed_clock_drift: 2.seconds)
        logger.info("SAML RESPONSE: #{saml_response}")
        logger.info("VALID SAML: #{saml_response.is_valid?}")
        logger.info("SAML ERRORS: #{saml_response.errors}")
        if saml_response.is_valid?
            # Extract attributes
            eduPersonPrincipalName = saml_response.attributes['eduPersonPrincipalName']
            eduPersonScopedAffiliation = saml_response.attributes['eduPersonScopedAffiliation']
            uid = saml_response.attributes['uid']
            mail = saml_response.attributes['mail']
            displayName = saml_response.attributes['displayName']

            # Find or create the user
            user = User.find_or_create_by(Uid: uid) do |user|
                user.email = mail
                user.name = displayName
            end

            # Generate and set auth token
            token = SecureRandom.hex
            user.update(auth_token: token)
        
            #reset migrations, get rid of all users and stuff
            #islogged in will take the token from the cookie and verify that the user is logged in, 
                #get token from cookie
                #return user
            #def whoami -->routable from front end
                #return isloggedin
            #axios.get(BASE_URL + '/isloggedin', { withCredentials: true });

            cookies.signed[:auth_token] = {
                value: token,
                httponly: true,
                #secure: Rails.env.production?, # Set to true in production for security
                #same_site: :strict
              }


            redirect_to "http://localhost:3000"
        else
            raise StandardError
        end
    end


    private

    def saml_settings
      settings = OneLogin::RubySaml::Settings.new
      settings.assertion_consumer_service_url = SP_ACS
      settings.issuer                         = SP_ENTITIY_ID
      settings.idp_sso_target_url             = 'https://shib.oit.duke.edu/idp/profile/SAML2/Redirect/SSO'
  
      logger = Logger.new('log/saml-settings.log')
  
      # certificate to register with IDP
      settings.certificate = SP_CERT
      logger.info("SP Cert: #{SP_CERT}")
  
      # key to decrypt SAML response
      settings.private_key = SP_KEY
      logger.info("SP KEY: #{SP_KEY}")
  
      # certificate to verify IDP signature
      settings.idp_cert = IDP_CERT
      logger.info("IDP CERT: #{IDP_CERT}")
  
      # inidcates SP wants assertions to be signed
      settings.security[:want_responses_signed] = true
  
      settings
    end
  


end
