import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './homeLayout.html';
import '../styles/clouds.css';
import { slick } from 'meteor/udondan:slick';

if (Meteor.isClient) {
  Template.carousel.rendered = function() {
    $('#carousel').slick({
      dots: true,
      arrows: true
    });
  };
}
