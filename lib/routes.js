FlowRouter.route('/',{
  name: 'home',
  action(){
    BlazeLayout.render('MainLayout', {main: 'HomeLayout'})
  }
});

FlowRouter.route('/events-announcements',{
  name: 'events-announcements',
  action(){
    BlazeLayout.render('MainLayout', {main: 'EventsAnnouncementsLayout'})
  }
});
FlowRouter.route('/catalogue',{
  name: 'catalogue',
  action(){
    BlazeLayout.render('MainLayout', {main: 'CatalogueLayout'})
  }
});
FlowRouter.route('/dav-wall',{
  name: 'dav-wall',
  action(){
    BlazeLayout.render('MainLayout', {main: 'WallLayout'})
  }
});
FlowRouter.route('/register',{
  name: 'register',
  action(){
    BlazeLayout.render('MainLayout', {main: 'register'})
  }
});
FlowRouter.route('/login',{
  name: 'login',
  action(){
    BlazeLayout.render('MainLayout', {main: 'login'})
  }
});

FlowRouter.route('/profile/:userId',{
  name: 'profile',
  action(){
    BlazeLayout.render('MainLayout', {main: 'profile'})
  }
});
