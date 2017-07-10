// MenuList contains every menu item from every restaurant
MenuList = new Mongo.Collection('menulist');

// StandingOrders contains every standing order from every table for every restaurant
StandingOrders = new Mongo.Collection('standingorders');

// ConfirmedOrders contains every confirmed order from every table from eveyr restaurant
ConfirmedOrders = new Mongo.Collection('confirmedorders');

// Omu Id, Rcode, Tablenum, Vcode
OmuIRTV = new Mongo.Collection('omuirtv');
// Data structure looks like
// omuirtv: {
//		meteorUserId: <unique alphanumeric string>
// 		rcode: <3-5 alphabet long string>
// 		tablenum: <2-digit number>
// 		vcode: <4-digit number>
// }
