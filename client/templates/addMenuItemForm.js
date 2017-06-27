Template.addMenuItemForm.events({
	'submit form': function(event) {
		event.preventDefault(); //prevents page from auto-refreshing when form is submitted
		const menuItemName = event.target.menuItemName.value;
		//^ pull the value (i.e. the string) from the html item with name="menuItemName" and assign it to the const menuItemName
		MenuList.insert({
			menuitem: menuItemName
		});
		event.target.menuItemName.value=""; //clear the form after submission
	}
});
