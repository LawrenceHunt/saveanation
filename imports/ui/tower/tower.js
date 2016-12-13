import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Blocks } from '../../api/tower/tower.js';
import { jQuery } from 'meteor/jquery';
import { $ } from 'meteor/jquery';
import { Raphael } from 'meteor/agnito:raphael';
import {jQueryUI} from 'meteor/mizzao:jquery-ui';

import './tower.css';
import './tower.html';



// // RAPHAEL METHODS
// Template.Tower.onRendered(function(){
//   // var paper = Raphael("canvas", "100%", "100%");
//   // createBlock();
//   // createTetromino();
// });
//
//
// var createBlock = function(paper) {
//   var circle = paper.circle("50%", "50%", 40);
// };
//
// var createTetromino = function(paper) {
//   var tetronimo = paper.path("M 250 250 l 0 -50 l -50 0 l 0 -50 l -50 0 l 0 50 l -50 0 l 0 50 z");
//    tetronimo.attr({fill: '#9cf', stroke: '#ddd', 'stroke-width': 5});
// };
//
// Template.Tower.events({
//   'click #brick-item': function(event){
//     var paper = Raphael("canvas", "100%", "100%");
//     createBoth(paper);
//   }
// });
//
// function createBoth(paper){
//   createTetromino(paper); createBlock(paper);
// }
//

// IMAGE ASSET METHODS
Template.Tower.onRendered(function(){

});
// General generate element method
function createSprite(src, className) {
  var canvas = document.getElementById('game-canvas');
  var element = document.createElement('img');
  canvas.appendChild(element);
  element.src=src;
  element.className = className;
  $(function() {
      $( '.kitchen').draggable();
      $('.living-room').draggable();
  });
}

Template.Tower.events({
  // Generate Kitchen elements
  'click #kitchen-generate': function(event){
    createSprite('game/kitchen/kitchen-empty.png', 'kitchen');
  },
  // 'click #kitchen-chair-1-generate': function(event){
  //   createSprite('kitchen-chair-1-generate', 'kitchen-chair-1');
  // },
  // 'click #kitchen-coffee-generate': function(event){
  //   createSprite('game/kitchen/kitchen-coffee-maker.png', 'kitchen-coffee');
  // },
  // 'click #kitchen-coffee-generate': function(event){
  //   createSprite('game/kitchen/kitchen-coffee-maker.png', 'kitchen-coffee');
  // },
  // Generate Living Room elements
  'click #living-room-generate': function(event){
    createSprite('game/livingRoom/living-room-empty.png', 'living-room');
  },
// Generate Bedroom elements
  'click #bedroom-generate': function(event){
    createSprite('game/bedRoom1/bedroom-empty.png', 'living-room');
  },
  // 'click #bedroom-generate': function(event){
  //   createSprite('game/bedRoom1/bedroom-empty.png', 'living-room');
  // },
  // 'click #bedroom-generate': function(event){
  //   createSprite('game/bedRoom1/bedroom-empty.png', 'living-room');
  // },

});
