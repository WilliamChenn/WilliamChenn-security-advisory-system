# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_06_04_195142) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cves", force: :cascade do |t|
    t.string "vendor_id"
    t.string "vendor"
    t.string "assigner"
    t.string "assigner_source_name"
    t.string "cve_number"
    t.string "cve_id"
    t.string "cve_year"
    t.datetime "publish_date"
    t.datetime "update_date"
    t.string "exploit_exists"
    t.datetime "exploit_existence_change_date"
    t.string "is_in_cisa_kev"
    t.string "assigner_id"
    t.string "nvd_vuln_status"
    t.text "summary"
    t.text "evaluator_comment"
    t.text "evaluator_solution"
    t.text "evaluator_impact"
    t.datetime "cisa_exploit_add"
    t.datetime "cisa_action_due"
    t.string "cisa_vulnerability_name"
    t.string "cisa_required_action"
    t.text "cisa_short_description"
    t.text "cisa_notes"
    t.string "epss_score"
    t.datetime "epss_score_change_date"
    t.string "epss_percentile"
    t.string "config_count"
    t.string "config_condition_count"
    t.string "vendor_comment_count"
    t.string "reference_count"
    t.string "metric_count"
    t.string "weakness_count"
    t.string "max_cvss_base_score"
    t.string "max_cvss_base_score_v2"
    t.string "max_cvss_base_score_v3"
    t.string "max_cvss_base_score_v4"
    t.datetime "max_cvss_base_score_change_date"
    t.string "max_cvss_exploitability_score"
    t.string "max_cvss_impact_score"
    t.string "is_overflow"
    t.string "is_memory_corruption"
    t.string "is_sql_injection"
    t.string "is_xss"
    t.string "is_directory_traversal"
    t.string "is_file_inclusion"
    t.string "is_csrf"
    t.string "is_xxe"
    t.string "is_ssrf"
    t.string "is_open_redirect"
    t.string "is_input_validation"
    t.string "is_code_execution"
    t.string "is_bypass_something"
    t.string "is_gain_privilege"
    t.string "is_denial_of_service"
    t.string "is_information_leak"
    t.string "is_used_for_ransomware"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
