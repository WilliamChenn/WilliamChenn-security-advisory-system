class VendorSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :vendor_id

  has_many :cves
end
