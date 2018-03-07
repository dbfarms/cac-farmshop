class SessionsController < ApplicationController
  #skip_before_action :authenticate #, only: [:create]
  
  def create
    #byebug
    user = User.find_by(email: auth_params[:email])
    if user && user.authenticate(auth_params[:password])
      #byebug
      jwt = Auth.issue({user: user.id})
      role = user.authorization
      request['Authorization'] = jwt
      request.headers['Authorization'] = jwt
      request.env['Authorization'] = jwt 
      session[:Authorization] = jwt 
      request['Role'] = role
      request.headers['Role'] = role
      request.env['Role'] = role
      session[:Role] = role
      #byebug
      
      render json: {jwt: jwt, role: role} ##DOES ROLE NEED BE ENCRYPTED?
    else
      #byebug
      render json: {:errors=>
        [{:detail=>"incorrect email or password", 
          :source=>{:pointer=>"user/err_type"}}
        ]}, status: 404
    end
  end

  def user_current
    user_id = request.env["HTTP_AUTHORIZATION"].scan(/Bearer (.*)$/).flatten.last
    user = Auth.decode(user_id)
    userToJson = User.find(user["user"])
    byebug
    render json: {userToJson: userToJson}
    #return userToJson
    #return user 
  end 


  private
    def auth_params
      params.require(:auth).permit(:email, :password)
    end
end