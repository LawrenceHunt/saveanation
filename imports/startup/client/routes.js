import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// IMPORTING VIEWS (JS FILES)
import '../../ui/layouts/mainLayout.js';



FlowRouter.route('/', {
  name: 'home',
  action() {
  //   if(Meteor.userId()){
  //     FlowRouter.go('recipe-book')
  //   }
    BlazeLayout.render("mainLayout", {content: 'Homepage' });
  }
});

FlowRouter.route('/save', {
  name: 'save',
  action() {
    BlazeLayout.render("mainLayout", {content: 'Deposit'});
  }
})
