import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// IMPORTING VIEWS (JS FILES)
import '../../ui/layouts/mainLayout.js';
import '../../ui/layouts/homeLayout.js';

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
    // BlazeLayout.render("mainLayout", {content: "Homepage" });
    BlazeLayout.render("homeLayout");
  }
});

FlowRouter.route('/save', {
  name: 'save',
  action() {
    BlazeLayout.render("mainLayout", {content: 'Save'});
  }
});

FlowRouter.route('/feed', {
  name: 'feed',
  action() {
    BlazeLayout.render("mainLayout", {content: "feed"});
  }
});

FlowRouter.route('/target', {
  name: 'target',
  action() {
    BlazeLayout.render("mainLayout", {content: 'Target'});
  }
});

FlowRouter.route('/edit-target', {
  name: 'edit-target',
  action() {
    BlazeLayout.render("mainLayout", {content: 'EditTarget'});
  }
});

FlowRouter.route('/login', {
   name: 'login',
   action() {
   BlazeLayout.render("mainLayout", {content: 'Login'});
  }
});

FlowRouter.route('/register', {
  name: 'register',
  action() {
    BlazeLayout.render('mainLayout', {content: 'Register'});
  }
});

FlowRouter.route('/profile', {
  name: 'profile',
  action() {
    BlazeLayout.render('mainLayout', {content: 'Profile'});
  }
});
