Template.menuPage.helpers({
	menulist: function() {
		return MenuList.find();
	},
	//'click .menuitm': function(event){
		//console.log("You clicked a .player element");
		////var y = JSON.parse(x);
		////var target = event.menuitem;
		//var z = this.menuitem;
		//StandingOrders.insert({
			//menuitem: z
		//});
	//}
});

Template.menuPage.events({
	'click .menuitm': function(){
		StandingOrders.insert({
			menuitem: this.menuitem
		});
	}
});

Template.menuPage.standingorders = function() {
	return StandingOrders.find({});
}