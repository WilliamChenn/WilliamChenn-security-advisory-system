class CreateCves < ActiveRecord::Migration[7.1]
  def change
    create_table :cves do |t|
      t.string :vendor_id
      t.string :vendor
      t.string :assigner
      t.string :assigner_source_name
      t.string :cve_number
      t.string :cve_id
      t.string :cve_year
      t.datetime :publish_date
      t.datetime :update_date
      t.string :exploit_exists
      t.datetime :exploit_existence_change_date
      t.string :is_in_cisa_kev
      t.string :assigner_id
      t.string :nvd_vuln_status
      t.text :summary
      t.text :evaluator_comment
      t.text :evaluator_solution
      t.text :evaluator_impact
      t.datetime :cisa_exploit_add
      t.datetime :cisa_action_due
      t.string :cisa_vulnerability_name
      t.string :cisa_required_action
      t.text :cisa_short_description
      t.text :cisa_notes
      t.string :epss_score
      t.datetime :epss_score_change_date
      t.string :epss_percentile
      t.string :config_count
      t.string :config_condition_count
      t.string :vendor_comment_count
      t.string :reference_count
      t.string :metric_count
      t.string :weakness_count
      t.string :max_cvss_base_score
      t.string :max_cvss_base_score_v2
      t.string :max_cvss_base_score_v3
      t.string :max_cvss_base_score_v4
      t.datetime :max_cvss_base_score_change_date
      t.string :max_cvss_exploitability_score
      t.string :max_cvss_impact_score
      t.string :is_overflow
      t.string :is_memory_corruption
      t.string :is_sql_injection
      t.string :is_xss
      t.string :is_directory_traversal
      t.string :is_file_inclusion
      t.string :is_csrf
      t.string :is_xxe
      t.string :is_ssrf
      t.string :is_open_redirect
      t.string :is_input_validation
      t.string :is_code_execution
      t.string :is_bypass_something
      t.string :is_gain_privilege
      t.string :is_denial_of_service
      t.string :is_information_leak
      t.string :is_used_for_ransomware

      t.timestamps
    end
  end
end
