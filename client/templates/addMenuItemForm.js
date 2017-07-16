Template.addMenuItemForm.events({
	'submit form': function(event) {
		event.preventDefault(); //prevents page from auto-refreshing when form is submitted
		const menuItemName = event.target.menuItemName.value;
		const doesRcodeExist = OmuIRTV.find(
			{ meteorUserId: Meteor.userId(),
				rcode: { $exists: true } }
		).count();
		if (doesRcodeExist == 0) {
		event.target.menuItemName.value="Add Rcode First!";
		} else {
			const Rcode = OmuIRTV.findOne({
				meteorUserId: Meteor.userId()
			}).rcode;
			MenuList.insert({
				menuitem: menuItemName,
				restCode: Rcode,
			});
			event.target.menuItemName.value=""; //clear the form after submission
		}
	}
});
