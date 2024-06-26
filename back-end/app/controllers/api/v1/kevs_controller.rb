# app/controllers/api/v1/kevs_controller.rb

module Api
    module V1
      class KevsController < ApplicationController
        def fetch_kev_data
          # Assuming FetchKEVDataService.call returns an array of CVE objects
          kevs = FetchKEVDataService.call
  
          render json: KEVSerializer.new(kevs).serialized_json
        end
      end
    end
  end
  