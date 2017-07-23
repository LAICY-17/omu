# OMU (Online MenU framework)

### Proposed Level of Achievement
Project Gemini

### Project Scope
An online menu framework that restaurants can use __out of the box__ to facilitate electronic ordering with the customer's smartphones. It aims to eliminate the need for waiters to manually take orders.

### Project Motivation
This project hopes to eliminate (or greatly reduce) the required manpower in restaurants for taking orders.

### Features
* Dynamic updating of master order list
* Constantly changing Table ID system that prevents pranksters outside the restaurant from spamming orders
* Registration system for restaurants
* Image support for menu list
* 'Recycle Bin' that stores deleted entries, which can be 'restored' if needed
* Different menu templates to choose from (for the restaurants)
* QR code support

### Technologies and tools to use
* Meteor React/Blaze

### Development Plan
1. Come up with barebones skeleton of the webapp
    * single restaurant
    * single menu
    * use table number, not table ID
	* bascially a single list(a menu), which updates the master order list in real time
2. Implement table ID (ever-changing table IDs)
3. Implement restaurant registration (multiple restaurants)
4. Implement menu customization ('add' and 'remove' from menu)
5. Prettify website (with CSS)
5. Implement other features (menu templates, image support, recycle bin...)
