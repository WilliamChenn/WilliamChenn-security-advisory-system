class Vendor < ApplicationRecord
    has_many :cves, dependent: :destroy

    #The dependent: :destroy option in a has_many association in Rails specifies that 
    #when the parent record (in this case, a Vendor) is destroyed, 
    #all associated child records (in this case, Cve records) should also be destroyed.
end
