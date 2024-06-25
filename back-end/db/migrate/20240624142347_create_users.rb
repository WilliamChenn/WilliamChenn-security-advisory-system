class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    unless table_exists?(:users)
      create_table :users do |t|
        t.string :name
        t.string :uid
        t.string :email
        t.string :auth_token
  
        t.timestamps
      end
    end
  end
end
