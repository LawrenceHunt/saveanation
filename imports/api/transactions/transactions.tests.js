import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { expect } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Transactions } from './transactions.js';

if(Meteor.isServer) {
  describe('transactions', function() {
    describe('methods', function() {
      const userId = Random.id();
      const addTransaction = Meteor.server.method_handlers['transactions.add'];
      const invocation = { userId };
      const transactionId = Transactions.insert({
          amount: parseInt(125),
          owner: userId,
          text: "Test",
          createdAt: new Date(),
          type: "deposit"
        });
      beforeEach(function(){
        resetDatabase();
      });

      it('can add a deposit', function(){
        addTransaction.call(this,125,"test","deposit");
        expect(Transactions.find({}).count()).to.equal(1);
      });
      it("handles errors", function(){
        assert.throws(function() {addTransaction.call(this, "A String", "Another String"); }, /Match error/);
      });
      it("stores userId", function() {
        addTransaction.call(userId, 125)
      })

      //
      // beforeEach(() => {
      //         Tasks.remove({});
      //         taskId = Tasks.insert({
      //           text: 'test task',
      //           createdAt: new Date(),
      //           owner: userId,
      //           username: 'tmeasday',
      //         });
      //       });
      //
      // it('can delete owned task', () => {
      //       // Find the internal implementation of the task method so we can
      //       // test it in isolation
      //       const deleteTask = Meteor.server.method_handlers['tasks.remove'];
      //
      //       // Set up a fake method invocation that looks like what the method expects
      //       const invocation = { userId };
      //
      //       // Run the method with `this` set to the fake invocation
      //       deleteTask.apply(invocation, [taskId]);
      //
      //       // Verify that the method does what we expected
      //       assert.equal(Tasks.find().count(), 0);
      //     });
      //


    });
  });
}

if(Meteor.isClient) {
  describe('transactions');
}
