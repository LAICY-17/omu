Template.tablesList.helpers({
	'tablelist' : function() {
		return OmuIRTV.find(
			{ meteorUserId: Meteor.userId() },
			{ sort: { tablenum: 1 } },
		);
	},
});

Template.tablesList.events({
	'click .refreshVcode': function() {
		const documentId = this._id;
		const rnum = Math.floor(Math.random() * (9999 - 0 + 1)) + 0;
		OmuIRTV.update(
			{ _id: documentId },
			{ $set: { vcode: rnum } },
		);
	},
});
