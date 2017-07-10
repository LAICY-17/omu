Router.configure({
 layoutTemplate: 'layout',
});

Router.route('/', {name: 'tableLogin'});
Router.route('/menu', {name: 'menuPage'});
Router.route('/admin', {name: 'adminPage'});
Router.route('/signup', {name: 'restaurantSignUp'});
Router.route('/login', {name: 'restaurantLogin'});

//waitOn: function() { return Meteor.subscribe('menulist'); },
//waitOn: function() { return Meteor.subscribe('orders'); }
