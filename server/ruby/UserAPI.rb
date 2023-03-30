# app/models/user.rb
# Sorry that I am not proficient in Ruby, but I am doing my best to write some ruby code.
# In this page I implment two (regex) validator for validating the username & phone format
class User < ApplicationRecord
    validates :username, presence: true, format: { with: /\A\w+\s\w+\z/, message: "should contain at least 2 words" }
    validates :phone, presence: true, format: { with: /\A\+?\d{10,11}\z/, message: "should be a valid phone number" }
  end
  # app/controllers/users_controller.rb
  # Mocking the database action for storing in User Model
  class UsersController < ApplicationController
    def create
      user = User.new(user_params)
      if user.save
        # If Successful, return 201 created
        render json: { message: "User data saved successfully" }, status: :created
      else
        # Else, return 404 bad_request
        render json: { errors: user.errors.full_messages }, status: :bad_request
      end
    end
    private
    def user_params
      params.require(:user).permit(:full_name, :phone_number)
    end
  end
  # config/routes.rb
  # Redirect to the successful page
  Rails.application.routes.draw do
    resources :users, only: [:create]
  end