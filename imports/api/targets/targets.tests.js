import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Targets } from './targets.js';

if(Meteor.isServer) {
  describe('Targets', function() {
    describe('methods', function() {
      const userId = Random.id();
      const targetDate = new Date();
      const createdAt = new Date();
      let targetId;

      beforeEach(function(){
        resetDatabase();
      });

      it('can add a target', function(){
        const addTarget = Meteor.server.method_handlers['targets.add'];
        const invocation = { userId };
        addTarget.apply(invocation, [5000, targetDate]);
        assert.equal(Targets.find().count(), 1);
      });

      it('can add a target value', function() {
        const addTarget = Meteor.server.method_handlers['targets.add'];
        const invocation = { userId };
        addTarget.apply(invocation, [5000, targetDate]);
        var testObject = Targets.findOne({createdBy: userId});
        assert.equal(testObject.targetAmount, 5000);
      });

      it("won't accept a negative target value", function() {
        const addTarget = Meteor.server.method_handlers['targets.add'];
        const invocation = { userId };
        addTarget.apply(invocation, [-5000, targetDate]);
        assert.equal(Targets.find().count(), 0);
      });

      it("won't accept a target date in the past", function() {
        const addTarget = Meteor.server.method_handlers['targets.add'];
        const invocation = { userId };
        addTarget.apply(invocation, [5000, targetDate.setDate(-5)]);
        assert.equal(Targets.find().count(), 0);
      });

      it("won't accept a second target from the same user", function() {
        const addTarget = Meteor.server.method_handlers['targets.add'];
        const invocation = { userId };
        addTarget.apply(invocation, [5000, targetDate]);
        addTarget.apply(invocation, [5000, targetDate]);
        assert.equal(Targets.find().count(), 1);
      })

      it('can edit a target value', function() {
        Targets.insert({targetAmount: 5000, targetDate: targetDate, createdBy: userId, createdAt: createdAt});
        const editTarget = Meteor.server.method_handlers['targets.edit'];
        const invocation = { userId };
        editTarget.apply(invocation, [1000, targetDate]);
        var testObject = Targets.findOne({createdBy: userId});
        assert.equal(testObject.targetAmount, 1000);
      });

      it('can delete a target', function() {
        const addTarget = Meteor.server.method_handlers['targets.add'];
        const invocation = { userId };
        addTarget.apply(invocation, [5000, targetDate]);
        const targetId = Targets.find().fetch()[0]._id;
        const deleteTarget = Meteor.server.method_handlers['targets.remove'];
        deleteTarget.apply(invocation, [targetId]);
        assert.equal(Targets.find().count(), 0);
      });
    });
  });
};
