class SessionsController < ApplicationController

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(user_params[:username], user_params[:password])
    if !@user.nil?
      login(@user)
      flash[:notice] = "Thanks for signing in!"
      render :show
    else
      flash[:errors] = "Sorry, but these credentials just won't do."
      render :new
    end
  end

  def delete
    logout    
    flash[:notice] = "You're all signed out!"
    redirect_to :new
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

end
