require 'httparty'

class FetchKEVDataService
  BASE_KEV_API_URL = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json'
  API_KEY = '9a77dc46-e67e-46a6-bff9-7e0110b13996'

  def self.call
    url = "#{BASE_KEV_API_URL}"
    token = "f63628992e62f5d6ac84bdb1ab93025173ce4755.eyJzdWIiOjQ3MjUsImlhdCI6MTcxNzUyMzYzOSwiZXhwIjoxNzIyMzg0MDAwLCJraWQiOjEsImMiOiI3RCt3MkZoTnZDdFZNeFByWUFyM0dEdDlaVWZDNGhZcUNqOUVXU0t1M3owd080bFZ3dVQyTm04V3ZiUlNoSjFrRkk5SGNzTksifQ=="
    response = HTTParty.get(url, headers: { "Authorization" => "Bearer #{token}" })
   
    if response.success?
      data = response.parsed_response
      vulnerabilities = data['vulnerabilities']

      vulnerabilities.each do |vuln|
        kev = KEV.find_or_create_by(cve_id: vuln['cveID']) do |kev|
          kev.update(
            cve_id: vuln['cveID'],
            vendor_project: vuln['vendorProject'],
            product: vuln['product'],
            vulnerability_name: vuln['vulnerabilityName'],
            date_added: vuln['dateAdded'],
            short_description: vuln['shortDescription'],
            required_action: vuln['requiredAction'],
            due_date: vuln['dueDate'],
            known_ransomware_campaign_use: vuln['knownRansomwareCampaignUse'],
            notes: vuln['notes']
            # Add more attributes as needed based on your KEV JSON structure
          )
        end
      end
    else
      Rails.logger.error("Failed to fetch KEV data: #{response.body}")
    end
  end
end
