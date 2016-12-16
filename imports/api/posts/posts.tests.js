import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { expect } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Posts } from './posts.js';

if(Meteor.isServer) {
  describe('Post', function() {
    describe('methods', function() {

      beforeEach(function(){
        resetDatabase();
        Accounts.createUser({
          _id: 1,
          profile: {username: "Dave"},
          username: "Dave",
          email: "dave@dave.com",
          password: "password"
        });
      });

      it('can add a post', function(){
        const addPost = Meteor.server.method_handlers['post.add'];
        let account = Accounts.findUserByUsername("Dave");
        const userId = account._id;
        const invocation = { userId };
        addPost.apply(invocation,[ "test", "test"]);
        expect(Posts.find().count()).to.equal(1);
      });
      
      it('stores text', function(){
        const addPost = Meteor.server.method_handlers['post.add'];
        let account = Accounts.findUserByUsername("Dave");
        const userId = account._id;
        const invocation = { userId };
        addPost.apply(invocation,[ "test", "Bigly"]);
        let post = Posts.findOne({author:"Dave"});
        expect(post.body).to.equal("test");
        expect(post.encouragement).to.equal("Bigly");
        expect(post.author).to.equal("Dave");
      });
    });
  });
}
