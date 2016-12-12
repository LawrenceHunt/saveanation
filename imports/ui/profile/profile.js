import { Template } from 'meteor/templating';
import { Users } from '../../api/profiles/profiles.js'

import './profile.html';

Template.Profile.onCreated(function userOnCreated(){
  Meteor.subscribe('users');
});

Template.Profile.helpers({
  userName() {
    return Meteor.user().username;
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
    return currentUser.profile.lastName;;
  },
  emailAddress() {
    return Meteor.user().email;
  },
  avatar() {
    return Meteor.user().profile.avatar;
  }
});

Template.EditProfile.helpers({
  userName() {
    return Meteor.user().username;
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
    Meteor.call('profiles.edit', updateUsername, updateFirstName, updateLastName);
    FlowRouter.go('profile');
  }
});

Template.AddProfile.events({
  'submit .add-profile'(event) {
    event.preventDefault();
    const profile = event.target;
    const firstName = profile.firstName.value;
    const lastName = profile.lastName.value;
    Meteor.call('profiles.add', firstName, lastName);
    FlowRouter.go('profile');
  }
});
