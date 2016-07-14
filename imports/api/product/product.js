import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
 
export const Products = new Mongo.Collection('products');

Products.deny({
	insert() {return true},
	remove() { return true},
	update() {return true},
})

ProductsSchema = new SimpleSchema({
	name: {
		type: String, 
		
		max: 100
	},
	price: {
		type: Number,
		decimal: true
		
	},
	qty: {
		type: Number
		
	},
	batchno: {
		type: String
		
	},
	expiringdate: {
		type: String,
		optional: true
		
	},
	
	categoryid: {
		type: String
		
	},
	ownerId: {
		type: String,
		defaultValue: '',
	},
	createdAt : {
		type: Date,
		denyUpdate: true,
	},
	storename: {
		type: String,
		defaultValue: '',
	},
})

Products.attachSchema(ProductsSchema)

Meteor.methods({
	'stockinsert'(product) {

	  if (! this.userId) {
      throw new Meteor.Error('not authorized');
   	 }
   	 	product.ownerId = this.userId
   	 	product.createdAt = new Date()
   	 	product.storename = Meteor.users.findOne(this.userId).username
   	 	
   		Products.insert(product)
	},

	'stockupdate'(product) {
		if (!this.userId) {
			throw new Meteor.Error('not authorized');
		}
		   	 	
   	 	Products.update({_id: product.id, ownerId: Meteor.userId()}, {$set: {name: product.name, price: product.price, qty: product.qty, batchno: product.batchno, expiringdate: product.expiringdate, categoryid: product.categoryid}})
	},

	'stockremove'(productId) {
		if (!this.userId) {
			throw new Meteor.Error('not authorized')
		}

		Products.remove({_id: productId, ownerId: Meteor.userId()})
	}
})

