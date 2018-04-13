class UserMailer < ApplicationMailer

    def order_email(user, order)
        @user = user
        @order = order 
        mail(to: "dirtybootsfarmstore@gmail.com", subject: 'testing')
        #mail(to: @user.email, subject: 'Welcome to My Awesome Site')
    end

end
