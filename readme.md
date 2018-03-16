to fix git corrupt file issue:
find .git/objects/ -type f -empty | xargs rm
git fetch -p
git fsck --full
////////////////////////////////////////////////////////////


TO DO LIST:
Bugs
 -session controller needs to be able to discern between farmer and customer when creating session
 -redirects.... 
 -state farmgood and farmgoods might be the same array in some point, so try to get rid of one 

1- customer perspective
 -adding to carts
 -decreasing quantity available (line_items)
 -get rid of home and signup in header 

2- farmers 
-orders page of all orders and who they are going to and when they're needed and it should be emailed to user too
-editfarmgoods needs to authenticate farmer and crashes if not visited through the farmerfarmgood page
-need to work out authentication/authorization in farmgoods_controller when creating goods cause right now it's off... 
-upload photo of farmgood or should that only be admin resp? 
-need to be add farmgood to farmer's farmgoods in backend whenever something new is created, only going one direction it seems
 -profile page -- NEEDS TO BE EDITABLE
 -make it so farmers can only edit their own farmgoods etc
 -list of open orders / accepting orders / rejecting orders
 -email list to farmer 
 -client accounts 
 -wholesale options?
 -delivery options?


3-navbar
 -stays along top w/ scroll down

4-admin
  -users list page, should have their information (i.e. farmer, customer) with links to orders (for or from)
  -sessionStorage id is undefined ... always? sometimes?
  -users_controller needs to authorization in addition authentication
  -two headers when new user created as an admin cuase of the dtermining factor for which routes should show up so just fix that
 -view orders of all farmers, edit all farmers 

5-design
 -you know, completely redo 

6-misc 
 -get input from farmers 
 -validations for forms
 -review security issues

7-outreach 


