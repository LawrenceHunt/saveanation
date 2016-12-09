import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// IMPORTING VIEWS (JS FILES)
import '../../ui/layouts/mainLayout.js';
import '../../ui/layouts/homeLayout.js';

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
