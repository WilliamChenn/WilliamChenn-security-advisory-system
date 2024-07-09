require 'httparty'

class FetchCVEDataService
  BASE_CVE_API_URL = 'https://www.cvedetails.com/api/v1/vulnerability/search?outputFormat=json'
  BASE_LOGO_API_URL = 'https://api.api-ninjas.com/v1/logo?name='
  API_KEY = 'htv2wRjglIpydDSbTr78ow==cZANkAKzusXCtvFN'

  def self.call(vendor_name)
    url = "#{BASE_CVE_API_URL}&vendorName=#{vendor_name}&pageNumber=1&resultsPerPage=20"
    token = "274cdceb8a11ea126d8dd9e3ce9d48d0fd668a03.eyJzdWIiOjU1MjksImlhdCI6MTcyMDUzODQwNCwiZXhwIjoxNzIzMTYxNjAwLCJraWQiOjEsImMiOiJybHJnd2pRMW9TeVFZOWdoMUlZUXBYSWpWeXZwYXB5ZkxMR3k1YWFuWm1xMFlwcTQzbG9EOHREOUcrVWZjZytic202TnlTNnQifQ=="
    response = HTTParty.get(url, headers: { "Authorization" => "Bearer #{token}" })
    logo_response = HTTParty.get("#{BASE_LOGO_API_URL}#{vendor_name}", headers: { "X-Api-Key" => API_KEY })

    if response.success?
      
      response.parsed_response['results'].each do |vuln|
        vendor = Vendor.find_or_create_by(vendor_id: vuln['vendor_id']) do |v|
          if logo_response.success?
            logo_data = logo_response.parsed_response.first
            v.vendor_url = logo_data['image'] if logo_data && logo_data['image']
          end
          v.name = vuln['vendor']
          v.vendor_id = vuln['vendor_id']
        end
        remediation = FetchRemediationUrlService.call(vuln['cveId'])
        


        cve=CVE.find_or_create_by(cve_id: vuln['cveId'])
        #CVE.find_or_create_by(cve_id: vuln['cveId']) do |cve|
          cve.update(
            vendor: vendor, # Associate CVE with the correct Vendor
            remediation_url: remediation,
            assigner: vuln['assigner'],
            assigner_source_name: vuln['assignerSourceName'],
            cve_number: vuln['cveNumber'],
            cve_year: vuln['cveYear'],
            publish_date: vuln['publishDate'],
            update_date: vuln['updateDate'],
            exploit_exists: convert_to_boolean(vuln['exploitExists']),
            exploit_existence_change_date: vuln['exploitExistenceChangeDate'],
            is_in_cisa_kev: convert_to_boolean(vuln['isInCISAKEV']),
            assigner_id: vuln['assignerId'],
            nvd_vuln_status: vuln['nvdVulnStatus'],
            summary: vuln['summary'],
            evaluator_comment: vuln['evaluatorComment'],
            evaluator_solution: vuln['evaluatorSolution'],
            evaluator_impact: vuln['evaluatorImpact'],
            cisa_exploit_add: vuln['cisaExploitAdd'],
            cisa_action_due: vuln['cisaActionDue'],
            cisa_vulnerability_name: vuln['cisaVulnerabilityName'],
            cisa_required_action: vuln['cisaRequiredAction'],
            cisa_short_description: vuln['cisaShortDescription'],
            cisa_notes: vuln['cisaNotes'],
            epss_score: vuln['epssScore'],
            epss_score_change_date: vuln['epssScoreChangeDate'],
            epss_percentile: vuln['epssPercentile'],
            config_count: vuln['configCount'],
            config_condition_count: vuln['configConditionCount'],
            vendor_comment_count: vuln['vendorCommentCount'],
            reference_count: vuln['referenceCount'],
            metric_count: vuln['metricCount'],
            weakness_count: vuln['weaknessCount'],
            max_cvss_base_score: vuln['maxCvssBaseScore'],
            max_cvss_base_score_v3: vuln['maxCvssBaseScorev3'],
            max_cvss_base_score_change_date: vuln['maxCvssBaseScoreChangeDate'],
            max_cvss_exploitability_score: vuln['maxCvssExploitabilityScore'],
            max_cvss_impact_score: vuln['maxCvssImpactScore'],
            is_overflow: convert_to_boolean(vuln['isOverflow']),
            is_memory_corruption: convert_to_boolean(vuln['isMemoryCorruption']),
            is_sql_injection: convert_to_boolean(vuln['isSqlInjection']),
            is_xss: convert_to_boolean(vuln['isXss']),
            is_directory_traversal: convert_to_boolean(vuln['isDirectoryTraversal']),
            is_file_inclusion: convert_to_boolean(vuln['isFileInclusion']),
            is_csrf: convert_to_boolean(vuln['isCsrf']),
            is_xxe: convert_to_boolean(vuln['isXxe']),
            is_ssrf: convert_to_boolean(vuln['isSsrf']),
            is_open_redirect: convert_to_boolean(vuln['isOpenRedirect']),
            is_input_validation: convert_to_boolean(vuln['isInputValidation']),
            is_code_execution: convert_to_boolean(vuln['isCodeExecution']),
            is_bypass_something: convert_to_boolean(vuln['isBypassSomething']),
            is_gain_privilege: convert_to_boolean(vuln['isGainPrivilege']),
            is_denial_of_service: convert_to_boolean(vuln['isDenialOfService']),
            is_information_leak: convert_to_boolean(vuln['isInformationLeak']),
            is_used_for_ransomware: convert_to_boolean(vuln['isUsedForRansomware']),
            
            
          )
          
        #end
      end
    else
      Rails.logger.error("Failed to fetch CVE data: #{response.body}")
    end
  end

  def self.convert_to_boolean(value)
    value == "1"
  end
end


#          logo_response = HTTParty.get("#{BASE_LOGO_API_URL}#{vendor_name}", headers: { "X-Api-Key" => API_KEY })
#if logo_response.success?
#  logo_data = logo_response.parsed_response.first
#  Vendor.find_or_create_by(name: vendor_id) do |vendor|
#    vendor.vendor_url = logo_data['image']
#  end
#else
#  Rails.logger.error("Failed to fetch vendor logo: #{logo_response.body}")
#  Vendor.find_or_create_by(name: vendor_id)
#end
