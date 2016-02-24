Rails.application.routes.draw do
  root to: "static_pages#root"
  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :new, :update]
    resources :tracks, only: [:create, :update, :index, :destroy, :show]
  end
  get 'api/session/auth', :to => 'api/sessions#authenticate'

end
