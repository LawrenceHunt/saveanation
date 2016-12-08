import { Template } from 'meteor/templating';
import { Posts } from '../../api/posts/posts.js';
import { moment } from 'meteor/momentjs:moment';

import './feed.html';

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
});
