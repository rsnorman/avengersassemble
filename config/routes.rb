Rails.application.routes.draw do

  root 'teams#new'

  resources :teams, only: :index

  namespace :api do
    namespace :v1 do
      resources :characters, only: :index
      resources :teams, only: [:create, :index]
    end
  end

end
