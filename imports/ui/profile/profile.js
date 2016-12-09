import { Template } from 'meteor/templating';

import './profile.html';


Template.Profile.onCreated(function userOnCreated(){
  Meteor.subscribe('users');
});

Template.Profile.helpers({
  userAccount() {
    var userId = Meteor.userId();
    return Meteor.user({owner: userId}):
  }
});
