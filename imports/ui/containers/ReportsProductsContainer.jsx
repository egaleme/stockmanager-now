import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import { Products } from '../../api/product/product.js'
import ReportsProducts from '../components/ReportsProducts.jsx'

export default createContainer((props) =>{
	if (props.batchno) {
		Meteor.subscribe('productsbatchno', props.batchno)
	}
	if (props.categoryid) {
		Meteor.subscribe('productscategory', props.categoryid)
	}
	if(!props.batchno && !props.categoryid) {
		Meteor.subscribe('products')
	}
	return {
		products: Products.find({}, {sort: {createdAt: -1}}).fetch(),
	}
}, ReportsProducts)