# app/services/fetch_kev_data_service.rb

class FetchKevDataService

BASE_KEV_API_URL = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json'
    
  def self.call
    puts vulnerabilities
      vulnerabilities(30).each do |vuln|
        kev = Kev.find_or_create_by(cve_id: vuln['cveID']) do |kev|
          kev.vendor_project = vuln['vendorProject']
          kev.product = vuln['product']
          kev.vulnerability_name = vuln['vulnerabilityName']
          kev.date_added = vuln['dateAdded']
          kev.short_description = vuln['shortDescription']
          kev.required_action = vuln['requiredAction']
          kev.due_date = vuln['dueDate']
          kev.known_ransomware_campaign_use = vuln['knownRansomwareCampaignUse']
          kev.notes = vuln['notes']
          # Add more attributes as needed
          kev.save
        end
      end
    end
  
  

  def self.vulnerabilities_since(number_of_days = nil)
    if number_of_days.nil?
        response = HTTParty.get("#{BASE_KEV_API_URL}")
    else
        response = HTTParty.get("#{BASE_KEV_API_URL}&field_date_added_wrapper=#{number_of_days}")
    end
    if response.success? && response.parsed_response['vulnerabilities'].any?
      return response.parsed_response['vulnerabilities']
    else
      nil
    end
end
end
  