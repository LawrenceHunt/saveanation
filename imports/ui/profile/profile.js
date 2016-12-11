import { Template } from 'meteor/templating';
import { Users } from '../../api/profiles/profiles.js'

import './profile.html';

Template.Profile.onCreated(function userOnCreated(){
  Meteor.subscribe('users');
});

Template.Profile.helpers({
  users() {
    return Users.find({});
  },
  userName() {
    const currentUser = Users.find().fetch();
    return currentUser[0].username;
  },
  fullName() {
    const currentUser = Users.find().fetch();
    var firstName = currentUser[0].profile.firstName;
    var lastName = currentUser[0].profile.lastName;
    return firstName + " " + lastName;
  },
  emailAddress() {
    const currentUser = Users.find().fetch();
    var email = currentUser[0].emails[0].address;
    return email;
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
    // route back to /profile
    FlowRouter.go('profile');


  }
});
