class SendCVEAlertsJob < ApplicationJob
  queue_as :default

  def perform
    frequencies = {
      'daily' => 1.day,
      'weekly' => 1.week,
      'biweekly' => 2.weeks,
      'monthly' => 1.month
    }

    frequencies.each do |label, interval|
      users = User.joins(:user_frequency).where(user_frequencies: { frequency: label })
      puts "Processing #{users.count} users for frequency: #{label}"
      send_emails_to_users(users)
    end
  end

  private

  def send_emails_to_users(users)
    users.each do |user|
      # Fetch vendors from user_notification_vendors instead of users_vendors
      vendors = Vendor.joins(:user_notification_vendors).where(user_notification_vendors: { user_id: user.id })
      cves = []
      vendors.each do |vendor|
        vendor_cves = filter_cves_by_severity(CVE.where(vendor_id: vendor.id), user)
        puts "User: #{user.email}, Vendor: #{vendor.name}, CVEs: #{vendor_cves.count}"
        cves += vendor_cves
      end
      if cves.any?
        puts "Sending email to: #{user.email}"
        CVEAlertMailer.alert_email(user, vendors, cves).deliver_now
        puts "Email sent to: #{user.email}"
      else
        puts "No CVEs to send for user: #{user.email}"
      end
    end
  end

  def filter_cves_by_severity(cves, user)
    severity_preference = user.user_severity&.severity || 'all'
  
    case severity_preference
    when 'medium'
      cves.select { |cve| cve.max_cvss_base_score && cve.max_cvss_base_score >= 4 && cve.max_cvss_base_score <= 10 }
    when 'high'
      cves.select { |cve| cve.max_cvss_base_score && cve.max_cvss_base_score >= 7 && cve.max_cvss_base_score <= 10 }
    when 'critical'
      cves.select { |cve| cve.max_cvss_base_score && cve.max_cvss_base_score >= 9 && cve.max_cvss_base_score <= 10 }
    else
      cves
    end
  end  
end
