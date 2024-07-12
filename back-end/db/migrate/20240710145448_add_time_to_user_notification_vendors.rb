class AddTimeToUserNotificationVendors < ActiveRecord::Migration[7.1]
  def change
    add_column :user_notification_vendors, :time, :string
  end
end
