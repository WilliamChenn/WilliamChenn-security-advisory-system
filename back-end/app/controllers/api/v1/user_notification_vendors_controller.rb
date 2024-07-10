module Api
  module V1
    class UserNotificationVendorsController < ApplicationController
      before_action :authenticate_user!

      def index
        user = current_user
        render json: user.user_notification_vendors.includes(:vendor), include: :vendor
      end
      
      def create
        user = current_user
        vendor = Vendor.find(params[:vendor_id])

        if user.user_notification_vendors.exists?(vendor: vendor)
          render json: { status: 'ERROR', message: 'Vendor already added for notifications' }, status: :unprocessable_entity
          return
        end
      
        user_notification_vendor = UserNotificationVendor.new(
          user: user,
          vendor: vendor,
          frequency: params[:frequency],  # Ensure 'frequency' is correctly passed from params
          time: params[:time]
        )
      
        if user_notification_vendor.save
          render json: { status: 'SUCCESS', message: 'Vendor added for notifications', data: user_notification_vendor }, include: :vendor, status: :ok
        else
          render json: { status: 'ERROR', message: 'Vendor not added', data: user_notification_vendor.errors }, status: :unprocessable_entity
        end
      end
      
      def destroy
        user = current_user
        vendor = Vendor.find(params[:vendor_id])
      
        user_notification_vendor = UserNotificationVendor.find_by(user: user, vendor: vendor)
      
        if user_notification_vendor&.destroy
          render json: { status: 'SUCCESS', message: 'Vendor removed from notifications' }, status: :ok
        else
          render json: { status: 'ERROR', message: 'Vendor not found or not removed' }, status: :not_found
        end
      end      

      private

      def authenticate_user!
        token = cookies.signed[:auth_token]
        @current_user = User.find_by(auth_token: token)

        unless @current_user
          render json: { logged_in: false, message: "Unauthorized" }, status: :unauthorized
        end
      end

      def current_user
        @current_user
      end
    end
  end
end
