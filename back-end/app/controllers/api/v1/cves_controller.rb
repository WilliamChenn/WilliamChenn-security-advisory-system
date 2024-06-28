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
      # /api/v1/cves/:id
      def show
        cve = CVE.find_by(cve_id: params[:id])
        if cve
          render json: CVESerializer.new(cve, include: [:vendor]).serialized_json
        else
          render json: { error: 'CVE not found' }, status: :not_found
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
    end
  end
end



