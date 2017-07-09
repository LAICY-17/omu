Template.tableLogin.helpers({
	'currentMeteorUser' : function() {
		return Meteor.userId();
	},
});

Template.tableLogin.events({
	'submit form': function(event) {
		event.preventDefault();
		const tableLoginID = event.target.tableLoginID.value;
		const parsedTLID = tableLoginID.split('-');
		const rcode = parsedTLID[0];
		const tablenum = parsedTLID[1];
		const vcode = parsedTLID[2];
		if (vcode!=1234) {
			document.getElementById("loginErrorMsg").innerHTML = "Incorrect Table ID, please check your table to see if you have keyed in the correct Table ID."
		} else {
			Router.go('/menu');
			//document.getElementById("loginErrorMsg").innerHTML = "generic success message"
		}
	}
});
