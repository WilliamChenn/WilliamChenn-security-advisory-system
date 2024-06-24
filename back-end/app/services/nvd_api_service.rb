require 'net/http'
require 'json'

class NvdApiService
  BASE_URL = 'https://services.nvd.nist.gov/rest/json/cves/2.0'
  API_KEY = 'bd5fd8d4-edea-417f-84bf-51a86c8a4adc'

  def self.fetch_recent_cves(results_per_page: 20, start_index: 0)
    uri = URI("#{BASE_URL}?resultsPerPage=#{results_per_page}&startIndex=#{start_index}")
    request = Net::HTTP::Get.new(uri)
    request['apiKey'] = API_KEY

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
      http.request(request)
    end

    JSON.parse(response.body)
  end
end
