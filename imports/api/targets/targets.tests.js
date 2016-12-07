import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Targets } from './targets.js';

if(Meteor.isServer) {
  describe('Targets', function() {
    describe('methods', function() {
      const userId = Random.id();
      let targetId;

      beforeEach(function(){
        resetDatabase();
      });

      it('can add a target', function(){
        // Find the internal implementation of the addTarget method so we can
        // test it in isolation
        const addTarget = Meteor.server.method_handlers['targets.add', 50000, new Date()];
        console.log(addTarget);

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        // Run the method with `this` set to the fake invocation
        addTarget.apply(invocation, [targetId]);

        // Verify that the method does what we expected
        assert.equal(Targets.find().count(), 1);
      });
    });
  });
};
