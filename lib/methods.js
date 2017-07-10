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
	}
});
