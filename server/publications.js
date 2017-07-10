Meteor.publish('menulist', function() {
	return MenuList.find({});
});

Meteor.publish('standingorders', function() {
	return StandingOrders.find({});
});

Meteor.publish('confirmedorders', function() {
	return ConfirmedOrders.find({});
});

Meteor.publish('omuirtv', function() {
	return OmuIRTV.find({});
});
