Rails.application.routes.draw do

  root 'teams#index'

  resources :teams, only: [:new, :index, :show, :edit]

  resources :characters do
    member do
      get :image
    end
  end

  resources :sessions, only: :new

  match 'auth/:provider/callback', to: 'sessions#create', via: :get
  match 'auth/failure', to: redirect('/'), via: :get
  match 'signout', to: 'sessions#destroy', as: 'signout', via: :get
  match 'privacy', to: 'privacy_policy#index', via: :get
  match 'about', to: 'about#index', via: :get

  namespace :api do
    namespace :v1 do
      resources :characters, only: :index do
        collection do
          get :camaraderie
        end
      end
      resources :teams, only: [:create, :update, :index]
      resources :team_banners, only: :create
    end
  end

end
