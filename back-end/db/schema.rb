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

ActiveRecord::Schema[7.1].define(version: 2024_06_25_192912) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cves", force: :cascade do |t|
    t.bigint "vendor_id", null: false
    t.string "cve_id"
    t.string "vendor"
    t.string "assigner"
    t.string "assigner_source_name"
    t.string "cve_number"
    t.string "cve_year"
    t.datetime "publish_date"
    t.datetime "update_date"
    t.boolean "exploit_exists"
    t.datetime "exploit_existence_change_date"
    t.boolean "is_in_cisa_kev"
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
    t.float "epss_score"
    t.datetime "epss_score_change_date"
    t.float "epss_percentile"
    t.integer "config_count"
    t.integer "config_condition_count"
    t.integer "vendor_comment_count"
    t.integer "reference_count"
    t.integer "metric_count"
    t.integer "weakness_count"
    t.float "max_cvss_base_score"
    t.float "max_cvss_base_score_v3"
    t.datetime "max_cvss_base_score_change_date"
    t.float "max_cvss_exploitability_score"
    t.float "max_cvss_impact_score"
    t.boolean "is_overflow"
    t.boolean "is_memory_corruption"
    t.boolean "is_sql_injection"
    t.boolean "is_xss"
    t.boolean "is_directory_traversal"
    t.boolean "is_file_inclusion"
    t.boolean "is_csrf"
    t.boolean "is_xxe"
    t.boolean "is_ssrf"
    t.boolean "is_open_redirect"
    t.boolean "is_input_validation"
    t.boolean "is_code_execution"
    t.boolean "is_bypass_something"
    t.boolean "is_gain_privilege"
    t.boolean "is_denial_of_service"
    t.boolean "is_information_leak"
    t.boolean "is_used_for_ransomware"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "source"
    t.index ["vendor_id"], name: "index_cves_on_vendor_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "uid"
    t.string "email"
    t.string "auth_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users_vendors", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "vendor_id", null: false
  end

  create_table "vendors", force: :cascade do |t|
    t.string "name"
    t.string "vendor_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "vendor_url"
    t.string "remediation_url"
  end

  add_foreign_key "cves", "vendors"
end
