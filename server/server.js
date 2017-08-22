import { Accounts } from 'meteor/accounts-base'

Meteor.startup(function() {
	smtp = {
	    username: 'omu4orbital@gmail.com',   // eg: server@gentlenode.com
	    password: 'password95',   // eg: 3eeP1gtizk5eziohfervU
	    server:   'smtp.gmail.com',  // eg: mail.gandi.net
	    port: 587
  	}
	process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
	return Meteor.methods({
		clearStandingOrders: function() {
			return StandingOrders.remove({});
		},

		clearConfirmedOrders: function() {
			return ConfirmedOrders.remove({});
		},
	});
})

Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false});
Accounts.validateLoginAttempt(function(options) {
    /* options:
        type            (String)    The service name, such as "password" or "twitter".
        allowed         (Boolean)   Whether this login is allowed and will be successful.
        error           (Error)     When allowed is false, the exception describing why the login failed.
        user            (Object)    When it is known which user was attempting to login, the Meteor user object.
        connection      (Object)    The connection object the request came in on.
        methodName      (String)    The name of the Meteor method being used to login.
        methodArguments (Array)     An array of the arguments passed to the login method
    */

    // If the login has failed, just return false.
    if (!options.allowed) {
        return false;
    }

    // Check the user's email is verified. If users may have multiple 
    // email addresses (or no email address) you'd need to do something
    // more complex.
    if (options.user.emails[0].verified === true) {
        return true;
    } else {
        throw new Meteor.Error('email-not-verified', 'You must verify your email address before you can log in');
    }

});