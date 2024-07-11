class CVEAlertMailer < ApplicationMailer
    default from: 'alerts@example.com'

    def cve_alert_email(user, cve_list)
      @user = user
      @cve_list = cve_list
      mail(to: @user.email, subject: 'Your CVE Alerts')
    end
end
