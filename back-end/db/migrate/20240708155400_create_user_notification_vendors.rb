class CreateUserNotificationVendors < ActiveRecord::Migration[6.0]
  def change
    create_table :user_notification_vendors do |t|
      t.references :user, null: false, foreign_key: true
      t.references :vendor, null: false, foreign_key: true

      t.timestamps
    end

    add_index :user_notification_vendors, [:user_id, :vendor_id], unique: true
  end
end
