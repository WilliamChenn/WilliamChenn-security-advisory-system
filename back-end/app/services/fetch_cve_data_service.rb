require 'httparty'

class FetchCveDataService
  BASE_CVE_API_URL = 'https://www.cvedetails.com/api/v1/vulnerability/search?outputFormat=json'

  def self.call(vendor_name)
    url = "#{BASE_CVE_API_URL}&vendorName=#{vendor_name}&pageNumber=1&resultsPerPage=20"
    token = "f63628992e62f5d6ac84bdb1ab93025173ce4755.eyJzdWIiOjQ3MjUsImlhdCI6MTcxNzUyMzYzOSwiZXhwIjoxNzIyMzg0MDAwLCJraWQiOjEsImMiOiI3RCt3MkZoTnZDdFZNeFByWUFyM0dEdDlaVWZDNGhZcUNqOUVXU0t1M3owd080bFZ3dVQyTm04V3ZiUlNoSjFrRkk5SGNzTksifQ=="
    response = HTTParty.get(url, headers: { "Authorization" => "Bearer #{token}" })
    if response.success?
      response.parsed_response['results'].each do |vuln|
        Cve.find_or_create_by(cve_id: vuln['cveId']) do |cve|
          cve.update(
            vendor_id: vuln['vendor_id'], vendor: vuln['vendor'], assigner: vuln['assigner'],
            assigner_source_name: vuln['assignerSourceName'], cve_number: vuln['cveNumber'],
            cve_year: vuln['cveYear'], publish_date: vuln['publishDate'], update_date: vuln['updateDate'],
            exploit_exists: vuln['exploitExists'], exploit_existence_change_date: vuln['exploitExistenceChangeDate'],
            is_in_cisa_kev: vuln['isInCISAKEV'], assigner_id: vuln['assignerId'], nvd_vuln_status: vuln['nvdVulnStatus'],
            summary: vuln['summary'], evaluator_comment: vuln['evaluatorComment'], evaluator_solution: vuln['evaluatorSolution'],
            evaluator_impact: vuln['evaluatorImpact'], cisa_exploit_add: vuln['cisaExploitAdd'], cisa_action_due: vuln['cisaActionDue'],
            cisa_vulnerability_name: vuln['cisaVulnerabilityName'], cisa_required_action: vuln['cisaRequiredAction'], cisa_short_description: vuln['cisaShortDescription'],
            cisa_notes: vuln['cisaNotes'], epss_score: vuln['epssScore'], epss_score_change_date: vuln['epssScoreChangeDate'],
            epss_percentile: vuln['epssPercentile'], config_count: vuln['configCount'], config_condition_count: vuln['configConditionCount'],
            vendor_comment_count: vuln['vendorCommentCount'], reference_count: vuln['referenceCount'], metric_count: vuln['metricCount'],
            weakness_count: vuln['weaknessCount'], max_cvss_base_score: vuln['maxCvssBaseScore'], max_cvss_base_score_v2: vuln['maxCvssBaseScorev2'],
            max_cvss_base_score_v3: vuln['maxCvssBaseScorev3'], max_cvss_base_score_v4: vuln['maxCvssBaseScorev4'], max_cvss_base_score_change_date: vuln['maxCvssBaseScoreChangeDate'],
            max_cvss_exploitability_score: vuln['maxCvssExploitabilityScore'], max_cvss_impact_score: vuln['maxCvssImpactScore'], is_overflow: vuln['isOverflow'],
            is_memory_corruption: vuln['isMemoryCorruption'], is_sql_injection: vuln['isSqlInjection'], is_xss: vuln['isXss'],
            is_directory_traversal: vuln['isDirectoryTraversal'], is_file_inclusion: vuln['isFileInclusion'], is_csrf: vuln['isCsrf'],
            is_xxe: vuln['isXxe'], is_ssrf: vuln['isSsrf'], is_open_redirect: vuln['isOpenRedirect'],
            is_input_validation: vuln['isInputValidation'], is_code_execution: vuln['isCodeExecution'], is_bypass_something: vuln['isBypassSomething'],
            is_gain_privilege: vuln['isGainPrivilege'], is_denial_of_service: vuln['isDenialOfService'], is_information_leak: vuln['isInformationLeak'],
            is_used_for_ransomware: vuln['isUsedForRansomware']
          )
        end
      end
    else
      Rails.logger.error("Failed to fetch CVE data: #{response.body}")
    end
  end
end
