class Vendor < ApplicationRecord
    has_many :cves, dependent: :destroy
end
