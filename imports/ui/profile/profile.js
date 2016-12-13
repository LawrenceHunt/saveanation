import { Template } from 'meteor/templating';
import { Users } from '../../api/profiles/profiles.js';

import './profile.html';

Template.Profile.onCreated(function userOnCreated(){
  Meteor.subscribe('users');
});

Template.Profile.helpers({
  userName() {
    return Meteor.user().profile.username;
  },
  fullName() {
    const currentUser = Meteor.user();
    var firstName = currentUser.profile.firstName;
    var lastName = currentUser.profile.lastName;
    return firstName + " " + lastName;
  },
  firstName() {
    const currentUser = Meteor.user();
    return currentUser.profile.firstName;
  },
  lastName() {
    const currentUser = Meteor.user();
    return currentUser.profile.lastName;
  },
  emailAddress() {
    return Users.email;
  },
  avatar() {
    return Meteor.user().profile.avatar;
  }
});

Template.EditProfile.helpers({
  userName() {
    return Meteor.user().profile.username;
  },
  firstName() {
    const currentUser = Meteor.user();
    return currentUser.profile.firstName;
  },
  lastName() {
    const currentUser = Meteor.user();
    return currentUser.profile.lastName;;
  }
});

Template.EditProfile.events({
  'submit .edit-profile'(event) {
    event.preventDefault();
    const profile = event.target;
    const updateUsername = profile.userName.value;
    const updateFirstName = profile.firstName.value;
    const updateLastName = profile.lastName.value;
    const updateAvatar = profile.avatar.value;
    Meteor.call('profiles.edit', updateUsername, updateFirstName, updateLastName, updateAvatar);
    FlowRouter.go('profile');
  }
});
