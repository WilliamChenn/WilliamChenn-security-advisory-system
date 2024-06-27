class CreateUsersVendorsJoinTable < ActiveRecord::Migration[7.1]
  def change
    create_join_table :uids, :vendors do |t|
      # t.index [:uid_id, :vendor_id]
      # t.index [:vendor_id, :uid_id]
    end
  end
end
