Rails.application.config.middleware.use OmniAuth::Builder do
    provider :saml,
             issuer: 'https://your-app.com',
             idp_sso_target_url: 'https://shib.oit.duke.edu/idp/profile/SAML2/Redirect/SSO',
             idp_cert_fingerprint: 'YOUR_IDP_CERT_FINGERPRINT',
             name_identifier_format: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
             assert_consumer_service_url: 'https://your-app.com/auth/saml/callback',
             idp_sso_target_url_runtime_params: { original_request_param: :mapped_idp_param },
             idp_cert: <<-CERT
  -----BEGIN CERTIFICATE-----
  YOUR_CERTIFICATE_HERE
  -----END CERTIFICATE-----
             CERT
  end
  