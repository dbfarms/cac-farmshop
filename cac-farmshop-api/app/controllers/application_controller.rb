class ApplicationController < ActionController::API
  #before_action :authorized_role
  #before_action :authenticate 

  def logged_in?
    #byebug 
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
        #session[:Authorization] = header 
        testArray << header
      end 
    end 

    #byebug 
    if auth_present?
      #byebug
      case session[:Role]
      when "customer"
        puts "i am a customer"
        user = CustomerUser.find(auth["user"])
        #byebug 
      when "admin"
        puts "i am an admin"
        user = User.find(auth["user"])
        #byebug 
      when "farmer"
        puts "i am a farmer"
        user = User.find(auth["user"])
        #byebug 
      else 
        puts "error"
      end 

      
      #byebug
      if user
        #byebug 
        @current_user ||= user
      end
    end
  end

  def authenticate
    #byebug
    render json: {error: "unauthorized"}, status: 404 unless logged_in?
  end

 
  def authorized_role
    #byebug
  end 


  private

    def token
      #byebug
      if request.env["HTTP_AUTHORIZATION"].scan(/Bearer /) != [] 
        #byebug
        request.env["HTTP_AUTHORIZATION"].scan(/Bearer (.*)$/).flatten.last
      else 
        #byebug
        request.env["HTTP_AUTHORIZATION"]
      end 
    end

    def auth
      Auth.decode(token)
    end

    def auth_present?
      #!!request.env.fetch("HTTP_AUTHORIZATION", "") #.scan(/Bearer/).flatten.first
      if request.env.fetch("HTTP_AUTHORIZATION", "") === ""
        return false 
      else 
        return true
      end 
    end
end



