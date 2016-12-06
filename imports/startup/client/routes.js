import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import '../../ui/layouts/body.js';


FlowRouter.route('/', {
  name: 'home',
  action() {
  //   if(Meteor.userId()){
  //     FlowRouter.go('recipe-book')
  //   }
    BlazeLayout.render('App_body', { main: 'Homepage' });
  }
});
