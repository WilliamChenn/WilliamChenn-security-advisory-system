class Vendor < ApplicationRecord
    has_many :cves, dependent: :destroy
    
    # Example of validation, adjust as per your requirements
    validates :remediation_url, presence: true, length: { maximum: 255 }
  end
  