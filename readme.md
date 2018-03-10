
TO DO LIST:
Bugs
 -redirects.... 

1- customer perspective
 -adding to carts
 -decreasing quantity available (line_items)
 -

2- farmers 
-made up farmers don't correspond to users... how to reconcile? farmer < user or whatever 
-need to be add farmgood to farmer's farmgoods in backend whenever something new is created, only going one direction it seems
 -profile page -- NEEDS TO BE EDITABLE
 -make it so farmers can only edit their own farmgoods etc
 -list of open orders / accepting orders / rejecting orders
 -email list to farmer 
 -client accounts 
 -wholesale options?
 -delivery options?

 class ChangeColumnName < ActiveRecord::Migration[5.1]
  def change
    rename_column :farmers, :farmer_id, :user_id
  end
end


3-navbar
 -stays along top w/ scroll down

4-admin
 -view orders of all farmers, edit all farmers 

5-design
 -you know, completely redo 

6-misc 
 -get input from farmers 
 -validations for forms

7-outreach 


