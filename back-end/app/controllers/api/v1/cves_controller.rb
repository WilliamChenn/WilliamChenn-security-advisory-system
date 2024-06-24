module Api
  module V1
    class CvesController < ApplicationController
      def index
        cves = CVE.includes(:vendor).order(publish_date: :desc)
        render json: CVESerializer.new(cves, include: [:vendor]).serialized_json
      end

      def critical
        cves = CVE.where('max_cvss_base_score >= ?', 7.0).order(publish_date: :desc).limit(5)
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
        time_range = params[:time_range] || 'week'
        FetchCVEDataService.call(params[:vendor_name]) if params[:vendor_name]
        cves = CVE.where('publish_date >= ?', time_range_to_date(time_range))
        render json: CVESerializer.new(cves, include: [:vendor]).serialized_json
      end

      private

      def time_range_to_date(time_range)
        case time_range
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
      end
    end
  end
end
