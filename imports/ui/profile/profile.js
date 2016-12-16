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
    const currentUser = Meteor.user();
    return currentUser.emails[0].address;
  },
  avatar() {
    const currentUser = Meteor.user();
    return currentUser.profile.avatar;
  }
});

Template.Profile.events({
  'click #edit-profile'(event) {
    event.preventDefault();
    BlazeLayout.render("mainLayout", {content: 'EditProfile'});
  },
  'submit .edit-profile'(event) {
    event.preventDefault();
    const profile = event.target;
    const updateUsername = profile.userName.value;
    const updateFirstName = profile.firstName.value;
    const updateLastName = profile.lastName.value;
    Meteor.call('profiles.edit', updateUsername, updateFirstName, updateLastName);
    Session.set('editMode', !Session.get('editMode'));
  },
  'click .fa-edit'(event) {
    event.preventDefault();
    Session.set('editMode', !Session.get('editMode'));
  }
});
