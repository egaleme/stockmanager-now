import { Meteor } from 'meteor/meteor'

import { Categories } from '../category'

Meteor.publish('categories', () => Categories.find())

