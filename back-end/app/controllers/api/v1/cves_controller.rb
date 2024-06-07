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
        #/api/v1/cves/recent
        def recent
          cves = CVE.order(publish_date: :desc).limit(5)
          render json: CVESerializer.new(cves, include: [:vendor]).serialized_json
        end
      end
    end
  end
  