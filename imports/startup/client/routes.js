FlowRouter.route('/', {
  name: 'home',
  action() {
  //   if(Meteor.userId()){
  //     FlowRouter.go('recipe-book')
  //   }
    BlazeLayout.render('App_body', { main: 'Homepage' });
  }
});
