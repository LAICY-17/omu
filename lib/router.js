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
Router.route('/signup', {name: 'restaurantSignUp'});
Router.route('/login', {name: 'restaurantLogin'});

Router.onBeforeAction(function () {
  // all properties available in the route function
  // are also available here such as this.params

  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('tableLogin');
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.render('adminPage');
    this.next();
  }
});

//waitOn: function() { return Meteor.subscribe('menulist'); },
//waitOn: function() { return Meteor.subscribe('orders'); }
