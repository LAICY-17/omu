Meteor.publish('menulist', function() {
	return MenuList.find({});
});
Meteor.publish('standingorders', function() {
	return StandingOrders.find({});
});
