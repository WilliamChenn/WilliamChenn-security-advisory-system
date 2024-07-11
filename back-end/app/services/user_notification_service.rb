class UserNotificationService
  def self.fetch_users_with_notifications
    users = User.includes(:vendors, :user_notification_vendors).all

    users.each do |user|
      puts "User: #{user.name}, Email: #{user.email}"

      user.vendors.each do |vendor|
        notification = user.user_notification_vendors.find_by(vendor_id: vendor.id)
        puts "  Vendor: #{vendor.name}, Frequency: #{notification.frequency}"
      end
    end
  end
end