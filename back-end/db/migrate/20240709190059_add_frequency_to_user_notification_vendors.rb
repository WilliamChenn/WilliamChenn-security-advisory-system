class AddFrequencyToUserNotificationVendors < ActiveRecord::Migration[6.1]
  def change
    add_column :user_notification_vendors, :frequency, :string
  end
end
