Meteor.methods({
	'updateRcode'({ meteorId, newRcode }) {
		new SimpleSchema({
			meteorId: { type: String },
			newRcode: { type: String },
		}).validate({ meteorId, newRcode });
		
		OmuIRTV.update(
			{ meteorUserId: meteorId },
			{ $set: { rcode: newRcode } },
			{ multi: true },
		);
	},

	'wipeOrders'({ Rcode, tabnum }) {
		new SimpleSchema({
			Rcode: { type: String },
			tabnum: { type: Number },
		}).validate({ Rcode, tabnum });
		
		StandingOrders.remove({
			restCode: Rcode,
			tablenum: tabnum,
		});

		ConfirmedOrders.remove({
			restCode: Rcode,
			tablenum: tabnum,
		});
	},
});
