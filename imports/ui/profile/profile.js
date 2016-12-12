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

// Gravatar helper
Template.registerHelper( 'avatar', function( avatarSize, user ) {
  if ( user && user.md5hash ) {
    var md5hash = user.md5hash;
  } else if ( this.md5hash ) {
    var md5hash = this.md5hash;
  }

  md5hash = md5hash || "3eda6fcd3204ef285fa52176c28c4d3e"; // Equivalent to Gravatar.hash( 'none@none.com' );
  return Gravatar.imageUrl( md5hash, { secure: true, size: avatarSize, d: 'mm', rating: 'pg' } );
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
