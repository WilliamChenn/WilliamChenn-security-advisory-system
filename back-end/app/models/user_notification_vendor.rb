class UserNotificationVendor < ApplicationRecord
  belongs_to :user
  belongs_to :vendor

  # Assuming 'frequency' is a string attribute
  attribute :frequency, :string
end
