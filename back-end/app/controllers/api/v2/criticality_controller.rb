module Api
    module V2
      class CriticalityController < ApplicationController
        def index
          max_cvss_base_score = params[:max_cvss_base_score] || 'all'
          
          min_score, max_score = case max_cvss_base_score
                                 when 'low'
                                   [0.0, 3.9]
                                 when 'medium'
                                   [4.0, 6.9]
                                 when 'high'
                                   [7.0, 8.9]
                                 when 'critical'
                                   [9.0, 10.0]
                                 else
                                   [0.0, 10.0] # Default to all scores
                                 end
          
          cves = CVE.where('max_cvss_base_score >= ? AND max_cvss_base_score <= ?', min_score, max_score)
                    .order(publish_date: :desc)
          
          render json: CVESerializer.new(cves, include: [:vendor]).serialized_json
        end
      end
    end
  end