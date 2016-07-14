import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import { Products } from '../../api/product/product.js'
import { Categories } from '../../api/category/category.js'
import ProductApp from '../components/Products.jsx'


export default createContainer(() => {
	Meteor.subscribe('products')
	Meteor.subscribe('categories')
	
	return {
		authInProcess: Meteor.loggingIn(),
		canShow: !!Meteor.user(),
		products: Products.find({}, {sort: {createdAt: -1}}).fetch(),
		categories:Categories.find({}, {sort: {name :1}}).fetch()
		
	};
}, ProductApp)