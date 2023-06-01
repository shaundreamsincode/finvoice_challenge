Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    namespace :v1 do
      defaults format: :json do
        resources :invoices, only: :index do
          post :purchase
          post :close
        end
      end
    end
  end
end
