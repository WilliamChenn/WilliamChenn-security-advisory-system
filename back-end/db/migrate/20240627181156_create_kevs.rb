class CreateKevs < ActiveRecord::Migration[6.1]
  def change
    unless table_exists?(:kevs)  # Check if 'kevs' table already exists
      create_table :kevs do |t|
        t.string :cve_id
        t.string :vendor_project
        t.string :product
        t.string :vulnerability_name
        t.date :date_added
        t.text :short_description
        t.text :required_action
        t.date :due_date
        t.boolean :known_ransomware_campaign_use  # Corrected to boolean type
        t.text :notes

        t.timestamps
      end
    end
  end
end
