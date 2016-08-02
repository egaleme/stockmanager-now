import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

const UserRegistered = ({user}) => {
	if(user) {
	return(	
	<div>
	<p>Thank You For Signing Up. Please Click The Link Sent To Your Email To Verify Your Account. Thank You.</p>
	</div>
	)
}
return <div><p>Please <a href="/register">SignUp</a> to view this page</p></div>
	}

export default createContainer(() =>{
	return {
		user: Meteor.user()
	}
}, UserRegistered)