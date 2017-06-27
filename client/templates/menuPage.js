Template.menuPage.helpers({
	menulist: function() {
		return MenuList.find();
	},
	standingorders: function() {
		return StandingOrders.find({});
	}
});

Template.menuPage.events({
	'click .menuitm': function(){
		StandingOrders.insert({
			menuitem: this.menuitem
		});
	}
});
