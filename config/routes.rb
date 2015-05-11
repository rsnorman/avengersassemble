Rails.application.routes.draw do

  root 'characters#index'

  namespace :api do
    namespace :v1 do
      resources :characters, only: :index
    end
  end

end
