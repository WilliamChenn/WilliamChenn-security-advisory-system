class CreateUsersVendors < ActiveRecord::Migration[7.1]
  def change
    create_table :users_vendors do |t|
      t.references :user, null: false, foreign_key: true
      t.references :vendor, null: false, foreign_key: true

      t.timestamps
    end
  end
end
