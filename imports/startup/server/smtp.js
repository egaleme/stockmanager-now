import { Meteor } from 'meteor/meteor'

let smtpSettings;
Meteor.startup(function() {
	smtpSettings = {
		username: 'stockdiaryapp',
		password: '200owina07',
		server: 'smtp.gmail.com',
		port: 587
	};
/*
	process.env.MAIL_URL = 'smtp://smtpSettings.username%40gmail.com:smtpSettings.password@smtpSettings.server:smtpSettings.port';
			
*/
})
