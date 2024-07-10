require 'httparty'

class FetchKevDataService
  BASE_KEV_API_URL = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json'
  BASE_LOGO_API_URL = 'https://api.api-ninjas.com/v1/logo?name='
  API_KEY = 'htv2wRjglIpydDSbTr78ow==cZANkAKzusXCtvFN'

  def self.call
    vulnerabilities.each do |vuln|
      vendor_name = vuln['vendorProject']
      logo_response = HTTParty.get("#{BASE_LOGO_API_URL}#{vendor_name}", headers: { "X-Api-Key" => API_KEY })

      # Ensure the vendor exists in the vendors table
      vendor = Vendor.find_or_create_by(name: vendor_name) do |v|
        if logo_response.success?
          logo_data = logo_response.parsed_response.first
          v.vendor_url = logo_data['image'] if logo_data && logo_data['image']
        end
      end

      unless vendor.persisted?
        vendor.save
        if vendor.errors.any?
          puts "Failed to create vendor: #{vendor_name}. Errors: #{vendor.errors.full_messages.join(', ')}"
          next
        end
      end

      # Ensure the CVE exists in the cves table and update or create
      cve = CVE.find_or_create_by(cve_id: vuln['cveID'])
      cve.update(
        vendor: vendor, # Associate CVE with the correct Vendor
        publish_date: vuln['dateAdded'],
        summary: vuln['shortDescription'],
        cisa_required_action: vuln['requiredAction'],
        cisa_action_due: vuln['dueDate'],
        cisa_notes: vuln['notes'],
        source: 'kev catalogue',
        product: vuln['product'],
        known_ransomware_campaign_use: vuln['knownRansomwareCampaignUse'],
        vulnerability_name: vuln['vulnerabilityName']
      )

      if cve.save
        puts "CVE record saved successfully for CVE ID: #{vuln['cveID']}"
      else
        puts "Failed to save CVE record for CVE ID: #{vuln['cveID']}. Errors: #{cve.errors.full_messages.join(', ')}"
      end
    end
  end

  def self.vulnerabilities(number_of_days = nil)
    response = HTTParty.get(BASE_KEV_API_URL)
    
    if response.success?
      response.parsed_response['vulnerabilities'] || []
    else
      []
    end
  end
end
