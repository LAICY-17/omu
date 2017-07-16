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
		const rnum = Math.floor(Math.random() * (9999 - 0 + 1)) + 0;
		const x = OmuIRTV.find({
			meteorUserId: Meteor.userId()
		}).count();
		if (x==0) {
			OmuIRTV.insert({
				meteorUserId: Meteor.userId(),
				tablenum: 1,
				vcode: rnum,
			});
		}
		const noOftables = OmuIRTV.find({
			meteorUserId: Meteor.userId()
		}).count();
		return noOftables;
	},

	'menulist' : function() {
		const Rcode = OmuIRTV.findOne({
			meteorUserId: Meteor.userId()
		}).rcode;
		return MenuList.find(
			{ restCode: Rcode },
			{sort: { menuitem: 1} }
		);
	},
});

Template.adminPage.events({
	'submit form': function(event) {
		event.preventDefault();
		const Rcode = event.target.Rcode.value;
		event.target.Rcode.value="";

		//if an rcode exists for this user, extract the string into 'oldrcode'
		var oldrcode;
		const doesRcodeExist = OmuIRTV.find(
			{ meteorUserId: Meteor.userId(),
				rcode: { $exists: true } }
		).count();
		console.log(doesRcodeExist);
		if (doesRcodeExist != 0) {
			oldrcode = OmuIRTV.findOne({
				meteorUserId: Meteor.userId()
			}).rcode;
			console.log(oldrcode);
		} else {
			oldrcode = " ";
		}

		// if rcode already exists in OmuIRTV, reject entry and exit function
		const rcodeDuplicateConflict = OmuIRTV.find({
			rcode: Rcode
		}).count();
		if (rcodeDuplicateConflict != 0) {
			document.getElementById("editRcodeError").innerHTML = "This Restaurant Code already exists. Please try another."
			return;
		}

		const SOC = StandingOrders.find({
			restCode: oldrcode
		}).count();
		const COC = ConfirmedOrders.find({
			restCode: oldrcode
		}).count();
		if (SOC == 0 && COC == 0) {
			Meteor.call('updateRcode', {
				meteorId: Meteor.userId(),
				newRcode: Rcode,
				oldRcode: oldrcode,
			}, (err, res) => {
			  if (err) {
				alert(err);
			  } else {
				console.log("success");
			  }
			});
			document.getElementById("editRcodeError").innerHTML = ""
		} else {
			document.getElementById("editRcodeError").innerHTML = "Note: You can only edit your Restaurant Code if there are no more pending or confirmed orders in your restaurant"
		}
  	},

	'click .addTable': function() {
		const TC = OmuIRTV.find({
			meteorUserId: Meteor.userId()
		}).count();
		const rnum = Math.floor(Math.random() * 10000);
		const doesRcodeExist = OmuIRTV.find(
			{ meteorUserId: Meteor.userId(),
				rcode: { $exists: true } }
		).count();
		console.log("TC: " + TC);
		console.log("rnum: " + rnum);
		console.log("rcode no: " + doesRcodeExist);
		document.getElementById("removeErrorMsg").innerHTML = ""
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
		Rcode = OmuIRTV.findOne({
			meteorUserId: Meteor.userId()
		}).rcode;
		const SOC = StandingOrders.find({
			restCode: Rcode
		}).count();
		const COC = ConfirmedOrders.find({
			restCode: Rcode
		}).count();
		const TC = OmuIRTV.find({
			meteorUserId: Meteor.userId()
		}).count();
		if (SOC == 0 && COC == 0) {
			if (TC > 1) {
				const table_id = OmuIRTV.findOne({
					meteorUserId: Meteor.userId(),
					tablenum: TC,
				})._id;
				console.log(table_id);
				OmuIRTV.remove({ _id: table_id });
			} else {
				document.getElementById("removeErrorMsg").innerHTML = "Note: You cannot have less than 1 table"
			}
		} else {
			document.getElementById("removeErrorMsg").innerHTML = "Note: You can only remove tables if there are no more pending orders or customers in your restaurant"
		}
	},

	'click .menuDel': function() {
		Rcode = OmuIRTV.findOne({
			meteorUserId: Meteor.userId()
		}).rcode;
		const SOC = StandingOrders.find({
			restCode: Rcode
		}).count();
		const COC = ConfirmedOrders.find({
			restCode: Rcode
		}).count();

		if (SOC == 0 && COC == 0) {
			const documentId = this._id;
			MenuList.remove({ _id: documentId });
		} else {
			document.getElementById("deleteMenuError").innerHTML = "Note: You can only delete menu items if there are no more orders in your restaurant"
		}
	},
});
