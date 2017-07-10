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
		console.log("new rcode is: " + Rcode);

		// v This Method only updates the first occurence, not ever occurence like it should (bug?)
		Meteor.call('updateRcode', {
			meteorUserId: Meteor.userId(),
			rcode: Rcode,
		});
		// v This method cannot be executed as it edits multiple documents
		// v and client side code is untrusted to do that
		// OmuIRTV.update(
		// 	{ meteorUserId: Meteor.userId() },
		// 	{ $set: { rcode: Rcode } },
		// );

		// const doesRcodeExist = OmuIRTV.find(
		// 	{ meteorUserId: Meteor.userId(),
		// 		rcode: { $exists: true } }
		// ).count();
		// if (doesRcodeExist > 0) {
		// 	currRcode = OmuIRTV.findOne({
		// 		meteorUserId: Meteor.userId()
		// 	}).rcode;
		// 	// v Post Condition: rcode fields for this user are not empty
		// 	do {
		// 		var currRcodeCount = OmuIRTV.find({
		// 			meteorUserId: Meteor.userId(),
		// 			rcode: currRcode,
		// 		}).count();
		// 		console.log("a: " + currRcodeCount);
		// 		if (currRcodeCount > 0) {
		// 			var currRcodeId = OmuIRTV.findOne({
		// 				meteorUserId: Meteor.userId(),
		// 				rcode: currRcode,
		// 			})._id;
		// 			OmuIRTV.update(
		// 				{ _id: currRcodeId },
		// 				{ $set: { rcode: Rcode }}
		// 			);
		// 		}
		// 		var currRcodeCount = OmuIRTV.find({
		// 			meteorUserId: Meteor.userId(),
		// 			rcode: currRcode,
		// 		}).count();
		// 		console.log("b: " + currRcodeCount);
		// 	} while (currRcodeCount > 0);
		// } else {
		// 	// v Post Condition: Either one or many documents have no rcode field
		// 	do {
		// 		var currEmptyRcodeCount = OmuIRTV.find({
		// 			meteorUserId: Meteor.userId(),
		// 			rcode: { exists: false },
		// 		}).count();
		// 		console.log("c: " + currRcodeCount);
		// 		if (currEmptyRcodeCount > 0) {
		// 			var currRcodeId = OmuIRTV.findOne({
		// 				meteorUserId: Meteor.userId(),
		// 				rcode: { exists: false },
		// 			})._id;
		// 			OmuIRTV.update(
		// 				{ _id: currRcodeId },
		// 				{ $set: { rcode: Rcode }}
		// 			);
		// 		}
		// 		var currEmptyRcodeCount = OmuIRTV.find({
		// 			meteorUserId: Meteor.userId(),
		// 			rcode: { exists: false },
		// 		}).count();
		// 		console.log("d: " + currRcodeCount);
		// 	} while (currEmptyRcodeCount > 0);
		// }
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
			const table_id = OmuIRTV.findOne({
				meteorUserId: Meteor.userId(),
				tablenum: TC,
			})._id;
			console.log(table_id);
			OmuIRTV.remove({ _id: table_id });
		} else {
			console.log("Either Standing Orders or Confirmed Orders is not empty, make sure both are empty before rmeoving tables");
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
