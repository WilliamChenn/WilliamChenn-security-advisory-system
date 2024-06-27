# lib/tasks/fetch_cve_data.rake

namespace :fetch_cve_data do
    desc "Fetch CVE data for a specific vendor"
    task :fetch_vendor_data, [:vendor_name] => :environment do |_, args|
      vendor_name = args[:vendor_name]
      FetchCVEDataService.call(vendor_name)
    end
  end
  