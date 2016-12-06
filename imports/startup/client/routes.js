FlowRouter.route('/', {
  name: 'home',
  action() {
  //   if(Meteor.userId()){
  //     FlowRouter.go('recipe-book')
  //   }
    BlazeLayout.render('MainLayout', { main: 'Homepage' });
  }
});
