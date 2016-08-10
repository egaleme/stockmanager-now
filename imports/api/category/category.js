import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'


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

	},
	ownerId: {
		type: String,
		defaultValue: '',
	},
})

Categories.attachSchema(Categories.schema)


Meteor.methods({
	'categoryinsert'(name) {
		if (!this.userId) {
			throw new Meteor.Error('not authorized')
		}
		category = {}
		category.name = name
		category.ownerId = this.userId
		Categories.insert(category)
	},

	'categoryupdate'(cat) {
		if (!this.userId) {
			throw new Meteor.Error('not authorized')
		}

		Categories.update({_id: cat.id, ownerId: Meteor.userId()}, {$set: {name: cat.name}})
	},

	'categoryremove'(catId) {
		if (!this.userId) {
			throw new Meteor.Error('not authorized')
		}
		Categories.remove({_id: catId, ownerId: Meteor.userId()})
	}
})
