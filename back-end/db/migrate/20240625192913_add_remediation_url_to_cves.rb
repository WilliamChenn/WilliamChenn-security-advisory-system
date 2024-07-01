class AddRemediationUrlToCves < ActiveRecord::Migration[7.1]
  def change
    add_column :cves, :remediation_url, :string
  end
end
