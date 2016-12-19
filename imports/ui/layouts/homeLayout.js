import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { slick } from 'meteor/udondan:slick';
import './homeLayout.html';
import './homeLayout.css';


if (Meteor.isClient) {
  Template.carousel.rendered = function() {
    $('#carousel').slick({
      dots: true,
      arrows: true
    });
  };
  Template.homeLayout.events({
    'click #signUp'(){
      FlowRouter.go('register');
    },
    'click #signIn'(){
      FlowRouter.go('login');
    }
  });
}

Template.homeLayout.onRendered(function() {
  var routeName = FlowRouter.getRouteName();
  if (routeName === 'home')
    $('body').addClass('home-body');
});

Template.homeLayout.onDestroyed(function() {
  $('body').removeClass('home-body');
});
