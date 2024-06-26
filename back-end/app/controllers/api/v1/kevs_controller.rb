# app/controllers/kevs_controller.rb (or any relevant controller)
class KevsController < ApplicationController
    def fetch_kev_data
      FetchKEVDataService.call
      redirect_to root_path, notice: "KEV data fetched and populated successfully."
    rescue StandardError => e
      redirect_to root_path, alert: "Failed to fetch KEV data: #{e.message}"
    end
  end
  