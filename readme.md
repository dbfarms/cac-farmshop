to fix git corrupt file issue:
find .git/objects/ -type f -empty | xargs rm
git fetch -p
git fsck --full

////////////////////////////////////////////////////////////

***************
where i left off:
1) left border on fgs and maybe center them better
  1a) consider turning dropdown into list that highlights as you scroll down
2) cart, add ability to simply change number of item instead of adding, see form that updates as you change it to make sure amount is ok
3) catching errors?
4) what's the turnaround on an order? / change display to show what's available for the next day / in order of category
5) forms
6) farmer and admin stylizing 
7)  
***************

TO DO LIST:
Bugs
 -need to test what happens if item is sold out before soeone checks out... 
 
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
 (
   -over ordering catch.. does that work?
-farmer_order doesn't make sense yet... do i need farmer line_items or does it take that place? can't add farmgoods to farmer_order which makes it more like a farmer line_item so maybe that is the direction to go

-farmer_orders need to be created off of each farmer and farmgood listed in line item per cart 
)
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


