import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

import Header from '../components/Header'

export default createContainer(() => {
	return {
		user: Meteor.user()
	};
}, Header)