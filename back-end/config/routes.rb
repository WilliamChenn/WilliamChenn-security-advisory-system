Rails.application.routes.draw do
  # Routes related to SAML authentication
  get '/auth/saml', to: 'application#saml_auth', as: :saml_auth
  post '/saml', to: 'application#saml_consume', as: :saml_consume
  get '/is_logged_in', to: 'application#is_logged_in'

  

  # API v1 routes
  namespace :api do
    namespace :v1 do
        # Route for fetching KEV data (outside of the api namespace)
      get '/fetch_kev_data', to: 'kevs#fetch_kev_data'
      resources :cves, only: [:index, :show] do
        collection do
          get 'recent'
        end
      end
      resources :vendors, only: [:index]
      post 'vendors/:name', to: 'vendors#create', as: 'create_vendor_by_name'
      delete 'vendors/:name', to: 'vendors#destroy', as: 'delete_vendor_by_name'
    end
  end

  # API v2 routes
  namespace :api do
    namespace :v2 do
      resources :criticality, only: [:index]
    end
  end

  # Health check route
  get "up" => "rails/health#show", as: :rails_health_check

  # Root path route (define this according to your application)
  # root "posts#index"
end
