import { Accounts } from 'meteor/accounts-base'

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

Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false});