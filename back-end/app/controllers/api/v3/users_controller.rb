# app/controllers/api/v3/users_controller.rb
module Api
    module V3
      class UsersController < ApplicationController
        before_action :authenticate_user!
  
        def upload_png
          if current_user.update(user_png_params)
            render json: { message: 'Profile picture updated successfully', user_png: current_user.user_png }, status: :ok
          else
            render json: { error: 'Failed to update profile picture', details: current_user.errors.full_messages }, status: :unprocessable_entity
          end
        end
  
        def get_png
          if current_user.user_png.present?
            render json: { user_png: current_user.user_png }, status: :ok
          else
            render json: { error: 'Profile picture not found' }, status: :not_found
          end
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
  
        def user_png_params
          params.require(:user).permit(:user_png)
        end
      end
    end
  end
  