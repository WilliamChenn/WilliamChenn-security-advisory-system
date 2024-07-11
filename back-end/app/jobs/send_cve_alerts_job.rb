# app/jobs/send_cve_alerts_job.rb
class SendCVEAlertsJob < ApplicationJob
  queue_as :default

  def perform
    User.includes(:vendors, :user_notification_vendors).find_each do |user|
      cves = fetch_cves_for_user(user)
      NotificationMailer.send_cve_alert(user, cves).deliver_later if cves.any?
    end
  end

  private

  def fetch_cves_for_user(user)
    vendors = user.vendors
    # Fetch CVEs for the user's vendors from your CVE data source.
    # Replace the following line with the actual logic to fetch CVEs.
    CVE.where(vendor: vendors)
  end
end

