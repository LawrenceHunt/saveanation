import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import './homeLayout.html';
import './homeLayout.css';
import { slick } from 'meteor/udondan:slick';

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
  // get the current route name (better than checking window.location)
  var routeName = FlowRouter.getRouteName();

  // add the class to body if this is the correct route
  if (routeName === 'home')
    $('body').addClass('home-body');
});

Template.homeLayout.onDestroyed(function() {
  // remove the class to it does not appear on other routes
  $('body').removeClass('home-body');
});
