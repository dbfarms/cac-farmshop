class SessionsController < ApplicationController
  #skip_before_action :authenticate #, only: [:create]
  
  def create
    #byebug
    
    #########
    #conditional determing if farer or customer probably needs to be done differently

    #byebug 
    if (!!User.find_by(email: auth_params[:email]))
      #byebug 
      user = User.find_by(email: auth_params[:email])
      #byebug
      if user && user.authenticate(auth_params[:password])
        #byebug
        jwt = Auth.issue({user: user.id})
        role = user.authorization
        name = user.farmer.name 
        
        request['Authorization'] = jwt
        request.headers['Authorization'] = jwt
        request.env['Authorization'] = jwt 
        session[:Authorization] = jwt 
        request['Role'] = role
        request.headers['Role'] = role
        request.env['Role'] = role
        session[:Role] = role
        request.headers['Name'] = name
        request.env['Name'] = name
        session[:Name] = name

        render json: {jwt: jwt, role: role, farmer_id: user.id } #, id: id} ##DOES ROLE NEED BE ENCRYPTED?
      else 
        render json: {:errors=>
        [{:detail=>"incorrect email or password", 
          :source=>{:pointer=>"user/err_type"}}
        ]}, status: 404
      end 

    elsif (CustomerUser.find_by(email: auth_params[:email]))

      byebug 

      render json: {jwt: jwt, role: role }  ##DOES ROLE NEED BE ENCRYPTED?
    ## right now admin doesn't need a separate conditional but it might so don't sleep on it
    else
      #byebug
      render json: {:errors=>
        [{:detail=>"incorrect email or password", 
          :source=>{:pointer=>"user/err_type"}}
        ]}, status: 404
    end
  end

  def user_current

    if request.env["HTTP_AUTHORIZATION"]
      user_id = request.env["HTTP_AUTHORIZATION"].scan(/Bearer (.*)$/).flatten.last
      user = Auth.decode(user_id)
      userToJson = User.find(user["user"])
      farmer_id = user["user"] #this looks like it's probably wrong... ?
      #byebug
      #head farmer_id
      render json: {userToJson: userToJson}
    else 
      render json: {:errors=>
      [{:detail=>"unindentified farmer id", 
        :source=>{:pointer=>"user/err_type"}}
      ]}, status: 404

    end 
  end 


  private
    def auth_params
      params.require(:auth).permit(:email, :password)
    end
end