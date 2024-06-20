class ApplicationController < ActionController::API

    IDP_CERT = File.read('config/saml/idp.crt')
    SP_CERT = File.read('config/saml/certificate.crt')
    SP_KEY = File.read('config/saml/privateKey.key')
    SP_ENTITIY_ID = "https://securityadvisory.com" # this value must start with http:// or https BUT does not have to be a "real" url (i.e. does not have to resolve).
    SP_ACS = "http://localhost:3001/saml" # this is going to be where you want the IDP to send the data after the user logs in.
  

    def saml_consume

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
