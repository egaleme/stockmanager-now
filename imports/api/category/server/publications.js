import { Meteor } from 'meteor/meteor'

import { Categories } from '../category'

Meteor.publish('categories', function categoriesPublication() {
	if(!this.userId) {
		throw new Meteor.Error('not allowed')
	}
	return Categories.find({ownerId: this.userId})
})

