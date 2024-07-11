# app/controllers/api/v3/vendors_controller.rb
class Api::V3::VendorsController < ApplicationController
    before_action :authenticate_user!
  
    def index
      if params[:name]
        vendor = Vendor.find_by(name: params[:name])
        if vendor
          render json: vendor
        else
          render json: { error: 'Vendor not found' }, status: :not_found
        end
      else
        user = current_user
        if user
          vendors = user.vendors
          render json: vendors
        else
          render json: { error: 'Not Authorized' }, status: :unauthorized
        end
      end
    end

    def refresh_vendors
      user = current_user
      if user
        user.vendors.find_each do |vendor|
          FetchCVEDataService.call_with_limit(vendor.name)  # Call with limit
        end
        render json: { message: 'Vendors refreshed successfully' }, status: :ok
      else
        render json: { error: 'Not Authorized' }, status: :unauthorized
      end
    end

    def add_user
      user = current_user
      if user
        vendor = Vendor.find(params[:id])
        user.vendors << vendor unless user.vendors.include?(vendor)
        render json: { message: 'Vendor added successfully', vendor: vendor }, status: :ok
      else
        render json: { error: 'Not Authorized' }, status: :unauthorized
      end
    end
  
    def remove_user
      user = current_user
      if user
        vendor = Vendor.find(params[:id])
        user.vendors.delete(vendor)
        render json: { message: 'Vendor removed successfully' }, status: :ok
      else
        render json: { error: 'Not Authorized' }, status: :unauthorized
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
  