Template.masterOrdersList.helpers({
	'orderlist': function() {
		const Rcode = OmuIRTV.findOne({
			meteorUserId: Meteor.userId()
		}).rcode;
		return ConfirmedOrders.find(
			{ orderstatus: "(preparing)", restCode: Rcode },
			{ sort: { createdAt: 1 } },
		);
	},

	'cookedlist': function() {
		const Rcode = OmuIRTV.findOne({
			meteorUserId: Meteor.userId()
		}).rcode;
		return ConfirmedOrders.find(
			{ orderstatus: "(cooked)", restCode: Rcode },
			{ sort: { createdAt: 1 } },
		);
	},

	'servedlist': function() {
		const Rcode = OmuIRTV.findOne({
			meteorUserId: Meteor.userId()
		}).rcode;
		return ConfirmedOrders.find(
			{ orderstatus: "(served)", restCode: Rcode },
			{ sort: { createdAt: 1 } },
		);
	},

	'ostatus': function() {
		const currTable = this.tablenum;
		const currMenuItem = this.menuitem;
		const ostatus = this.orderstatus;
		if (ostatus == "(cooked)") {
			return "cooked";
		}
		if (ostatus == "(served)") {
			return "cookednserved";
		}
	},
});

Template.masterOrdersList.events({
	'click .markCooked': function() {
		const documentId = this._id;
		ConfirmedOrders.update(
			{ _id: documentId },
			{ $set: { orderstatus: "(cooked)" } },
		);
	},

	'click .unmarkCooked': function() {
		const documentId = this._id;
		ConfirmedOrders.update(
			{ _id: documentId },
			{ $set: { orderstatus: "(preparing)" } },
		);
	},

	'click .markServed': function() {
		const documentId = this._id;
		ConfirmedOrders.update(
			{ _id: documentId },
			{ $set: { orderstatus: "(served)" } },
		);
	},

	'click .unmarkServed': function() {
		const documentId = this._id;
		ConfirmedOrders.update(
			{ _id: documentId },
			{ $set: { orderstatus: "(cooked)" } },
		);
	},

});
