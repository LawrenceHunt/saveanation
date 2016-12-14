import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Blocks } from '../../api/tower/tower.js';
import { jQuery } from 'meteor/jquery';
import { $ } from 'meteor/jquery';
import { Raphael } from 'meteor/agnito:raphael';
import {jQueryUI} from 'meteor/mizzao:jquery-ui';

import './tower.css';
import './tower.html';

Template.Tower.onCreated(function towerOnCreated() {
  Meteor.subscribe('blocks');
});


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
  // var tetronimo = paper.path("M 250 250 l 0 -50 l -50 0 l 0 -50 l -50 0 l 0 50 l -50 0 l 0 50 z");
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
  imgBlocks = returnBlocks().fetch();
  if (imgBlocks.length > 0) {
    for(i=0; i< imgBlocks.length; i++){
      recreateSpriteFromDatabase(imgBlocks[i]._id, imgBlocks[i].src, imgBlocks[i].className, imgBlocks[i].xPos, imgBlocks[i].yPos);
    }
  }
});

function returnBlocks() {
  // console.log(Blocks.find().fetch());
  return Blocks.find();
}

// General generate element method
function createSprite(src, className) {
  var canvas = document.getElementById('game-canvas');
  var spanElement = document.createElement('span');
  var element = document.createElement('img');
  canvas.appendChild(spanElement);
  spanElement.appendChild(element);
  element.src=src;
  element.className = className;

  // Creates Block in Mongo DB
  var blockId;
  Meteor.call('blocks.add', className, src, 0, 0, function(error, result){
    blockId = result;
    element.id = blockId;
  });

  var classNameWithDot = '.'+className;
  $(classNameWithDot).draggable( {
    stop: function(){
      var finalOffset = $(this).offset();
      var finalxPos = finalOffset.left;
      var finalyPos = finalOffset.top;
      Meteor.call('blocks.edit', blockId, className, finalxPos, finalyPos);
    },
  });

}

function recreateSpriteFromDatabase(elementId, src, className, x, y) {
  $(document).ready(function() {

    var canvas = document.getElementById('game-canvas');
    var spanElement = document.createElement('span');
    var element = document.createElement('img');
    canvas.appendChild(spanElement);
    spanElement.appendChild(element);
    element.src=src;
    element.className = className;
    element.id = elementId;
    $(element).offset({ top: y, left: x });
    var blockId = elementId;

    var classNameWithDot = '.'+className;
    $(classNameWithDot).draggable( {
      stop: function(){
        var finalOffset = $(this).offset();
        var finalxPos = finalOffset.left;
        var finalyPos = finalOffset.top;
        Meteor.call('blocks.edit', blockId, className, finalxPos, finalyPos);
      },
    });
  });
}

Template.Tower.events({
  // Generate Kitchen elements
  'click #kitchen-generate': function(event){
    createSprite('game/kitchen/kitchen-empty.png', 'kitchen');
  },
  'click #kitchen-chair-1-generate': function(event){
    createSprite('game/kitchen/kitchen-chair-1.png', 'kitchen-chair-1');
  },
  'click #kitchen-coffee-generate': function(event){
    createSprite('game/kitchen/kitchen-coffee-maker.png', 'kitchen-coffee');
  },
  'click #kitchen-fridge-generate': function(event){
    createSprite('game/kitchen/kitchen-fridge.png', 'kitchen-fridge');
  },
  'click #kitchen-oven-generate': function(event){
    createSprite('game/kitchen/kitchen-oven.png', 'kitchen-oven');
  },

  // Generate Living Room elements
  'click #living-room-generate': function(event){
    createSprite('game/livingRoom/living-room-empty.png', 'living-room');
  },
  'click #living-room-armchair-1-generate': function(event){
    createSprite('game/livingRoom/living-room-armchair-1.png', 'living-room-armchair-1');
  },
  'click #living-room-armchair-2-generate': function(event){
    createSprite('game/livingRoom/living-room-armchair-2.png', 'living-room-armchair-2');
  },
  'click #living-room-tv-generate': function(event){
    createSprite('game/livingRoom/living-room-tv.png', 'living-room-tv');
  },
  'click #living-room-table-generate': function(event){
    createSprite('game/livingRoom/living-room-table.png', 'living-room-table');
  },
  'click #living-room-lamp-1-generate': function(event){
    createSprite('game/livingRoom/living-room-lamp-1.png', 'living-room-lamp-1');
  },
  'click #living-room-lamp-2-generate': function(event){
    createSprite('game/livingRoom/living-room-lamp-2.png', 'living-room-lamp-2');
  },
  'click #living-room-sound-system-generate': function(event){
    createSprite('game/livingRoom/living-room-sound-system.png', 'living-room-sound-system');
  },
// Generate Bedroom elements
  'click #bedroom-1-generate': function(event){
    createSprite('game/bedRoom1/bedroom-empty.png', 'bedroom-1');
  },
  'click #bedroom-1-bed-generate': function(event){
    createSprite('game/bedRoom1/bed.png', 'bedroom-1-bed');
  },
  'click #bedroom-1-rug-generate': function(event){
    createSprite('game/bedRoom1/rug.png', 'bedroom-1-rug');
  },
  'click #bedroom-1-table-generate': function(event){
    createSprite('game/bedRoom1/table.png', 'bedroom-1-table');
  },
  'click #bedroom-1-tv-generate': function(event){
    createSprite('game/bedRoom1/tv.png', 'bedroom-1-tv');
  },
  'contextmenu .ui-draggable': function(event) {
   event.preventDefault();
 }

});

Template.Tower.helpers({

});
