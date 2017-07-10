Template.adminPage.helpers({
	'currentMeteorUserId' : function() {
		return Meteor.userId();
	},

	'currentRestaurantCode' : function() {
		const rcode = OmuIRTV.findOne({
			meteorUserId: Meteor.userId()
		}).rcode;
		return rcode;
	},

	'currentTableAmt' : function() {
		const noOftables = OmuIRTV.find({
			meteorUserId: Meteor.userId()
		}).count();
		return noOftables;
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
		const x = Meteor.userId();
		Meteor.call('updateRcode', [x, Rcode]);
		// OmuIRTV.update(
		// 	{ meteorUserId: Meteor.userId() },
		// 	{ $set: { rcode: Rcode } },
		// );
	},

	'click .addTable': function() {
		const TC = OmuIRTV.find({
			meteorUserId: Meteor.userId()
		}).count();
		const rnum = Math.floor(Math.random() * (9999 - 0 + 1)) + 0;
		const doesRcodeExist = OmuIRTV.find(
			{ meteorUserId: Meteor.userId(),
				rcode: { $exists: true } }
		).count();
		console.log("TC: " + TC);
		console.log("rnum: " + rnum);
		console.log("rcode no: " + doesRcodeExist);
		if (doesRcodeExist == 0) {
			OmuIRTV.insert({
				meteorUserId: Meteor.userId(),
				tablenum: (TC+1),
				vcode: rnum,
			});
		} else {
			const Rcode = OmuIRTV.findOne(
				{ meteorUserId: Meteor.userId() }
			).rcode;
			console.log(Rcode);
			OmuIRTV.insert({
				meteorUserId: Meteor.userId(),
				rcode: Rcode,
				tablenum: (TC+1),
				vcode: rnum,
			});
		}
	},

	'click .removeTable': function() {
		const SOC = StandingOrders.find().count();
		const COC = ConfirmedOrders.find().count();
		const TC = OmuIRTV.find({
			meteorUserId: Meteor.userId()
		}).count();
		if (SOC == 0 && COC == 0 && TC > 1) {
		}
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
