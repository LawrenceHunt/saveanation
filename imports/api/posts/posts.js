import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

PostSchema = new SimpleSchema({
  body: {
    type: String,
    autoform: {
      label: false,
      placeholder: "what have you saved today?",
      id: "body"
    }
  },
  author: {
    type: String,
    autoValue: function() {
      return Meteor.user().username;
    },
    autoform: {
      type: "hidden"
    }
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    },
    autoform: {
      type: "hidden"
    }
  }
});

Posts.attachSchema( PostSchema );

Meteor.methods({
  "posts.insert": function(doc) {
    Posts.insert({ body: doc.body, createdAt: doc.createdAt, author: doc.author });
  }
});

if (Meteor.isServer) {
  Meteor.publish('posts', function() {
      return Posts.find({}, { sort: { createdAt: -1}});
  });
}
