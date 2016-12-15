import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Users } from '../profiles/profiles.js';
import messages from './encouragement.js';
export const Posts = new Mongo.Collection('posts');

PostSchema = new SimpleSchema({
  body: {
    type: String,
  },
  author: {
    type: String,
  },
  author_id: {
    type: String
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    },
  },
  encouragement: {
    type: String,
    optional: true
  }
});

Posts.attachSchema( PostSchema );

Meteor.methods({
  'post.add'(text, encouragement = "") {
    check(text, String);
    // Checks user is logged in
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    let currentUserId = this.userId;
    let currentUser = Meteor.users.findOne(currentUserId).profile.username;
    
    // Create the post object
    Posts.insert({
      body: text,
      encouragement: encouragement,
      author: currentUser,
      author_id: currentUserId
    });
  }
});

if (Meteor.isServer) {
  Meteor.publish('posts', function() {
      return Posts.find({}, { sort: { createdAt: -1}});
  });
}

Meteor.myFunctions = {
  encouragement: function() {
    let json = messages;
    let encouragement = json.trumpBits;
    return encouragement[Math.floor ( Math.random() * encouragement.length )];
  }
};
