# app/services/fetch_remediation_url_service.rb

require 'httparty'

class FetchRemediationUrlService
  BASE_REMEDIATION_API_URL = 'https://www.cvedetails.com/api/v1/vulnerability/mentions?cveId='

  def self.call(cve_id)
    token = "18cb1603c8ffc3ac612b5e198da700dd10868f8e.eyJzdWIiOjQ3MzEsImlhdCI6MTcxOTM0MzczMCwiZXhwIjoxNzI0NzE2ODAwLCJraWQiOjEsImMiOiIyMElsM0hQXC9ia25cL2VCQ21Cb0lreWJxdDVLVnN6dFR3bUxuVlZDVVJ4NUVzc0R5SnE5dXBaTDh6RmRqMXJvMEhoUmtiVHF0eSJ9"
    
    url = "#{BASE_REMEDIATION_API_URL}#{cve_id}"
    
    response = HTTParty.get(url, headers: { "Authorization" => "Bearer #{token}" })
    
    if response.success?
      if response.parsed_response['results'].any?
        remediation_data = response.parsed_response['results'].first
        return remediation_data['primaryUrl']
      end
    else
        return {
            status: response.code,
            message: response.message,
            body: response.body
          }
    end

  end
end
