import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import { Categories } from '../../api/category/category.js'
import Reports from '../components/Reports.jsx'

export default createContainer(()=> {
	Meteor.subscribe('categories')
	let authInProcess = Meteor.loggingIn()
	let canShow = !!Meteor.userId()
	return {
		authInProcess,
		canShow,
		categories: Categories.find({}, {sort: {'name': 1}}).fetch(),
	};
}, Reports)