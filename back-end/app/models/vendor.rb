class Vendor < ApplicationRecord
  has_many :cves, dependent: :destroy
  has_many :users_vendors
  has_many :users, through: :users_vendors

  has_many :user_notification_vendors
  has_many :notified_users, through: :user_notification_vendors, source: :user
end
