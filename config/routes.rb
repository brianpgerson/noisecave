Rails.application.routes.draw do
  resources :users, only: [:create, :new, :update]
  resource :sesssion, only: [:create, :new, :destroy]
end
