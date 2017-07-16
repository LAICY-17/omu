Template.layout.events({
	'click #login-buttons-logout': function (event) {
		Router.go('/');
    },

    'click .tablelogin': function(event) {
    	event.preventDefault();
    	const userVcode = Session.get('CurrentVcode');
    	const Rcode = Session.get('CurrentResto');
		const TabNum = Session.get('CurrentTable');
		const VcodeCursor = OmuIRTV.find({
			rcode: Rcode,
			tablenum: TabNum,
			vcode: userVcode,
		});

		if(VcodeCursor.count() == 0) {
			Router.go('/');
		} else {
			Router.go('/menu');
		}
    }
});

Accounts.onLogin(function(){
	Router.go('/admin');
})
