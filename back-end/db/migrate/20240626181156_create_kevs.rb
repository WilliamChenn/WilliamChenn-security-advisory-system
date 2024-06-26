class CreateKevs < ActiveRecord::Migration[6.1]
  def change
    create_table :kevs do |t|
      t.string :column_name
      t.timestamps
    end
  end
end
