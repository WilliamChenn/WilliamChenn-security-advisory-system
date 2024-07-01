class Vendor < ApplicationRecord
    has_many :cves, dependent: :destroy
    has_many :users_vendors
    has_many :users, through: :users_vendors

    validates :remediation_url, presence: true, length: { maximum: 255 }
  end
  