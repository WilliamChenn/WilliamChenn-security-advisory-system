# app/services/fetch_remediation_url_service.rb

require 'httparty'

class FetchRemediationUrlService
  BASE_REMEDIATION_API_URL = 'https://www.cvedetails.com/api/v1/vulnerability/mentions'

  def self.call(cve_id)
    token = "fdb257e4055dea878e52daf357430e045a54880e.eyJzdWIiOjQ3MzEsImlhdCI6MTcxOTM0MzAyNiwiZXhwIjoxNzI0NzE2ODAwLCJraWQiOjEsImMiOiI3ak43MWk1WXZKNjRQZmhyVFg0ZWVXY0xETklsdzBheHlVN2xIa3MwTWpzU0pIWnJXWXBDM2RENWJlUHloaEhWK2RQbnlsdFoifQ=="
    
    url = "#{BASE_REMEDIATION_API_URL}/#{cve_id}"
    
    response = HTTParty.get(url, headers: { "Authorization" => "Bearer #{token}" })
    
    if response.success?
      if response.parsed_response['results'].any?
        remediation_data = response.parsed_response['results'].first
        return remediation_data['primaryUrl']
      end
    else
      nil
    end
  end
end


