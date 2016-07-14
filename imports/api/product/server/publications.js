import { Meteor } from 'meteor/meteor'

import { Products } from '../product.js'

Meteor.publish('products', function productsPublication() {
	if(! this.userId) {
		throw new Meteor.Error("Not Authorized")
	}
	return Products.find({ownerId: this.userId})
})

Meteor.publish('productsbatchno', function productsBatchno(batchno) {
	if(!this.userId) {
		throw new Meteor.Error("Not Authorized")
	}
	return Products.find({ownerId: this.userId, batchno: batchno})
})

Meteor.publish('productscategory', function productsCategory(catId) {
	if(!this.userId) {
		throw new Meteor.Error("Not Authorized")
	}
	return Products.find({ownerId: this.userId, categoryid: catId})
})