class CreateUsersVendors < ActiveRecord::Migration[7.1]
  def change
    create_table :users_vendors, id: false do |t|
      t.string :uid, null: false
      t.bigint :vendor_id, null: false

      t.index [:uid, :vendor_id], unique: true
      t.index :vendor_id
    end

    add_foreign_key :users_vendors, :users, column: :uid, primary_key: :uid
    add_foreign_key :users_vendors, :vendors, column: :vendor_id, primary_key: :id
  end
end
