class CVEAlertMailer < ApplicationMailer
    default from: 'your_email@duke.edu'

    def send_cve_alert(user, cves)
      @user = user
      @cves = cves
      mail(to: @user.email, subject: 'CVE Alerts for Your Selected Vendors')
    end
end
