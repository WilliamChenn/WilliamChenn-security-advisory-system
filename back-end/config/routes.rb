# config/routes.rb

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get '/auth/saml', to: 'application#saml_auth', as: :saml_auth
  post '/saml', to: 'application#saml_consume', as: :saml_consume
  get '/is_logged_in', to: 'application#is_logged_in'

  namespace :api do
    namespace :v1 do
      resources :cves, only: [:index, :show] do
        #GET /api/v1/cves/CVE-2023-1234
        collection do
          get 'recent'
          # /api/v1/cves/recent?time_range=day|week|two_weeks|month|year
        end
      end
      resources :vendors, only: [:index]
      # /api/v1/vendors/ - to list all vendors (GET request)
      post 'vendors/:name', to: 'vendors#create', as: 'create_vendor_by_name'
      # POST /api/v1/vendors/Adobe - to create a new vendor (POST request) (this will also load in cve's from the vendor to the table)
      delete 'vendors/:name', to: 'vendors#destroy', as: 'delete_vendor_by_name'
      # /api/v1/vendors/Microsoft - to delete a vendor by name (DELETE request)
    end

    namespace :v2 do
      resources :criticality, only: [:index] 
      # /api/v2/criticality?max_cvss_base_score=low|medium|high|critical - to get CVEs by criticality (GET request)
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end


