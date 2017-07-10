Template.layout.events({
	'click #login-buttons-logout': function (event) {
		Router.go('/');
    }
});

Accounts.onLogin(function(){
	Router.go('/admin');
})