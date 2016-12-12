import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Blocks } from '../../api/tower/tower.js';

import './tower.css';
import './tower.html';
//
// if (Meteor.isClient) {
//   Template.Tower.helpers({
//     game (){
//
//     }
//   });
// }

// when user first connects
Template.Tower.onCreated(function(){

});

// when the template is added to the DOM
Template.Tower.onCreated(function() {
  // let gamecanvas = this.find('#gamecanvas');
  // let ctx = gamecanvas.getContext("2d");
  // let x = canvas.width/2;
  // let y = canvas.height-30;
  //
  // function drawTowerCanvas(){
  //   ctx.beginPath();
  //   ctx.rect(4, 4, 100, 100);
  //   ctx.fillStyle = "#fff";
  //   ctx.fill();
  //   ctx.closePath();
  // }
  //
  // function drawItemsMenu(){
  //
  // }
  //
  // drawTowerCanvas();
});
