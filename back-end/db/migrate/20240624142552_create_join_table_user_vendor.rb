class CreateJoinTableUserVendor < ActiveRecord::Migration[7.1]
  def change
    unless table_exists?(:users_vendors)
      create_join_table :users, :vendors do |t|
        # t.index [:user_id, :vendor_id]
        # t.index [:vendor_id, :user_id]
      end
    end
  end
end
