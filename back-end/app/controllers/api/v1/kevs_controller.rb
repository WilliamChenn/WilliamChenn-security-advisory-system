# app/controllers/api/v1/kevs_controller.rb

module Api
    module V1
      class KevsController < ApplicationController
        def fetch_kev_data
          FetchKEVDataService.call
          kevs = KEV.all
          render json: KEVSerializer.new(kevs).serialized_json
        end
      end
    end
  end
  