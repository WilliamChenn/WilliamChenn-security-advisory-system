module Api
    module V1
      class CvesController < ApplicationController
        def index
          cves = CVE.includes(:vendor).order(publish_date: :desc)
          render json: CVESerializer.new(cves, include: [:vendor]).serialized_json
        end
        #/api/v1/cves/critical
        def critical
          cves = CVE.where('max_cvss_base_score >= ?', 7.0).order(publish_date: :desc).limit(5)
          render json: CVESerializer.new(cves, include: [:vendor]).serialized_json
        end
        
        def clear_remediation
          cve = CVE.find_by(cve_id: params[:id])
          if cve
            if cve.(remediation: nil)
              render json: { message: 'Remediation cleared successfully' }, status: :ok
            else
              render json: { error: 'Failed to clear remediation'}, status: :unprocessable_entity
            end

          end
        end

        def save_remediation
          cve = CVE.find_by(cve_id: params[:id])
          if cve
            if cve.update(remediation: params[:remediation])
              render json: { message: 'Remediation updated successfully', remediation: cve.remediation }, status: :ok
            else
              render json: { error: 'Failed to update remediation', details: cve.errors.full_messages }, status: :unprocessable_entity
            end
          else
            render json: { error: 'CVE not found' }, status: :not_found
          end
        end
  
        def get_remediation
          cve = CVE.find_by(cve_id: params[:id])
          if cve
            render json: { remediation: cve.remediation }, status: :ok
          else
            render json: { error: 'CVE not found' }, status: :not_found
          end
        end


        # /api/v1/cves/:id
        def show
          cve = CVE.find_by(cve_id: params[:id])
          if cve
            render json: CVESerializer.new(cve, include: [:vendor]).serialized_json
          else
            render json: { error: 'CVE not found' }, status: :not_found
          end
        end
        #http://localhost:3001/api/v1/remediation_url/CVE-2024-27885
        def remediation_url
          cve = CVE.find_by(cve_id: params[:id])
          
          if cve.nil?
            render json: { error: 'CVE not found' }, status: :not_found
            return
          end
  
          
  
          if cve.remediation_url.present? && cve.remediation_url.start_with?('http')
            render json: { remediation_url: cve.remediation_url }
          else
            # Fetch remediation URL using the service
            remediation_url = FetchRemediationUrlService.call(cve.cve_id)
            
            if remediation_url.present?
              # Update the CVE record with the fetched remediation URL
              cve.update(remediation_url: remediation_url)
              render json: { remediation_url: remediation_url }
            else
              render json: { error: 'Remediation URL not found' }, status: :unprocessable_entity
            end
          end
        end

        #/api/v1/cves/recent
        def recent
            time_range = params[:time_range] || 'week'
            start_date = case time_range
                         when 'day'
                           1.day.ago
                         when 'week'
                           1.week.ago
                         when 'two_weeks'
                           2.weeks.ago
                         when 'month'
                           1.month.ago
                         when 'year'
                           1.year.ago
                         else
                           1.week.ago
                         end
    
            cves = CVE.where('publish_date >= ?', start_date)
            render json: cves
          end

        def remediation_params
          params.require(:remediation).permit(:remediation)
        end

      end
    end
  end
  