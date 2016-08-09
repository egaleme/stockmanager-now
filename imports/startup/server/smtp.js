import { Meteor } from 'meteor/meteor'

Meteor.startup(function() {

	process.env.MAIL_URL = "smtp://stockdiaryapp%40gmail.com:200owina07@smtp.gmail.com:587";	

})
