Router.configure({
	layoutTemplate: 'layout',
	waitOn: function() { return Meteor.subscribe('menulist'); },
	waitOn: function() { return Meteor.subscribe('standingorders'); },
	waitOn: function() { return Meteor.subscribe('confirmedorders'); },
	waitOn: function() { return Meteor.subscribe('omuirtv'); },
});

Router.route('/', {name: 'tableLogin'});
Router.route('/menu', {name: 'menuPage'});
Router.route('/admin', {name: 'adminPage'});
Router.route('/tables', {name: 'tablesList'});
Router.route('/orders', {name: 'masterOrdersList'});

//waitOn: function() { return Meteor.subscribe('menulist'); },
//waitOn: function() { return Meteor.subscribe('orders'); }
