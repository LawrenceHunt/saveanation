Template.feed.helpers({
  posts: ()=> {
    return Posts.find({}, { sort: { createdAt: -1}});
  }
});
