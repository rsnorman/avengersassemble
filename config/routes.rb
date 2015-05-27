Rails.application.routes.draw do

  root 'teams#new'

  resources :teams, only: :index

  resources :sessions, only: :new

  match 'auth/:provider/callback', to: 'sessions#create', via: :get
  match 'auth/failure', to: redirect('/'), via: :get
  match 'signout', to: 'sessions#destroy', as: 'signout', via: :get

  namespace :api do
    namespace :v1 do
      resources :characters, only: :index
      resources :teams, only: [:create, :index]
    end
  end

end
