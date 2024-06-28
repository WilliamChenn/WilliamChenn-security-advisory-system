# app/services/fetch_remediation_url_service.rb

require 'httparty'

class FetchRemediationUrlService
  BASE_REMEDIATION_API_URL = 'https://www.cvedetails.com/api/v1/vulnerability/mentions?cveId='

  def self.call(cve_id)
    token = "f63628992e62f5d6ac84bdb1ab93025173ce4755.eyJzdWIiOjQ3MjUsImlhdCI6MTcxNzUyMzYzOSwiZXhwIjoxNzIyMzg0MDAwLCJraWQiOjEsImMiOiI3RCt3MkZoTnZDdFZNeFByWUFyM0dEdDlaVWZDNGhZcUNqOUVXU0t1M3owd080bFZ3dVQyTm04V3ZiUlNoSjFrRkk5SGNzTksifQ=="
    
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
