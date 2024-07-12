class User < ApplicationRecord
    has_many :users_vendors, foreign_key: :uid, primary_key: :uid
    has_many :vendors, through: :users_vendors
  
    has_many :user_notification_vendors, dependent: :destroy
    has_many :notification_vendors, through: :user_notification_vendors, source: :vendor
  
    has_one :user_frequency
    has_one :user_severity
  end
  
  