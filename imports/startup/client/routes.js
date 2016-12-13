import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// IMPORTING VIEWS (JS FILES)
import '../../ui/layouts/mainLayout.js';
import '../../ui/layouts/homeLayout.js';
import '../../ui/layouts/accountLayout.js';


if(Meteor.isClient) {// checking for the log in and log out. Taken care of by the gwendall:auth-client-callbacks package
 Accounts.onLogin(function() {
   //this is going to get called when the user is logged in
   FlowRouter.go('feed');
 });

 Accounts.onLogout(function() {
   //this is going to get called when the user is logged out
   FlowRouter.go('home');
 });

}

FlowRouter.route('/', {
  name: 'home',
  action() {
    if(Meteor.userId()){
      FlowRouter.go('feed');
    }
    BlazeLayout.render("homeLayout");
  }
});

FlowRouter.route('/save', {
  name: 'save',
  action() {
    if(!Meteor.userId()) {
      FlowRouter.go('home');
    }
    BlazeLayout.render("mainLayout", {content: 'Save'});
  }
});

FlowRouter.route('/feed', {
  name: 'feed',
  action() {
    if(!Meteor.userId()) {
      FlowRouter.go('home');
    }
    BlazeLayout.render("mainLayout", {content: "feed"});
  }
});

FlowRouter.route('/target', {
  name: 'target',
  action() {
    if(!Meteor.userId()) {
      FlowRouter.go('home');
    }
    BlazeLayout.render("mainLayout", {content: 'Target'});
  }
});

FlowRouter.route('/edit-target', {
  name: 'edit-target',
  action() {
    if(!Meteor.userId()) {
      FlowRouter.go('home');
    }
    BlazeLayout.render("mainLayout", {content: 'EditTarget'});
  }
});

FlowRouter.route('/team', {
  name: 'team',
  action() {
    if(!Meteor.userId()) {
      FlowRouter.go('home');
    }
    BlazeLayout.render("mainLayout", {content: "Team"});
  }
});

FlowRouter.route('/login', {
   name: 'login',
   action() {
     if(Meteor.userId()) {
       FlowRouter.go('feed');
     }
   BlazeLayout.render("accountLayout", {content: 'Login'});
  }
});

FlowRouter.route('/register', {
  name: 'register',
  action() {
    if(Meteor.userId()) {
      FlowRouter.go('feed');
    }
    BlazeLayout.render('accountLayout', {content: 'Login'});
  }
});

FlowRouter.route('/profile', {  // /:_id
  name: 'profile',
  action() {
    if(!Meteor.userId()) {
      FlowRouter.go('home');
    }
    BlazeLayout.render('mainLayout', {content: 'Profile'});
  }
});

FlowRouter.route('/addprofile', {  // /:_id
  name: 'addprofile',
  action() {
    BlazeLayout.render('mainLayout', {content: 'AddProfile'});
  }
});

FlowRouter.route('/edit-profile', {  // /:_id
  name: 'edit-profile',
  action() {
    if(!Meteor.userId()) {
      FlowRouter.go('home');
    }
    BlazeLayout.render('mainLayout', {content: 'EditProfile'});
  }
});

FlowRouter.route('/tower', {
  name: 'tower',
  action() {
    BlazeLayout.render('mainLayout', {content: 'Tower'});
  }
});
