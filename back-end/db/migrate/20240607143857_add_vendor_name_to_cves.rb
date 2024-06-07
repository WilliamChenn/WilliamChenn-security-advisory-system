class AddVendorNameToCves < ActiveRecord::Migration[7.1]
  def change
    add_column :cves, :vendor_name, :string
  end
end
