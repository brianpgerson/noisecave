class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(user_params[:username], user_params[:password])
    if @user.nil?
      render json: {errors: ['Invalid username or password']}, status: :unauthorized
    else
      login(@user)
      render json: @user
    end
  end

  def authenticate
    if current_user
      render json: current_user
    else
      render json: {
        authRequestInProgress: false,
        authErrors: [],
        sessionToken: nil,
        username: nil,
        userId: nil
      }
    end
  end


  def destroy
    logout
    render json: {
      authRequestInProgress: false,
      authErrors: [],
      sessionToken: nil,
      username: nil,
      userId: nil
    }
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

end
