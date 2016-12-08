import { Template } from 'meteor/templating';
import { Posts } from '../../api/posts/posts.js';

import './feed.html';

Template.feed.onCreated(function feedOnCreated() {
  Meteor.subscribe('posts');
});

Template.feed.helpers({
  posts() {
    return Posts.find({}, { sort: { createdAt: -1}});
  }
});
