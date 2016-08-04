import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

import Header from '../components/Header'

const getUserIdentity = (user) => user

export default createContainer(() => {
	Meteor.subscribe('user')
	return {
		user:getUserIdentity(Meteor.user())
	};
}, Header)