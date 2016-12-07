Template.feed.onCreated(function feedOnCreated() {
  Meteor.subscribe('posts');
});

Template.feed.helpers({
  posts: ()=> {
    return Posts.find({}, { sort: { createdAt: -1}});
  }
});
