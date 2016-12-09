import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './homeLayout.html';
import '../styles/homeLayout.css';
import { slick } from 'meteor/udondan:slick';

if (Meteor.isClient) {
  Template.carousel.rendered = function() {
    $('#carousel').slick({
      dots: true,
      arrows: true
    });
  };
  // Template.homeLayout.events({
  //   'click #signUp'(){
  //     FlowRouter.go('register');
  //   },
  //   'click #signIn'(){
  //     FlowRouter.go('login');
  //   }
  // });
}
