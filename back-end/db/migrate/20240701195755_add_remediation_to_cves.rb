class AddRemediationToCves < ActiveRecord::Migration[7.1]
  def change
    add_column :cves, :remediation, :text
  end
end
