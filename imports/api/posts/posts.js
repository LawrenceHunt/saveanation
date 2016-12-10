import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

PostSchema = new SimpleSchema({
  body: {
    type: String,
  },
  author: {
    type: String,
    // autoValue: function() {
    //   return Meteor.user().username;
    // },
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    },
  }
});

Posts.attachSchema( PostSchema );

Meteor.methods({
  'post.add'(text) {
    check(text, String);
    // Checks user is logged in
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    var currentUser = Meteor.user().username;
    // Create the post object
    Posts.insert({
      body: text,
      author: currentUser
    });
  }
});

if (Meteor.isServer) {
  Meteor.publish('posts', function() {
      return Posts.find({}, { sort: { createdAt: -1}});
  });
}
