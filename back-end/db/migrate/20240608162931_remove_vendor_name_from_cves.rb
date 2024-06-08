class RemoveVendorNameFromCves < ActiveRecord::Migration[7.1]
  def change
    remove_column :cves, :vendor_name, :string
  end
end
