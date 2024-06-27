# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Clear existing data
#User.destroy_all
#Vendor.destroy_all
# Reset the sequence for the Vendor and User tables to start at 1
#ActiveRecord::Base.connection.execute("ALTER SEQUENCE vendors_id_seq RESTART WITH 1;")
#ActiveRecord::Base.connection.execute("ALTER SEQUENCE users_id_seq RESTART WITH 1;")

defaultVendors = ["Microsoft", "Adobe", "Apple"]
#Jetbrains
#Linux


# Function to fetch CVE data for a given vendor
def fetch_cve_data_for_vendor(vendor_name)
    FetchCVEDataService.call(vendor_name)
end
  
# Fetch and seed data for each default vendor
defaultVendors.each do |vendor_name|
    fetch_cve_data_for_vendor(vendor_name)
end
  


puts "Seeding completed!"