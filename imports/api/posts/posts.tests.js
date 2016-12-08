import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Posts } from './posts.js';

if(Meteor.isServer) {
  describe('Post', function() {
    describe('methods', function() {
      const userId = Random.id();
      let postId;

      beforeEach(function(){
        resetDatabase();
      });

      it('can add a post', function(){
        const addPost = Meteor.server.method_handlers['posts.insert'];
        const invocation = { body: "hello", createdAt: new Date()};
        addPost.apply(invocation, [postId] );
        expect(Posts.find().count()).to.equal(0);
      });
    });
  });
}
