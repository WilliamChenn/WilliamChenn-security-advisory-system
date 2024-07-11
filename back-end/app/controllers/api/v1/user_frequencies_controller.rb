# app/controllers/api/v1/user_frequencies_controller.rb
module Api
    module V1
      class UserFrequenciesController < ApplicationController
        before_action :authenticate_user!
        before_action :set_user_frequency, only: [:show, :update, :destroy]
  
        # GET /api/v1/user_frequencies
        def show
          render json: @user_frequency
        end
  
        # POST /api/v1/user_frequencies
        def create
          @user_frequency = UserFrequency.new(user_frequency_params)
          @user_frequency.user = current_user
  
          if @user_frequency.save
            render json: @user_frequency, status: :created
          else
            render json: @user_frequency.errors, status: :unprocessable_entity
          end
        end
  
        # PATCH/PUT /api/v1/user_frequencies
        def update
          if @user_frequency.update(user_frequency_params)
            render json: @user_frequency
          else
            render json: @user_frequency.errors, status: :unprocessable_entity
          end
        end
  
        # DELETE /api/v1/user_frequencies
        def destroy
          @user_frequency.destroy
          head :no_content
        end
  
        private
  
        # Use callbacks to share common setup or constraints between actions.
        def set_user_frequency
          @user_frequency = UserFrequency.find_by(user_id: current_user.id)
          render json: { error: 'User frequency not found' }, status: :not_found unless @user_frequency
        end
  
        # Only allow a trusted parameter "white list" through.
        def user_frequency_params
          params.require(:user_frequency).permit(:frequency)
        end
  
        def authenticate_user!
          token = cookies.signed[:auth_token]
          @current_user = User.find_by(auth_token: token)
  
          unless @current_user
            render json: { "logged_in" => false, "message" => "Unauthorized" }, status: :unauthorized
            return
          end
        end
  
        def current_user
          @current_user
        end
      end
    end
  end
  