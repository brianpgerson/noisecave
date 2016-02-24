

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  attr_reader :current_user

  def is_logged_in?
    return true if current_user
    return false
  end

  protected


  def login(user)
    @current_user = user
    session[:session_token] = user.session_token
  end

  def logout
    current_user.reset_session_token
    session[:session_token] = nil
    @current_user = nil
  end

  def current_user
    return nil if session[:session_token].nil?
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  helper_method :current_user


end
