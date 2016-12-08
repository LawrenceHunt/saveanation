import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './homepage.html';

Template.Homepage.events({
  'click .savings-button'(event) {
      FlowRouter.go('target');
  }
});
