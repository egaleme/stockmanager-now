import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
//import {attachSchema } from 'meteor/aldeed:collection2'

class CategoriesCollection  extends Mongo.Collection {
	insert(doc, callback) {
		const ourDoc = doc
		if (!ourDoc.name) {
			throw new Meteor.Error("Name can't be empty")
		}
	return super.insert(ourDoc, callback)
	}
	
}

export const Categories = new CategoriesCollection('Categories')

Categories.deny({
	insert() {return true},
	remove() { return true},
	update() {return true},
})

Categories.schema = new SimpleSchema({
	name: {
		type: String,

	}
})

Categories.attachSchema(Categories.schema)


Meteor.methods({
	'categoryinsert'(name) {
		if (Meteor.user().username !== 'admin') {
			throw new Meteor.Error('not authorized')
		}
		category = {}
		category.name = name
		Categories.insert(category)
	},

	'categoryupdate'(cat) {
		if (Meteor.user().username !== 'admin') {
			throw new Meteor.Error('not authorized')
		}

		Categories.update({_id: cat.id}, {$set: {name: cat.name}})
	},

	'categoryremove'(catId) {
		if (Meteor.user().username !== 'admin') {
			throw new Meteor.Error('not authorized')
		}
		Categories.remove({_id: catId})
	}
})
