class CvesController < ApplicationController
  before_action :set_cve, only: %i[ show update destroy ]

  # GET /cves
  def index
    if params[:vendor_name]
      FetchCveDataService.call(params[:vendor_name])
      @cves = Cve.where(vendor: params[:vendor_name])
    else
      @cves = Cve.all
    end

    render json: @cves
  end

  # GET /cves/1
  def show
    render json: @cve
  end

  # POST /cves
  def create
    vendor_name = params[:vendor_name]
    if vendor_name
      FetchCveDataService.call(vendor_name)
      @cves = Cve.where(vendor: vendor_name)
      render json: @cves, status: :created
    else
      render json: { error: 'vendor_name parameter is missing' }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cves/1
  def update
    if @cve.update(cve_params)
      render json: @cve
    else
      render json: @cve.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cves/1
  def destroy
    @cve.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_cve
      @cve = Cve.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def cve_params
      params.require(:cve).permit(:vendor_id, :vendor, :assigner, :assigner_source_name, :cve_number, :cve_id, :cve_year, :publish_date, :update_date, :exploit_exists, :exploit_existence_change_date, :is_in_cisa_kev, :assigner_id, :nvd_vuln_status, :summary, :evaluator_comment, :evaluator_solution, :evaluator_impact, :cisa_exploit_add, :cisa_action_due, :cisa_vulnerability_name, :cisa_required_action, :cisa_short_description, :cisa_notes, :epss_score, :epss_score_change_date, :epss_percentile, :config_count, :config_condition_count, :vendor_comment_count, :reference_count, :metric_count, :weakness_count, :max_cvss_base_score, :max_cvss_base_score_v2, :max_cvss_base_score_v3, :max_cvss_base_score_v4, :max_cvss_base_score_change_date, :max_cvss_exploitability_score, :max_cvss_impact_score, :is_overflow, :is_memory_corruption, :is_sql_injection, :is_xss, :is_directory_traversal, :is_file_inclusion, :is_csrf, :is_xxe, :is_ssrf, :is_open_redirect, :is_input_validation, :is_code_execution, :is_bypass_something, :is_gain_privilege, :is_denial_of_service, :is_information_leak, :is_used_for_ransomware)
    end
      # root "posts#index"
    #get "/dogs" => "dogs#index"
end
