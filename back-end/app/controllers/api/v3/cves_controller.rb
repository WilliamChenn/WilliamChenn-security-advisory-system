# app/controllers/api/v3/cves_controller.rb
module Api
    module V3
      class CvesController < ApplicationController
        before_action :authenticate_user!
  
        def index
          user = current_user
          cves = CVE.joins(:vendor)
                    .where(vendors: { id: user.vendors.select(:id) })
                    .order(publish_date: :desc)
          render json: CVESerializer.new(cves, include: [:vendor]).serialized_json
        end
  
        def critical
          user = current_user
          cves = CVE.joins(:vendor)
                    .where(vendors: { id: user.vendors.select(:id) })
                    .where('max_cvss_base_score >= ?', 7.0)
                    .order(publish_date: :desc)
                    .limit(5)
          render json: CVESerializer.new(cves, include: [:vendor]).serialized_json
        end
  
        def show
          cve = CVE.find_by(cve_id: params[:id])
          if cve
            render json: CVESerializer.new(cve, include: [:vendor]).serialized_json
          else
            render json: { error: 'CVE not found' }, status: :not_found
          end
        end

      

  
        def recent
          user = current_user
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
  
          cves = CVE.joins(:vendor)
                    .where(vendors: { id: user.vendors.select(:id) })
                    .where('publish_date >= ?', start_date)
          render json: cves
        end
  
        private
  
        def authenticate_user!
          token = cookies.signed[:auth_token]
          @current_user = User.find_by(auth_token: token)
          unless @current_user
            render json: { error: 'Not Authorized' }, status: :unauthorized
          end
        end
  
        def current_user
          @current_user
        end
      end
    end
  end
  