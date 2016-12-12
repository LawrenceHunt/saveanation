import { Template } from 'meteor/templating';
import { Posts } from '../../api/posts/posts.js';
import { Users } from '../../api/profiles/profiles.js'
import { moment } from 'meteor/momentjs:moment';

import './feed.html';
import './feed.css';

Template.feed.onCreated(function feedOnCreated() {
  Meteor.subscribe('posts');
});

Template.feed.helpers({
  posts() {
    var user = Meteor.user();
    // change {author: "Swinston"} to find from author's of own team
    return Posts.find( { $or: [{author: user.username}, {author: "Swinston"}] }, { sort: { createdAt: -1}});
  },
  formatDate(date) {
    return moment(date).format('h:mma on DD-MMM-YY');
  },
  avatar(author) {
    var singleUser = Users.findOne({"profile.username": author});
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
