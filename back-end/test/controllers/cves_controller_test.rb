require "test_helper"

class CvesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @cfe = cves(:one)
  end

  test "should get index" do
    get cves_url, as: :json
    assert_response :success
  end

  test "should create cfe" do
    assert_difference("Cve.count") do
      post cves_url, params: { cfe: { assigner: @cfe.assigner, assigner_id: @cfe.assigner_id, assigner_source_name: @cfe.assigner_source_name, cisa_action_due: @cfe.cisa_action_due, cisa_exploit_add: @cfe.cisa_exploit_add, cisa_notes: @cfe.cisa_notes, cisa_required_action: @cfe.cisa_required_action, cisa_short_description: @cfe.cisa_short_description, cisa_vulnerability_name: @cfe.cisa_vulnerability_name, config_condition_count: @cfe.config_condition_count, config_count: @cfe.config_count, cve_id: @cfe.cve_id, cve_number: @cfe.cve_number, cve_year: @cfe.cve_year, epss_percentile: @cfe.epss_percentile, epss_score: @cfe.epss_score, epss_score_change_date: @cfe.epss_score_change_date, evaluator_comment: @cfe.evaluator_comment, evaluator_impact: @cfe.evaluator_impact, evaluator_solution: @cfe.evaluator_solution, exploit_existence_change_date: @cfe.exploit_existence_change_date, exploit_exists: @cfe.exploit_exists, is_bypass_something: @cfe.is_bypass_something, is_code_execution: @cfe.is_code_execution, is_csrf: @cfe.is_csrf, is_denial_of_service: @cfe.is_denial_of_service, is_directory_traversal: @cfe.is_directory_traversal, is_file_inclusion: @cfe.is_file_inclusion, is_gain_privilege: @cfe.is_gain_privilege, is_in_cisa_kev: @cfe.is_in_cisa_kev, is_information_leak: @cfe.is_information_leak, is_input_validation: @cfe.is_input_validation, is_memory_corruption: @cfe.is_memory_corruption, is_open_redirect: @cfe.is_open_redirect, is_overflow: @cfe.is_overflow, is_sql_injection: @cfe.is_sql_injection, is_ssrf: @cfe.is_ssrf, is_used_for_ransomware: @cfe.is_used_for_ransomware, is_xss: @cfe.is_xss, is_xxe: @cfe.is_xxe, max_cvss_base_score: @cfe.max_cvss_base_score, max_cvss_base_score_change_date: @cfe.max_cvss_base_score_change_date, max_cvss_base_score_v2: @cfe.max_cvss_base_score_v2, max_cvss_base_score_v3: @cfe.max_cvss_base_score_v3, max_cvss_base_score_v4: @cfe.max_cvss_base_score_v4, max_cvss_exploitability_score: @cfe.max_cvss_exploitability_score, max_cvss_impact_score: @cfe.max_cvss_impact_score, metric_count: @cfe.metric_count, nvd_vuln_status: @cfe.nvd_vuln_status, publish_date: @cfe.publish_date, reference_count: @cfe.reference_count, summary: @cfe.summary, update_date: @cfe.update_date, vendor: @cfe.vendor, vendor_comment_count: @cfe.vendor_comment_count, vendor_id: @cfe.vendor_id, weakness_count: @cfe.weakness_count } }, as: :json
    end

    assert_response :created
  end

  test "should show cfe" do
    get cfe_url(@cfe), as: :json
    assert_response :success
  end

  test "should update cfe" do
    patch cfe_url(@cfe), params: { cfe: { assigner: @cfe.assigner, assigner_id: @cfe.assigner_id, assigner_source_name: @cfe.assigner_source_name, cisa_action_due: @cfe.cisa_action_due, cisa_exploit_add: @cfe.cisa_exploit_add, cisa_notes: @cfe.cisa_notes, cisa_required_action: @cfe.cisa_required_action, cisa_short_description: @cfe.cisa_short_description, cisa_vulnerability_name: @cfe.cisa_vulnerability_name, config_condition_count: @cfe.config_condition_count, config_count: @cfe.config_count, cve_id: @cfe.cve_id, cve_number: @cfe.cve_number, cve_year: @cfe.cve_year, epss_percentile: @cfe.epss_percentile, epss_score: @cfe.epss_score, epss_score_change_date: @cfe.epss_score_change_date, evaluator_comment: @cfe.evaluator_comment, evaluator_impact: @cfe.evaluator_impact, evaluator_solution: @cfe.evaluator_solution, exploit_existence_change_date: @cfe.exploit_existence_change_date, exploit_exists: @cfe.exploit_exists, is_bypass_something: @cfe.is_bypass_something, is_code_execution: @cfe.is_code_execution, is_csrf: @cfe.is_csrf, is_denial_of_service: @cfe.is_denial_of_service, is_directory_traversal: @cfe.is_directory_traversal, is_file_inclusion: @cfe.is_file_inclusion, is_gain_privilege: @cfe.is_gain_privilege, is_in_cisa_kev: @cfe.is_in_cisa_kev, is_information_leak: @cfe.is_information_leak, is_input_validation: @cfe.is_input_validation, is_memory_corruption: @cfe.is_memory_corruption, is_open_redirect: @cfe.is_open_redirect, is_overflow: @cfe.is_overflow, is_sql_injection: @cfe.is_sql_injection, is_ssrf: @cfe.is_ssrf, is_used_for_ransomware: @cfe.is_used_for_ransomware, is_xss: @cfe.is_xss, is_xxe: @cfe.is_xxe, max_cvss_base_score: @cfe.max_cvss_base_score, max_cvss_base_score_change_date: @cfe.max_cvss_base_score_change_date, max_cvss_base_score_v2: @cfe.max_cvss_base_score_v2, max_cvss_base_score_v3: @cfe.max_cvss_base_score_v3, max_cvss_base_score_v4: @cfe.max_cvss_base_score_v4, max_cvss_exploitability_score: @cfe.max_cvss_exploitability_score, max_cvss_impact_score: @cfe.max_cvss_impact_score, metric_count: @cfe.metric_count, nvd_vuln_status: @cfe.nvd_vuln_status, publish_date: @cfe.publish_date, reference_count: @cfe.reference_count, summary: @cfe.summary, update_date: @cfe.update_date, vendor: @cfe.vendor, vendor_comment_count: @cfe.vendor_comment_count, vendor_id: @cfe.vendor_id, weakness_count: @cfe.weakness_count } }, as: :json
    assert_response :success
  end

  test "should destroy cfe" do
    assert_difference("Cve.count", -1) do
      delete cfe_url(@cfe), as: :json
    end

    assert_response :no_content
  end
end
