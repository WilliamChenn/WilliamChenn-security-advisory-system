class CreateUserFrequencies < ActiveRecord::Migration[7.1]
    def change
      create_table :user_frequencies do |t|
        t.references :user, null: false, foreign_key: true
        t.string :frequency
        t.time :time
  
        t.timestamps
      end
    end
  end
  