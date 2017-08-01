Template.profile.onCreated(function(){
  var userId = FlowRouter.getParam('userId');
  console.log(userId+" is your id");
})
Template.profile.events({
  'click follow': function(){
    console.log("You followed this guy!");
  }
})
