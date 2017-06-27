Template.menuPage.helpers({
	'menulist' : function() {
		return MenuList.find();
	},

	'selectedMenuItem': function() {
		const menuItemId = this._id;
		const selectedMenuItemId = Session.get('sMII');
		if (menuItemId == selectedMenuItemId) {
			return "selected";
		}
	},

	'selectedOrderItem': function() {
		const orderItemId = this._id;
		const selectedOrderItemId = Session.get('sOII');
		if (orderItemId == selectedOrderItemId) {
			return "selected";
		}
	},

	'standingorders' : function() {
		return StandingOrders.find({});
	},

});

Template.menuPage.events({
	'click .menuitm': function() {
		const menuItemId = this._id;
		Session.set('sMII', menuItemId);
		StandingOrders.insert({
			menuitem: this.menuitem
		});
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
		//
	},
});
