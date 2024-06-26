# app/services/fetch_kev_data_service.rb

class FetchKEVDataService
    def self.call
      vulnerabilities.each do |vuln|
        kev = KEV.find_or_create_by(cve_id: vuln['cveID']) do |kev|
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
  
    private
  
    def self.vulnerabilities
      # Implement your logic to fetch vulnerabilities here
      # Example: fetching from a JSON file (replace with your actual API call)
      json_data = File.read(Rails.root.join('lib', 'data', 'kev.json'))
      JSON.parse(json_data)['vulnerabilities']
    end
  end
  