Rails.application.routes.draw do
  root to: "static_pages#root"
  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :new, :show, :update]
    resources :tracks, only: [:create, :update, :index, :destroy, :show]
    resources :playlists, only: [:create, :update, :index, :destroy, :show]
    resources :playlistings, only: [:create, :update, :index, :destroy]
  end
  get 'api/session/auth', :to => 'api/sessions#authenticate'
  get 'api/presign', :to => 'api/presigners#presign_upload'
end
