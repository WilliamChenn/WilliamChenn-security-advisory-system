Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get '/auth/saml', to: 'application#saml_auth', as: :saml_auth
  post '/saml', to: 'application#saml_consume', as: :saml_consume
  get '/is_logged_in', to: 'application#is_logged_in'

  namespace :api do
    namespace :v1 do
      get '/remediation_url/:id', to: 'cves#remediation_url' 
      #/api/v1/remediation_url/CVE-2024-35249

      post '/remediation/:id', to: 'cves#save_remediation'
      get '/remediation/:id', to: 'cves#get_remediation'
      get '/remediation/:id', to: 'cves#clear_remediation'
      #/api/v1/remediation/CVE-2024-35249

      resources :cves, only: [:index, :show] do
        collection do
          get 'recent'
        end
      end
      resources :vendors, only: [:index]
      post 'vendors/:name', to: 'vendors#create', as: 'create_vendor_by_name'
      delete 'vendors/:name', to: 'vendors#destroy', as: 'delete_vendor_by_name'
    end

    namespace :v2 do
      resources :criticality, only: [:index]
    end

    namespace :v3 do
      resources :vendors, only: [:index] do
        member do
          post 'add_user'
          delete 'remove_user'
        end
      end

      resources :cves, only: [:index] do
        collection do
          get 'critical'
          get 'recent'
        end
      end

      resources :users, only: [] do
        collection do
          post 'upload_png'
          get 'get_png'
          post 'logout'
          put 'set_profile_picture_index'  # New route for setting profile picture index
          get 'get_profile_picture_index'  # New route for getting profile picture index
        end
      end
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
