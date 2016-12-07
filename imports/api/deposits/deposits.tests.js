import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Deposits } from './deposits.js';

if(Meteor.isServer) {
  describe('Deposits', function() {
    describe('methods', function() {
      const userId = Random.id();
      let depositId;

      beforeEach(function(){
        resetDatabase();
      });

      it('can add a deposit', function(){
        const addDeposit = Meteor.server.method_handlers['deposits.add'];

        const invocation = { userId };

        addDeposit.apply(invocation, [depositId]);

        assert.equal(Deposits.find().count(), 1);
      });
    });
  });
};

if(Meteor.isClient) {
  describe('Deposits')
}
