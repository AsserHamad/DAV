Template.profile.onCreated(function(){
  var userId = FlowRouter.getParam('userId');
  console.log(userId+" is your id");
})
Template.profile.events({
  'click .follow': function(){
    let followed = FlowRouter.getParam('userId');
    Meteor.call('follow', followed,function(error){
      if(error)console.log(error);
      else console.log(Meteor.users.findOne({_id: followed}));
    })
  }
})
