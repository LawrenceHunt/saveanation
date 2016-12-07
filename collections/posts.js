Posts = new Mongo.Collection('posts');

PostSchema = new SimpleSchema({
  body: {
    type: String,
    autoform: {
      label: false,
      placeholder: "what have you saved today?",
      id: "body"
    }
  },
  // author: {
  //   type: String,
  //   autoValue: function() {
  //     return this.userId;
  //   },
  //   autoform: {
  //     type: "hidden"
  //   }
  // },
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
    Posts.insert({ body: doc.body, createdAt: doc.createdAt });
  }
});

if (Meteor.isServer) {
  Meteor.publish('posts', function() {
    return Posts.find({}, { sort: { createdAt: -1}});
  });
}


















//
