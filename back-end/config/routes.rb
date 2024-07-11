Rails.application.routes.draw do
  get '/auth/saml', to: 'application#saml_auth', as: :saml_auth
  post '/saml', to: 'application#saml_consume', as: :saml_consume
  get '/is_logged_in', to: 'application#is_logged_in'

  namespace :api do
    namespace :v1 do
      get '/remediation_url/:id', to: 'cves#remediation_url'

      resource :user_frequencies, only: [:show, :create, :update, :destroy]
      resource :user_severities, only: [:show, :create, :update, :destroy]

      resources :user_notification_vendors
      #post '/user_notification_vendors/:id', to: 'user_notification_vendors#create'

      post '/remediation/:id', to: 'cves#save_remediation'
      get '/remediation/:id', to: 'cves#get_remediation'
      delete '/remediation/:id', to: 'cves#clear_remediation'

      resources :cves, only: [:index, :show] do
        collection do
          get 'recent'
        end
      end
      resources :vendors, only: [:index]
      post 'vendors/:name', to: 'vendors#create', as: 'create_vendor_by_name'
      delete 'vendors/:name', to: 'vendors#destroy', as: 'delete_vendor_by_name'
      resources :users, only: [] do
        member do
          get 'email_and_uid', to: 'users#show_email_and_uid'
        end
      end
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
        collection do
          post 'refresh_vendors'
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
          put 'set_profile_picture_index'
          get 'get_profile_picture_index'
        end
        member do
          get 'email_and_uid_and_name', to: 'users#show_email_and_uid_and_name'
        end
      end
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
