class SendCVEAlertsJob < ApplicationJob
  queue_as :default

  def perform
    frequencies = {
      'Daily' => 1.day,
      'Weekly' => 1.week,
      'Biweekly' => 2.weeks,
      'Monthly' => 1.month
    }
    
#For each value of frequency it refers to user_frequencies table to note the frequency for each user
    frequencies.each do |label, interval|
      users = User.joins(:user_frequency).where(user_frequencies: { frequency: label })
      send_emails_to_users(users)
    end
  end

  private

  def send_emails_to_users(users)
    users.each do |user|
      vendors = user.vendors
      # Fetch CVEs for vendors and prepare email content
      cves = vendors.map { |vendor| FetchCVEDataService.call(vendor.name) }.flatten
      CVEAlertMailer.alert_email(user, vendors).deliver_now
    end
  end
end

