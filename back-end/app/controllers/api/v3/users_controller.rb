# app/controllers/api/v3/users_controller.rb
module Api
  module V3
    class UsersController < ApplicationController
      before_action :authenticate_user!

      def set_profile_picture_index
        profile_picture_index = params[:profile_picture_index].to_s

        if ['0', '1', '2', '3', '4', '5', '6'].include?(profile_picture_index) # Include all indexes for your profile pictures
          if current_user.update(user_png: profile_picture_index)
            render json: { profile_picture_index: current_user.user_png.to_i }, status: :ok
          else
            render json: { error: 'Failed to update profile picture index', details: current_user.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { error: 'Invalid profile picture index' }, status: :unprocessable_entity
        end
      end

      def get_profile_picture_index
        if current_user.user_png.present?
          render json: { profile_picture_index: current_user.user_png.to_i }, status: :ok
        else
          render json: { error: 'Profile picture index not found' }, status: :not_found
        end
      end

      def show_email_and_uid_and_name
        user = current_user
        render json: { email: user.email, uid: user.uid, name: user.name, profile_picture_index: user.user_png.to_i }
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'User not found' }, status: :not_found
      end

      def logout
        if current_user
          Rails.logger.info("Logging out user: #{current_user.email}")
          if current_user.update(auth_token: nil)
            Rails.logger.info("Successfully cleared auth_token for user: #{current_user.email}")
          else
            Rails.logger.error("Failed to clear auth_token for user: #{current_user.email} - Errors: #{current_user.errors.full_messages}")
          end
          cookies.delete(:auth_token)
          reset_session # This clears the session
          render json: { message: 'Logged out successfully' }, status: :ok
        else
          Rails.logger.error("Logout attempt with invalid token")
          render json: { error: 'Invalid token' }, status: :unauthorized
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
    end
  end
end

