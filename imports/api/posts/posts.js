import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import encouragement from './encouragement.js';
export const Posts = new Mongo.Collection('posts');

PostSchema = new SimpleSchema({
  body: {
    type: String,
  },
  author: {
    type: String,
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    },
  },
  trumpBits: {
    type: String,
    optional: true
  }
});

Posts.attachSchema( PostSchema );

Meteor.methods({
  'post.add'(text, trumpBits = "") {
    check(text, String);
    // Checks user is logged in
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    var currentUser = Meteor.user().profile.username;
    // Create the post object
    Posts.insert({
      body: text,
      trumpBits: trumpBits,
      author: currentUser
    });
  }
});

if (Meteor.isServer) {
  Meteor.publish('posts', function() {
      return Posts.find({}, { sort: { createdAt: -1}});
  });
}

Meteor.myFunctions = {
  trumpBits: function() {
    let json = encouragement;
    let trumpBits = json.trumpBits;
    return trumpBits[Math.floor ( Math.random() * trumpBits.length )];
  }
};
