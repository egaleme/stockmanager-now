import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'


Meteor.startup(function() {

Accounts.emailTemplates.siteName = 'Stockdiary App';

Accounts.emailTemplates.from = 'Stockdiary App <Stockdiaryapp@gmail.com>';

Accounts.urls.verifyEmail = (token) => {
	return Meteor.absoluteUrl(`verified/${token}`);
}

Accounts.emailTemplates.verifyEmail.subject = function(user) {
	return 'Confirm Your Email Address, ' + user.username;
}

Accounts.emailTemplates.verifyEmail.text = function(user,url) {
	return 'Welcome to the Stockdiary App '
	+ 'To verify your email address go ahead and follow the link : ' + url;
}

Accounts.emailTemplates.verifyEmail.html = function(user, url) {
	return '<h1> Welcome to the Stockdiary App </h1>'
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



