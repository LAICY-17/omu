```
Terminology
Section - The domain of the website that belongs to a restaurant. eg omu.com/MCDBDK
Admin section - Section that the restuarant staff (admins) have access to
User section - What the restaurant goers (users) see when they enter the table ID
Processed order - An order that has been submitted to the kitchen
Standing order - An order that has yet to be sent to the kitchen
Master order list - The dynamic list of orders that resides in the admin section
Table order list - The list of orders for a table that contains both the processed orders and standing orders
```

# TODO
* Question: Is it possible to have Admins host their own sections with their computers? Is that for the better or worse?

# Mandatory Features
* Allow adding on to the table order list anytime
* Visually delineate between processed orders and standing orders
* Dynamic updating of master order list (sorted by time)
  * Also dynamically remove orders
* Support registration & login for restaurants
  * Multiple admins can log into the same admin section! So chefs can access and servers can access separately
* Menu customization
* Each unique user given a unique identifier
  * Max pool of unique names before end numbers are generated? Perhaps use a hashing function to uniformly distribute the users with the limited pool of unique names

# Optional Features
* Image support with Menu list
* Master order list can be sorted by Table
* Servers can actually access the same user section to help take orders if needed
* Prominent audio and visual feedback sound/animation when sending order
* Deeper customization 
  * Allow several 'presets' of the website to choose from (eg grid, list)
  * User input can either be selecting admin-set options or entering free text into a text form
  * If implemented correctly, the website can also be used to quickly gather feedback/response from a group of people quickly (eg local online survey)
* QR code support (instead of entering Table ID)
* Recycle Bin that stores deleted entries until day's end
* Two-tier confirmation system in Admin section -- one for chefs to mark as 'cooked' and one for servers to mark as 'served'
* Sanitise login page to prevent SQL attacks. And other security improvements.
