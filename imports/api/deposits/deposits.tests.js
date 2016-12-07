import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { expect } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Deposits } from './deposits.js';

if(Meteor.isServer) {
  describe('Deposits', function() {
    describe('methods', function() {
      const addDeposit = Meteor.server.method_handlers['deposits.add'];
      beforeEach(function(){
        resetDatabase();
      });

      it('can add a deposit', function(){
        addDeposit.call(this,125,"Test");
        expect(Deposits.find({}).count()).to.equal(1);
      });
      it("can't put random shit in", function(){
        // expect(addDeposit.call(this, "fifty thirteen bloody quid", "mate")).to.throw(Error);
        assert.throws(function() {addDeposit.call(this, "fifty thirteen bloody quid", "mate"); }, /Match error/);
      });
    });
  });
}

if(Meteor.isClient) {
  describe('Deposits');
}
