import { Template } from 'meteor/templating';
import { Posts } from '../../api/posts/posts.js';
import { Users } from '../../api/profiles/profiles.js';
import { moment } from 'meteor/momentjs:moment';

import './feed.html';

Template.feed.onCreated(function feedOnCreated() {
  Meteor.subscribe('posts');
  Meteor.subscribe('users');
});

Template.feed.helpers({
  posts() {
    return Posts.find({}, { sort: { createdAt: -1}});
  },
  formatDate(date) {
    return moment(date).format('h:mma on DD-MMM-YY');
  },
  author_name(author_id){
      var singleUser = Users.findOne({"_id": author_id});
      var name = "Unknown";
      if(singleUser){
        name = singleUser.profile.username;
      }
      return name;
  },
  avatar(author_id) {
    var singleUser = Users.findOne({"_id": author_id});
    var avatar = 0;
    if(singleUser){
      avatar = singleUser.profile.avatar;
    }
    return avatar;
  }
});

Template.feed.events({
  'submit .add-post'(event) {
    event.preventDefault();
    const target = event.target;
    const text = target.body.value;
    Meteor.call('post.add', text);

    // Clear form
    target.body.value = '';
  },
});
