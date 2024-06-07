class CreateCves < ActiveRecord::Migration[7.1]
  def change
    create_table :cves do |t|
      t.references :vendor, null: false, foreign_key: true
      t.string :cve_id
      t.string :vendor
      t.string :assigner
      t.string :assigner_source_name
      t.string :cve_number
      t.string :cve_year
      t.datetime :publish_date
      t.datetime :update_date
      t.boolean :exploit_exists
      t.datetime :exploit_existence_change_date
      t.boolean :is_in_cisa_kev
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
      t.float :epss_score
      t.datetime :epss_score_change_date
      t.float :epss_percentile
      t.integer :config_count
      t.integer :config_condition_count
      t.integer :vendor_comment_count
      t.integer :reference_count
      t.integer :metric_count
      t.integer :weakness_count
      t.float :max_cvss_base_score
      t.float :max_cvss_base_score_v3
      t.datetime :max_cvss_base_score_change_date
      t.float :max_cvss_exploitability_score
      t.float :max_cvss_impact_score
      t.boolean :is_overflow
      t.boolean :is_memory_corruption
      t.boolean :is_sql_injection
      t.boolean :is_xss
      t.boolean :is_directory_traversal
      t.boolean :is_file_inclusion
      t.boolean :is_csrf
      t.boolean :is_xxe
      t.boolean :is_ssrf
      t.boolean :is_open_redirect
      t.boolean :is_input_validation
      t.boolean :is_code_execution
      t.boolean :is_bypass_something
      t.boolean :is_gain_privilege
      t.boolean :is_denial_of_service
      t.boolean :is_information_leak
      t.boolean :is_used_for_ransomware

      t.timestamps
    end
  end
end
