class AddUserPngToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :user_png, :string
  end
end
