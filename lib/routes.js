FlowRouter.route('/', {
  name: 'home',
  action() {
    if(Meteor.userId()) {
      FlowRouter.go('/feed');
    }
    BlazeLayout.render('main');
  }
});

FlowRouter.route('/feed', {
  name: 'feed',
  action() {
    BlazeLayout.render('feed');
  }
});
