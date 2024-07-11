# app/controllers/api/v1/user_severities_controller.rb
module Api
    module V1
      class UserSeveritiesController < ApplicationController
        before_action :authenticate_user!
        before_action :set_user_severity, only: [:show, :update, :destroy]
  
        # GET /api/v1/user_severities
        def show
          render json: @user_severity
        end
  
  
        # POST /api/v1/user_severities
        def create
          @user_severity = UserSeverity.new(user_severity_params)
          @user_severity.user = current_user
  
  
          if @user_severity.save
            render json: @user_severity, status: :created
          else
            render json: @user_severity.errors, status: :unprocessable_entity
          end
        end
  
  
        # PATCH/PUT /api/v1/user_severities
        def update
          if @user_severity.update(user_severity_params)
            render json: @user_severity
          else
            render json: @user_severity.errors, status: :unprocessable_entity
          end
        end
  
  
        # DELETE /api/v1/user_severities
        def destroy
          @user_severity.destroy
          head :no_content
        end
  
  
        private
  
  
        # Use callbacks to share common setup or constraints between actions.
        def set_user_severity
          @user_severity = UserSeverity.find_by(user_id: current_user.id)
          unless @user_severity
            render json: { error: 'User severity not found' }, status: :not_found
          end
        end
        
  
  
        # Only allow a trusted parameter "white list" through.
        def user_severity_params
          params.require(:user_severity).permit(:severity)
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
  