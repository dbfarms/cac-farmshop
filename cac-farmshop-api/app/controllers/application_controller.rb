class ApplicationController < ActionController::API
  
  before_action :authenticate 

  def logged_in?
    !!current_user
  end

  def current_user

    testArray = []
    request.env.each do |header|
      if header[0].scan(/Auth/) != []
        #byebug
        session[:Authorization] = header 
        testArray << header
      end 
    end 

    request.headers.each do |header|
      if header[0].scan(/AUTH/) != []
        #byebug
        session[:Authorization] = header 
        testArray << header
      end 
    end 

    #byebug 
    if auth_present?
      user = User.find(auth["user"])
      if user
        @current_user ||= user
      end
    end
  end

  def authenticate
    #byebug
    render json: {error: "unauthorized"}, status: 404 unless logged_in?
  end

  private

    def token
      request.env["HTTP_AUTHORIZATION"] #.scan(/Bearer (.*)$/).flatten.last
    end

    def auth
      Auth.decode(token)
    end

    def auth_present?
      !!request.env.fetch("HTTP_AUTHORIZATION", "") #.scan(/Bearer/).flatten.first
    end
end



