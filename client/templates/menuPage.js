Template.menuPage.helpers({
	'currenttabl': function() {
		const reecode = Session.get('CurrentResto');
		const tabno = Session.get('CurrentTable');
		if (reecode == undefined || tabno == undefined) {
			// document.getElementById("undefinedTableError").href = {{pathFor 'tableLogin'}};
			console.log("undefined tables, tell user to go back to login page");
		}
		return (reecode + " - " + tabno);
	},

	'menulist' : function() {
		const Rcode = Session.get('CurrentResto');
		return MenuList.find(
			{ restCode: Rcode },
			{ sort: { menuitem: 1 } },
		);
	},

	'selectedMenuItem': function() {
		const menuItemId = this._id;
		const selectedMenuItemId = Session.get('sMII');
		if (menuItemId == selectedMenuItemId) {
			return "selected";
		}
	},

	'standingorders' : function() {
		const Rcode = Session.get('CurrentResto');
		const CurrTable = Session.get('CurrentTable');
		return StandingOrders.find({
			restCode: Rcode,
			tablenum: CurrTable,
		},
			{ sort: { createdAt: 1 } }
		);
	},

	'confirmedorders' : function() {
		const Rcode = Session.get('CurrentResto');
		const CurrTable = Session.get('CurrentTable');
		return ConfirmedOrders.find({
			restCode: Rcode,
			tablenum: CurrTable,
		},
			{ sort: { createdAt: -1 } }
		);
	},
});

Template.menuPage.events({
	'click .menuitm': function() {
		const menuItemId = this._id;
		Session.set('sMII', menuItemId);
		const Rcode = Session.get('CurrentResto');
		const TabNum = Session.get('CurrentTable');
		console.log(Rcode);
		console.log(TabNum);
		
		if(StandingOrders.find({menuitem: this.menuitem}).count() == 0) {
			StandingOrders.insert({
				menuitem: this.menuitem,
				qty: 1,
				restCode: Rcode,
				tablenum: TabNum,
				createdAt: Date.now(),
			});
		}
		
	},

	'click .orderitm': function() {
		const orderItemId = this._id;
		Session.set('sOII', orderItemId);
	},

	'click .remove': function() {
		const selectedMenuItem = Session.get('sMII');
		MenuList.remove({
			_id: selectedMenuItem
		});
	},

	'click .removeOrder': function() {
		const selectedOrderItem = Session.get('sOII');
		StandingOrders.remove({
			_id: selectedOrderItem
		});
	},

	'click .sendOrders': function() {
		StandingOrders.find().forEach(
			function(doc) {
				ConfirmedOrders.insert({
					menuitem: doc.menuitem,
					qty: doc.qty,
					restCode: doc.restCode,
					tablenum: doc.tablenum,
					createdAt: Date.now(),
					orderstatus: "(preparing)",
				});
			}
		);
	
		Meteor.call('clearStandingOrders');
	},

	'click .clearCfmOrders': function() {
		Meteor.call('clearConfirmedOrders');
	},

	'click .add': function() {
		const docID = this._id;
		StandingOrders.update({_id: docID}, {$inc: {qty: 1}});
	},

	'click .sub': function() {
		const docID = this._id;
		StandingOrders.update({_id: docID}, {$inc: {qty: -1}});
		if(StandingOrders.findOne({_id: docID}).qty == 0) {
			StandingOrders.remove({_id: docID});
		}
	},

	'click .del': function() {
		const docID = this._id;
		StandingOrders.remove({_id: docID});
	},

	'click .testbutton': function() {
		const reecode = Session.get('CurrentResto');
		const tabno = Session.get('CurrentTable');
		console.log(reecode);
		console.log(tabno);
	},
});
