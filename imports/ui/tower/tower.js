import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Blocks } from '../../api/tower/tower.js';
import { CoinBanks } from '../../api/tower/coinBank.js';
import { jQuery } from 'meteor/jquery';
import { Raphael } from 'meteor/agnito:raphael';
import {jQueryUI} from 'meteor/mizzao:jquery-ui';
import { Accounts } from 'meteor/accounts-base';
import { Posts } from '../../api/posts/posts.js';

import './tower.css';
import './tower.html';

// SUBSCRIPTIONS
Template.Tower.onCreated(function towerOnCreated() {
  Meteor.subscribe('blocks');
  Meteor.subscribe('coinBanks');

});

// ON RENDER
Template.Tower.onRendered(function(){
  populateSprites();
  // var user = Meteor.user();
  // var userId = user._id;
  // console.log(CoinBanks.find({createdBy: userId }));
});

// COINBANK METHODS
Template.Tower.helpers({
  balance() {
    var userId = Meteor.userId();
    if (!CoinBanks.findOne({createdBy: userId})) {
      return 5000;
    } else {
      coinBank = CoinBanks.findOne({createdBy: userId});
      return coinBank.balance;
    }
  },
});

function checkAccountExists(){
  if (noCoinAccount()) {
    Meteor.call('coinBank.create');
  }
}

function noCoinAccount() {
  var userId = Meteor.userId();
  if(CoinBanks.findOne({createdBy: userId}) ){
    return false;
  } else {
    return true;
  }
}

function changeCoins(amount){
  checkAccountExists();
  var userId = Meteor.userId();
  Meteor.call('coinBank.adjustBalance', amount, userId);
}



// RETURN SPRITES

function populateSprites(){
  imgBlocks = Blocks.find().fetch();
  if (imgBlocks.length > 0) {
    for(i=0; i< imgBlocks.length; i++){
      recreateSpriteFromDatabase(imgBlocks[i]._id, imgBlocks[i].src, imgBlocks[i].className, imgBlocks[i].xPos, imgBlocks[i].yPos);
    }
  }
}

// GENERATE SPRITES
function createSprite(src, className) {
  var canvas = document.getElementById('game-canvas');
  var spanElement = document.createElement('span');
  var element = document.createElement('img');
  canvas.appendChild(spanElement);
  spanElement.appendChild(element);
  element.src=src;
  element.className = className;
  element.setAttribute('contextmenu', 'delete-menu');

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
// POPULATE PAGE WITH DATABASE SPRITES
function recreateSpriteFromDatabase(elementId, src, className, x, y) {
    var canvas = document.getElementById('game-canvas');
    var spanElement = document.createElement('span');
    var element = document.createElement('img');
    canvas.appendChild(spanElement);
    spanElement.appendChild(element);
    element.src=src;
    element.className = className;
    element.id = elementId;
    element.setAttribute('contextmenu', 'delete-menu');
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
}

function announcePurchase(item) {
  Meteor.call('post.add', "Splashed out on a shiny new " + item);
}

Template.Tower.events({
  // Generate Kitchen elements
  'click #kitchen-generate': function(event){
    createSprite('game/kitchen/kitchen-empty.png', 'kitchen');
    changeCoins(-3000);
    announcePurchase('empty kitchen. Gordon Ramsay in the making!');
  },
  'click #kitchen-chair-1-generate': function(event){
    createSprite('game/kitchen/kitchen-chair-1.png', 'kitchen-chair-1');
    changeCoins(-200);
    announcePurchase('classy kitchen chair.');
  },
  'click #kitchen-coffee-generate': function(event){
    createSprite('game/kitchen/kitchen-coffee-maker.png', 'kitchen-coffee');
    changeCoins(-200);
    announcePurchase('gourmet Italian espresso machine. It takes single source beans only');
  },
  'click #kitchen-fridge-generate': function(event){
    createSprite('game/kitchen/kitchen-fridge.png', 'kitchen-fridge');
    changeCoins(-500);
    announcePurchase('fridge freezer. It does ice and everything.');
  },
  'click #kitchen-oven-generate': function(event){
    createSprite('game/kitchen/kitchen-oven.png', 'kitchen-oven');
    changeCoins(-550);
    announcePurchase('oven. What is cooking, better-than-average looking?');
  },

  // Generate Living Room elements
  'click #living-room-generate': function(event){
    createSprite('game/livingRoom/living-room-empty.png', 'living-room');
    changeCoins(-5000);
    announcePurchase('empty living room. Anyone want to add a home cinema system?');
  },
  'click #living-room-armchair-1-generate': function(event){
    createSprite('game/livingRoom/living-room-armchair-1.png', 'living-room-armchair-1');
    changeCoins(-400);
    announcePurchase('armchair!');
  },
  'click #living-room-armchair-2-generate': function(event){
    createSprite('game/livingRoom/living-room-armchair-2.png', 'living-room-armchair-2');
    changeCoins(-600);
    announcePurchase('big armchair. No fighting over it!');
  },
  'click #living-room-tv-generate': function(event){
    createSprite('game/livingRoom/living-room-tv.png', 'living-room-tv');
    changeCoins(-500);
    announcePurchase('TV for the lounge. Is the footie on?');
  },
  'click #living-room-table-generate': function(event){
    createSprite('game/livingRoom/living-room-table.png', 'living-room-table');
    changeCoins(-100);
    announcePurchase('table for the living room.');
  },
  'click #living-room-sound-system-generate': function(event){
    createSprite('game/livingRoom/living-room-sound-system.png', 'living-room-sound-system');
    changeCoins(-200);
    announcePurchase('sound system for the living room. PARTAY');
  },
  'click #living-room-lamp-1-generate': function(event){
    createSprite('game/livingRoom/living-room-lamp-1.png', 'living-room-lamp-1');
    changeCoins(-75);
    announcePurchase('classic yet stylish lamp');
  },
  'click #living-room-lamp-2-generate': function(event){
    createSprite('game/livingRoom/living-room-lamp-2.png', 'living-room-lamp-2');
    changeCoins(-50);
    announcePurchase('extravagant light source for the living room.');
  },

// Generate Bedroom elements
  'click #bedroom-1-generate': function(event){
    createSprite('game/bedRoom1/bedroom-empty.png', 'bedroom-1');
    changeCoins(-4000);
    announcePurchase('empty bedroom. The house is getting bigger :)');
  },
  'click #bedroom-1-bed-generate': function(event){
    createSprite('game/bedRoom1/bed.png', 'bedroom-1-bed');
    changeCoins(-500);
    announcePurchase('Double Bed. Foam Mattress baby!');
  },
  'click #bedroom-1-rug-generate': function(event){
    createSprite('game/bedRoom1/rug.png', 'bedroom-1-rug');
    changeCoins(-150);
    announcePurchase('plush rug for the bedroom.');
  },
  'click #bedroom-1-table-generate': function(event){
    createSprite('game/bedRoom1/table.png', 'bedroom-1-table');
    changeCoins(-200);
    announcePurchase('table for the bedroom.');
  },
  'click #bedroom-1-tv-generate': function(event){
    createSprite('game/bedRoom1/tv.png', 'bedroom-1-tv');
    changeCoins(-300);
    announcePurchase("TV for the bedroom. Do not disturb!");
  },
  'dblclick .ui-draggable': function(event) {
    event.preventDefault();
    alert("Are you sure you want to delete this item?");
    let target = event.target;
    elementId = target.id;
    Meteor.call('blocks.delete', elementId);
    var element = document.getElementById(elementId);
    element.remove();
 }

});
