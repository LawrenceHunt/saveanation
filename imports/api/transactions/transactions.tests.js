import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Transactions } from './transactions.js';
// import { StubCollections } from 'meteor/hwillson:stub-collections';
import { SavingsAccounts } from '../savingsAccounts/savingsAccounts.js';


if(Meteor.isServer) {
  describe('transactions', function() {
    describe('methods', function() {
      const userId = Random.id();
      const addTransaction = Meteor.server.method_handlers['transactions.add'];
      const invocation = { userId };

      beforeEach(function(){
        resetDatabase();
        SavingsAccounts.insert({ createdBy: invocation.userId, balance: 0 });
      });

      it('should have an associated account', function(){
        expect(SavingsAccounts.find().count()).to.equal(1);
      });

      it('can add a deposit', function(){
        addTransaction.apply(invocation, [125, "test", "deposit"]);
        expect(Transactions.find({}).count()).to.equal(1);
      });
      it("handles errors", function(){
        assert.throws(function() {addTransaction.call(this, "A String", "Another String"); }, /Match error/);
      });
      it("can add a deposit with userID", function(){
        addTransaction.apply(invocation, [125, "test", "deposit"]);
        var transaction = Transactions.findOne({text: "test"});
        expect(transaction.owner).to.equal(userId);
      });
      it("adjusts the balance of the associated account", function(){
        addTransaction.apply(invocation, [125, "test", "deposit"]);
        var savingsAccountBalance = SavingsAccounts.findOne({}).balance;
        expect(savingsAccountBalance).to.equal(125);
      });
    });
  });
}

if(Meteor.isClient) {
  describe('transactions');
}
