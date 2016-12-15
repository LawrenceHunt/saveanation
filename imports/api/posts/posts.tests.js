import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Posts } from './posts.js';

if(Meteor.isServer) {
  describe('Post', function() {
    describe('methods', function() {
      const addPost = Meteor.server.method_handlers['post.add'];
      // const userId = Random.id();
      const userId = 1;
      const user = Accounts.createUser({_id: 1, username: "Dave", email: "dave@dave.com", password: "password"});
      const invocation = { userId };

      let postId;
      beforeEach(function(){
        resetDatabase();
      });

      it('can add a post', function(){

        addPost.apply(invocation,[ "test", "test"]);
        expect(Posts.find().count()).to.equal(1);
      });
    });
  });
}
