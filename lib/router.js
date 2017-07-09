Router.configure({
	layoutTemplate: 'layout',
});

Router.route('/', {name: 'tableLogin'});
Router.route('/menu', {name: 'menuPage'});

//waitOn: function() { return Meteor.subscribe('menulist'); },
//waitOn: function() { return Meteor.subscribe('orders'); }

/*
FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('tableLogin');
	}
});
*/