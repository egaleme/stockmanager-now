import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor'

import { Categories } from '../../api/category/category.js';
import CategoryApp from '../components/CategoryApp.jsx';

export default createContainer(() => {
	const handle = Meteor.subscribe('categories')
	const loading = !handle.ready() 
	return {
		authInProcess: Meteor.loggingIn(),
		canShow: !!Meteor.userId(),
		loading,
		categories: Categories.find({}, {sort: {'name': 1}}).fetch(),
	};
}, CategoryApp);