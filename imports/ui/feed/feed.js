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
    return Posts.find({}, { sort: { createdAt: -1}});
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
