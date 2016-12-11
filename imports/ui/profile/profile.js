import { Template } from 'meteor/templating';
import { Target } from '../../api/targets/targets.js';
import { Teams } from '../../api/teams/teams.js';

// import { UserProfile } from '../../api/profiles/profiles.js';

import './profile.html';


Template.Profile.onCreated(function userOnCreated(){
  Meteor.subscribe('userData');
});

Template.Profile.helpers({
  userAccount() {
    var userId = Meteor.userId();
    return userId;
    console.log("this is the user:" + userId);
    // return Meteor.users({createdBy: userId}):
  },
  userName() {
    var userName = Meteor.user().username;
    return userName;
  },
  fullName() {
    var firstName = Meteor.user().profile.firstName;
    var lastName = Meteor.user().profile.lastName;
    return firstName + " " + lastName;
  },
  // showTarget() {
  //     const instance = Template.instance();
  //     return instance.calculation.get('targetSummary');
  //   }
  emailAddress() {
    var emailAddress = Meteor.user().emails[0].address;
    return emailAddress;
  }
});
