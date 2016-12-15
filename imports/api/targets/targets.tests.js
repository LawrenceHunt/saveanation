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
      targetDate.setHours(0,0,0,0);
      const createdAt = new Date();
      const invocation = { userId };
      const addTarget = Meteor.server.method_handlers['targets.add'];

      let targetId;

      beforeEach(function(){
        resetDatabase();
      });

      it('can add a target', function(){
        addTarget.apply(invocation, [5000, targetDate]);
        assert.equal(Targets.find().count(), 1);
      });

      it('can add a target value', function() {
        addTarget.apply(invocation, [5000, targetDate]);
        var testObject = Targets.findOne({createdBy: userId});
        assert.equal(testObject.targetAmount, 5000);
      });

      // it('won\'t accept a negative target value', function() {
      //   addTarget.apply(invocation, [-5, targetDate]);
      //   assert.equal(Targets.find().count(), 0);
      // });

      // it("won't accept a target date in the past", function() {
      //   addTarget.apply(invocation, [5000, targetDate.setDate(-5)]);
      //   assert.equal(Targets.find().count(), 0);
      // });


      it('can edit a target value', function() {
        addTarget.apply(invocation, [5000, targetDate]);
        const editTarget = Meteor.server.method_handlers['targets.edit'];
        editTarget.apply(invocation, [1000, targetDate]);
        var testObject = Targets.findOne({createdBy: userId});
        assert.equal(testObject.targetAmount, 1000);
      });

      it('can delete a target', function() {
        addTarget.apply(invocation, [5000, targetDate]);
        const targetId = Targets.find().fetch()[0]._id;
        const deleteTarget = Meteor.server.method_handlers['targets.remove'];
        deleteTarget.apply(invocation, [targetId]);
        assert.equal(Targets.find().count(), 0);
      });
    });
  });
};
