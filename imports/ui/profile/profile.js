import { Template } from 'meteor/templating';

import './profile.html';


Template.Profile.onCreated(function userOnCreated(){
  Meteor.subscribe('userData');
});

Template.Profile.helpers({
  userAccount() {
    var userId = Meteor.userId();
    console.log("this is the user:" + userId);
    return Meteor.users({createdBy: userId}):
  }
});
