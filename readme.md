to fix git corrupt file issue:
find .git/objects/ -type f -empty | xargs rm
git fetch -p
git fsck --full
////////////////////////////////////////////////////////////

***************
where i left off:
3/20 
-not sure if checkout button works
-when it did it got to cart/delete byebug where i should also delete lineitems and decrease quantity of farmgoods

-when does quantity decrease... when added to cart or when checkout? maybe it happens one way when it's more than 5 but another way when it's less... but that is probably dumb
-needs to deduct from available quantity of farmgoods unless taht shouldn't happen until checkout... which means we'd need a second check
-you can still add things that no longer exist... perhaps you should be able to do that but then it'll say you can't actually checkout until it's available agian... or... until a certain day you can't order
-what's the turnaround on an order?
***************

TO DO LIST:
Bugs
 -load page for all pages
 -session controller needs to be able to discern between farmer and customer when creating session
 -redirects.... 
 -state farmgood and farmgoods might be the same array in some point, so try to get rid of one 

1- customer perspective
 -checkout ... need to incorporate stripe and deduct from farmer goods i think... 
 -cart component slides down as you pick shit?
 -decreasing quantity available (after checkout)
 -get rid of home and signup in header 

2- farmers 
-orders page of all orders and who they are going to and when they're needed and it should be emailed to user too
-editfarmgoods needs to authenticate farmer and crashes if not visited through the farmerfarmgood page
-need to work out authentication/authorization in farmgoods_controller when creating goods cause right now it's off... 
-upload photo of farmgood or should that only be admin resp? 
-need to be add farmgood to farmer's farmgoods in backend whenever something new is created, only going one direction it seems
 -profile page -- NEEDS TO BE EDITABLE
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


