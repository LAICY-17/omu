Template.menuPage.helpers({
	'currenttabl': function() {
		const reecode = Session.get('CurrentResto');
		const tabno = Session.get('CurrentTable');
		if (reecode == undefined || tabno == undefined) {
			Router.go('/');
			return;
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

	'unconfirmedcost' : function() {
		return (this.itemprice * this.qty);
	},

	'confirmedtotalcost' : function() {
		const Rcode = Session.get('CurrentResto');
		const TabNum = Session.get('CurrentTable');
		var confirmedtotalcost = 0;
		ConfirmedOrders.find({
			restCode: Rcode,
			tablenum: TabNum,
		}).forEach(
			function(doc) {
				confirmedtotalcost = confirmedtotalcost + doc.cost;
			}
		);
		return +confirmedtotalcost.toFixed(2);
	},

	'unconfirmedtotalcost' : function() {
		const Rcode = Session.get('CurrentResto');
		const TabNum = Session.get('CurrentTable');
		var unconfirmedtotalcost = 0;
		StandingOrders.find({
			restCode: Rcode,
			tablenum: TabNum,
		}).forEach(
			function(doc) {
				unconfirmedtotalcost = unconfirmedtotalcost + (doc.itemprice * doc.qty);
			}
		);
		return +unconfirmedtotalcost.toFixed(2);
	},
});

Template.menuPage.events({
	'click .menuitm': function() {
		const Rcode = Session.get('CurrentResto');
		const TabNum = Session.get('CurrentTable');
		const userVcode = Session.get('CurrentVcode');
		const VcodeCursor = OmuIRTV.find({
			rcode: Rcode,
			tablenum: TabNum,
			vcode: userVcode,
		});

		if(VcodeCursor.count() == 0) {
			Router.go('/');
			return;
		}

		const menuItemId = this._id;
		Session.set('sMII', menuItemId);
		const existInSO = StandingOrders.find({
			restCode: Rcode,
			tablenum: TabNum,
			menuitem: this.menuitem,
		}).count();

		if(existInSO == 0) {
			StandingOrders.insert({
				menuitem: this.menuitem,
				itemprice: this.itemprice,
				qty: 1,
				restCode: Rcode,
				tablenum: TabNum,
				createdAt: Date.now(),
			});
		}

	},

	/*
	'click .addmenuitm': function() {
		const Rcode = Session.get('CurrentResto');
		const TabNum = Session.get('CurrentTable');
		const userVcode = Session.get('CurrentVcode');
		const VcodeCursor = OmuIRTV.find({
			rcode: Rcode,
			tablenum: TabNum,
			vcode: userVcode,
		});

		if(VcodeCursor.count() == 0) {
			Router.go('/');
			return;
		}

		if(StandingOrders.find({menuitem: this.menuitem}).count() == 0) {
			StandingOrders.insert({
				menuitem: this.menuitem,
				qty: 1,
				restCode: Rcode,
				tablenum: TabNum,
				createdAt: Date.now(),
			});
		} else {
			standingorderId = StandingOrders.findOne({
				menuitem: this.menuitem
			})._id;
			StandingOrders.update(
				{ _id: standingorderId },
				{ $inc: { qty: 1 } },
			);
		}
	},
	*/

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
		const Rcode = Session.get('CurrentResto');
		const TabNum = Session.get('CurrentTable');
		const userVcode = Session.get('CurrentVcode');
		const VcodeCursor = OmuIRTV.find({
			rcode: Rcode,
			tablenum: TabNum,
			vcode: userVcode,
		});

		if(VcodeCursor.count() == 0) {
			Router.go('/');
			return;
		}

		StandingOrders.find({
			restCode: Rcode,
			tablenum: TabNum,
		}).forEach(
			function(doc) {
				ConfirmedOrders.insert({
					menuitem: doc.menuitem,
					cost: (doc.itemprice * doc.qty),
					qty: doc.qty,
					restCode: doc.restCode,
					tablenum: doc.tablenum,
					createdAt: Date.now(),
					orderstatus: "(preparing)",
				});
			}
		);

		Meteor.call('clearTableStandingOrders', {
			Rcode: Rcode,
			tabnum: TabNum,
		}, (err, res) => {
			if (err) {
				alert(arr);
			} else {
				console.log("xuccess");
			}
		});
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
