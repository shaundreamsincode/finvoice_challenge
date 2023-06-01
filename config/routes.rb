Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    namespace :v1 do
      defaults format: :json do
        resources :invoices, only: :index
      end
    end
  end
end
