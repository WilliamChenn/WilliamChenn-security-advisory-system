class Vendor < ApplicationRecord
    has_many :cves, dependent: :destroy
    has_many :users_vendors
    has_many :users, through: :users_vendors
  end
  
