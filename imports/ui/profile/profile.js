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
    var email = currentUser[0].email;
    return email;
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
