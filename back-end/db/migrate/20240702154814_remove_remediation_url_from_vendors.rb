class RemoveRemediationUrlFromVendors < ActiveRecord::Migration[7.1]
  def change
    remove_column :vendors, :remediation_url, :string
  end
end
