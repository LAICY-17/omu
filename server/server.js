Meteor.startup(function() {
	return Meteor.methods({
		clearStandingOrders: function() {
			return StandingOrders.remove({});
		},

		clearConfirmedOrders: function() {
			return ConfirmedOrders.remove({});
		},
	});
})
