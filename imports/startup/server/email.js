import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'


Meteor.startup(function() {

Accounts.emailTemplates.siteName = 'Stockdiary-dev';

Accounts.emailTemplates.from = 'aleme gabriel <Stockdiaryapp@gmail.com>';

Accounts.emailTemplates.verifyEmail.subject = function(user) {
	return 'Confirm Your Email Address, ' + user.username;
}

Accounts.emailTemplates.verifyEmail.text = function(user,url) {
	return 'Welcome to the Stockdiary-dev App '
	+ 'To verify your email address go ahead and follow the link : ' + url;
}

Accounts.emailTemplates.verifyEmail.html = function(user, url) {
	return '<h1> Welcome to the Stockdiary-dev App </h1>'
	+ '<p> To <strong> verify your email address </strong> go ahead and follow the link below: </p>'
	+ url;
}
	
});

Accounts.onCreateUser(function (options, user) {
	if (options){
		user.profile = options.profile;
	}  	

	Meteor.setTimeout(function () {
		Accounts.sendVerificationEmail(user._id);
		
	}, 2000);
	return user;
});



