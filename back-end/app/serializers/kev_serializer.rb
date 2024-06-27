class KevSerializer
    include FastJsonapi::ObjectSerializer
    attributes :cve_id, :vendor_project, :product, :vulnerability_name, :date_added, :short_description, :required_action, :due_date, :known_ransomware_campaign_use, :notes
  end
  