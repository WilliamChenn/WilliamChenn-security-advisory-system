# app/mailers/cve_alert_mailer.rb
class CVEAlertMailer < ApplicationMailer
  def alert_email(user, vendors, cves)
    @user = user
    @vendors = vendors
    @cves = cves

    mail(to: @user.email, subject: 'CVE Alerts')
  end
end

