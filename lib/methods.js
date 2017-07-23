Meteor.methods({
	'updateRcode'({ meteorId, newRcode, oldRcode }) {
		new SimpleSchema({
			meteorId: { type: String },
			newRcode: { type: String },
			oldRcode: { type: String },
		}).validate({ meteorId, newRcode, oldRcode });
		
		OmuIRTV.update(
			{ meteorUserId: meteorId },
			{ $set: { rcode: newRcode } },
			{ multi: true },
		);

		MenuList.update(
			{ restCode: oldRcode },
			{ $set: { restCode: newRcode } },
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

	'clearTableStandingOrders'({ Rcode, tabnum }) {
		new SimpleSchema({
			Rcode: { type: String },
			tabnum: { type: Number },
		}).validate({ Rcode, tabnum });
		
		StandingOrders.remove({
			restCode: Rcode,
			tablenum: tabnum,
		});
	},
});
