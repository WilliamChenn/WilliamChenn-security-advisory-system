class ApplicationController < ActionController::API
    include ActionController::Cookies

    IDP_CERT = File.read('config/saml/idp.crt')
    SP_CERT = File.read('config/saml/certificate.crt')
    SP_KEY = File.read('config/saml/privateKey.key')
    SP_ENTITIY_ID = "https://securityadvisory.com" # this value must start with http:// or https BUT does not have to be a "real" url (i.e. does not have to resolve).
    SP_ACS = ENV['REACT_APP_BACKEND_URL'] + "/saml" # this is going to be where you want the IDP to send the data after the user logs in.
  

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
            uid = saml_response.attributes['urn:oid:0.9.2342.19200300.100.1.1']
            mail = saml_response.attributes['urn:oid:0.9.2342.19200300.100.1.3']
            displayName = saml_response.attributes['urn:oid:2.16.840.1.113730.3.1.241']
            # Find or create the user
            user = User.find_or_create_by(uid: uid) do |user|
                user.email = mail
                user.name = displayName
            end
            # Generate and set auth token
            token = SecureRandom.hex
            user.update(auth_token: token)
            #islogged in will take the token from the cookie and verify that the user is logged in, 
                #get token from cookie
                #return user
            #axios.get(BASE_URL + '/isloggedin', { withCredentials: true });
            cookies.signed[:auth_token] = {
                value: token,
                httponly: true,
                #secure: Rails.env.production?, # Set to true in production for security
                #same_site: :strict
              }
            redirect_to ENV['FRONT_END_URL']
        else
            raise StandardError
        end
    end

    def is_logged_in
        token = cookies.signed[:auth_token]
        logger.info("Auth token from cookies: #{token}")
        
        if token
            user = User.find_by(auth_token: token)
            if user
                logger.info("User found: ID=#{user.id}, Email=#{user.email}, Name=#{user.name}")
                render json: { logged_in: true, user: { id: user.id, email: user.email, name: user.name } }, status: :ok
            else
                logger.error("No user found with auth token: #{token}")
                render json: { logged_in: false, message: "DOESNT WORK: No user found" }, status: :unauthorized
            end
        else
            logger.error("No auth token present in cookies")
            render json: { logged_in: false, message: "DOESNT WORK: No token present" }, status: :unauthorized
        end
    end

#ce947e6a938bb72ff9773eb02c71a39d

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
