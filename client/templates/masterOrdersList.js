Template.masterOrdersList.helpers({
	'orderlist': function() {
		return ConfirmedOrders.find();
	},
});

Template.masterOrdersList.events({
});
