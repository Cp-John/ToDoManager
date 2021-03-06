Rails.application.routes.draw do
  root 'welcome#index'
  
  namespace :api do
    resources :tasks, param: :id
    resources :categories
    # , only: [:create, :destroy]
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '*path', to: 'welcome#index', via: :all
end
