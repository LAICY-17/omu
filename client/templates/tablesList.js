Template.tablesList.helpers({
	'restcode' : function() {
		return OmuIRTV.findOne({ meteorUserId: Meteor.userId() }).rcode;
	},
	'tablelist' : function() {
		return OmuIRTV.find(
			{ meteorUserId: Meteor.userId() },
			{ sort: { tablenum: 1 } },
		);
	},

	'emptyness': function() {
		console.log("rcode:" + this.rcode + " tablenum:" + this.tablenum);
		const SOC = StandingOrders.find({
			restCode: this.rcode,
			tablenum: this.tablenum,
		}).count();
		const COC = ConfirmedOrders.find({
			restCode: this.rcode,
			tablenum: this.tablenum,
		}).count();
		console.log("SOC:" + SOC + " COC:" + COC);
		if (SOC == 0 && COC == 0) {
			return "Empty";
		} else {
			return "Not Empty";
		}
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
		//wipe all orders related to the rcode + tablenum
		Meteor.call('wipeOrders', {
			Rcode: this.rcode,
			tabnum: this.tablenum,
		}, (err, res) => {
			if (err) {
				alert(arr);
			} else {
				console.log("xuccess");
			}
		});
	},
});
