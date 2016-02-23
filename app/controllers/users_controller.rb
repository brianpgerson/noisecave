class UsersController < ApplicationController

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save!
      login(@user)
      flash[:notice] = "Thanks for signing up!"
      render :show
    else
      flash[:errors] = @user.errors.full_messages
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :session_token, :password, :description, :image)
  end
end
