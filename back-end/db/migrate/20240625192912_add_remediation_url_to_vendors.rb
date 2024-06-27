class AddRemediationUrlToVendors < ActiveRecord::Migration[7.1]
  def change
    add_column :vendors, :remediation_url, :string
  end
end
