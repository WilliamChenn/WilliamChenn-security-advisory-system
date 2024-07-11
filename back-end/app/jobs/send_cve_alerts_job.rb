class SendCVEAlertsJob < ApplicationJob
  queue_as :default

  def perform(*args)
    User.all.each do |user|
      user.vendors.each do |vendor|
        cve_list = fetch_cves_for_vendor(vendor)
        CVEAlertMailer.with(user: user, cve_list: cve_list).cve_alert_email.deliver_later if should_send_email?(user, vendor)
      end
    end
  end

  private

  def fetch_cves_for_vendor(vendor)
    # Fetch the CVEs for the vendor from the source
    # Return an array of CVE descriptions
  end

  def should_send_email?(user, vendor)
    # Determine if an email should be sent based on the user's frequency preferences
    # For example, check if the last sent email was more than the preferred frequency ago
  end
end

