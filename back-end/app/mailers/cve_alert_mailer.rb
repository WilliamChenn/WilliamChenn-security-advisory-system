class CVEAlertMailer < ApplicationMailer
  def alert_email(user, vendors, cves)
    @user = user
    @vendors = vendors
    @cves = cves

    puts "Sending alert email to: #{@user.email}"
    mail(to: @user.email, subject: 'CVE Alerts')
  end
end
