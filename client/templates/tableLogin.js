Template.tableLogin.helpers({
	'currentMeteorUserId' : function() {
		return Meteor.userId();
	},
});

Template.tableLogin.events({
	'submit form': function(event) {
		event.preventDefault();
		const tableLoginID = event.target.tableLoginID.value;
		const parsedTLID = tableLoginID.split('-');
		const Rcode = parsedTLID[0].toString();
		Session.set('CurrentResto', Rcode);
		const TableNum = parseInt(parsedTLID[1]);
		Session.set('CurrentTable', TableNum);
		const Vcode = parseInt(parsedTLID[2]);
		console.log(Rcode);
		console.log(TableNum);
		console.log(Vcode);
		const VcodeCursor = OmuIRTV.findOne({
			rcode: Rcode,
			tablenum: TableNum,
		});
		if (VcodeCursor != undefined && Vcode == VcodeCursor.vcode) {
			Router.go('/menu');
		} else {
			document.getElementById("loginErrorMsg").innerHTML = "Incorrect Table ID, please check your table to see if you have keyed in the correct Table ID."
		}
	}
});