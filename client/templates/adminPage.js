Template.adminPage.helpers({
	'currentMeteorUserId' : function() {
		return Meteor.userId();
	},


	'currentRestaurantCode' : function() {
	},

	'currentTableAmt' : function() {
		let doTablesExist = OmuIRTV.find({
			meteorUserId: Meteor.userId()
		}).count();
		console.log(doTablesExist);
		if (doTablesExist == 0) {
			console.log("time to insert a new one");
		}
		// return OmuIRTV.find({ meteorUserId: Meteor.userId() }).tables.count();
	},

	'menulist' : function() {
		return MenuList.find( {},
			{sort: { createdAt: 1} }
		);
	},
});

Template.adminPage.events({
	'submit form': function(event) {
		event.preventDefault();
		const Rcode = event.target.Rcode.value;
		event.target.Rcode.value="";
		console.log(Rcode);
		// OmuIRTV.insert({
		// 	meteorUserId: Meteor.userId(),
		// 	rcode: Rcode,
		// )};
	},

	'click .addTable': function() {
	},

	'click .removeTable': function() {
	},

	'click .menuDel': function() {
		const documentId = this._id;
		MenuList.remove({ _id: documentId });
	},
});

// const ran = (Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0,5));
//
// const doesRcodeExist = OmuIRTV.find({
// 	meteorUserId: Meteor.userId(),
// 	// rcode: { $exists: true },
// }).count();
// console.log("rcode" + doesRcodeExist);
// if (doesRcodeExist == 0) {
// 	console.log("dicks");
// }
// const temp = OmuIRTV.findOne(
// 	{ meteorUserId: Meteor.userId() },
// 	// { fields: { rcode: 1 } },
// );
// return temp.rcode;
