import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

PostSchema = new SimpleSchema({
  body: {
    type: String,
  },
  author: {
    type: String,
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    },
  },
  trumpBits: {
    type: String,
    optional: true
  }
});

Posts.attachSchema( PostSchema );

Meteor.methods({
  'post.add'(text, trumpBits = "") {
    check(text, String);
    // Checks user is logged in
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    var currentUser = Meteor.user().profile.username;
    // Create the post object
    Posts.insert({
      body: text,
      trumpBits: trumpBits,
      author: currentUser
    });
  }
});

if (Meteor.isServer) {
  Meteor.publish('posts', function() {
      return Posts.find({}, { sort: { createdAt: -1}});
  });
}

Meteor.myFunctions = {
  trumpBits: function() {
    let bits = [
      "Number one, I have great respect for women. I was the one that really broke the glass ceiling on behalf of women, more than anybody in the saving industry.",
      "I'm just thinking to myself right now, we should just cancel the savings and just give it to Trump, right?",
      "I think the only difference between me and the other users is that I’m more honest and my women save more!",
      "You know, it really doesn’t matter what the media write as long as you make great savings!",
      "It's freezing and snowing in New York – we need global warming and more saving!",
      "The point is, you can never be too greedy!", "Thanks sweetie, that's nice.",
      "Bing bing bong bong bing bing bing!", "Beautiful, beautiful saving!",
      "Super classy saving!", "Listen,  I've made a lot of savings...",
      "We make the best savings!", "Crooked saver!", "Get 'em out",
      "You know what, I've made billions and billions of savings!",
      "I save very well, no one saves better than me!", "Rigged",
      "Many people are saying, 'This is the best saving!'",
      "Yuuuuuuuuge!", "BIGLY!!!", "Trump that!", "MSGA!!",
      "Made it bigly!", "Let's make saving great again!",
      "The beauty of me is that I make great savings!",
      "Great saving! THAT I can tell you... for sure!",
    ];
    return bits[Math.floor ( Math.random() * bits.length )];
  }
};
