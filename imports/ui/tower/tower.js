import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Blocks } from '../../api/tower/tower.js';
import { jQuery } from 'meteor/jquery';
import { Raphael } from 'meteor/agnito:raphael';

import './tower.css';
import './tower.html';


// when user first connects
Template.Tower.onCreated(function(){

});

Template.Tower.helpers({

});
//
// var updateTowerCanvas = function(gamecanvas) {
//   Tracker.autorun(function(){
//     let ctx = gamecanvas.getContext('2d');
//     ctx.fillStyle = "rgb(45,45,13)";
// 	  ctx.fillRect(0,0,20,20);
//   });
// };
//
//
// // initiate the canvas
// Template.Tower.onRendered(function() {
//   let gamecanvas = this.find('#gamecanvas'); // get canvas from dom
//   updateTowerCanvas(gamecanvas);
// });
//
// Template.Tower.events({
//   '.click #block'(){
//
//   }
// });


Template.Tower.onRendered(function(){
  paper = Raphael("paper", "100%", "100%");
  var t = paper.text(50, 10, "HTML5ROCKS");

  var letters = paper.print(50, 50, "HTML5ROCKS", paper.getFont("Vegur"), 40);

  letters[4].attr({fill:"orange"});
  for (var i = 5; i < letters.length; i++) {
    letters[i].attr({fill: "#3D5C9D", "stroke-width": "2", stroke: "#3D5C9D"});
  }
});

var createGoban = function () {
  // Create goban
  // Based off of svg in public domain: http://commons.wikimedia.org/wiki/File:Blank_Go_board.svg
  // Converted using http://readysetraphael.com/
  // var rect_a = paper.rect(0, 0, 96, 96);
  // rect_a.attr({fill: '#DCB35C','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_a');
  // var path_b = paper.path("M2.9,93h90.2m-.2-5H3m0-5h90m0-5H3m0-5h90m0-5H3m0-5h90m0-5H3m0-5h90m0-5H3m0-5h90m0-5H3m0-5h90m0-5H3m0-5h90m0-5H3m0-5h90m0-5H3m-.1-5h90.2M3,3V93m5,0V3m5,0V93m5,0V3m5,0V93m5,0V3m5,0V93m5,0V3m5,0V93m5,0V3m5,0V93m5,0V3m5,0V93m5,0V3m5,0V93m5,0V3m5,0V93m5,0V3m5,0V93m5,0V3");
  // path_b.attr({stroke: '#000',"stroke-width": '0.2',fill: 'none','stroke-opacity': '1'}).data('id', 'path_b');
  // var path_c = paper.path("M18,78l0,0m30,0l0,0m30,0l0,0m0-30l0,0m-30,0l0,0m-30,0l0,0m0-30l0,0m30,0l0,0m30,0l0,0");
  // path_c.attr({stroke: '#000',"stroke-width": '4',"stroke-linecap": 'round','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_c');
  // var goban = [rect_a, path_b, path_c];
  //
  // // Scale goban up since rsr outputs reduced size
  // for(var i = 0; i < goban.length; i++) {
  //   goban[i].transform('S5,5,0,0');
  // }
  var paper = Raphael("sample-4", 600, 100);
var t = paper.text(50, 10, "HTML5ROCKS");

var letters = paper.print(50, 50, "HTML5ROCKS", paper.getFont("Vegur"), 40);

letters[4].attr({fill:"orange"});
for (var i = 5; i < letters.length; i++) {
  letters[i].attr({fill: "#3D5C9D", "stroke-width": "2", stroke: "#3D5C9D"});
}
};
