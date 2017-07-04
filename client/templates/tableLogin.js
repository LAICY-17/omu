Template.tableLogin.events({
	'submit form': function(event) {
		event.preventDefault();
		const tableLoginID = event.target.tableLoginID.value;
		const tableCheckNo = tableLoginID % 10000;
		const tableNo = parseInt(tableLoginID / 10000);
		console.log(tableCheckNo);
		console.log(tableNo);
		if (tableCheckNo!=1234) {
			document.getElementById("loginErrorMsg").innerHTML = "Incorrect Table ID, please check your table to see if you have keyed in the correct Table ID."
		} else {
			document.getElementById("loginErrorMsg").innerHTML = "generic success message"
		}
	}
});
