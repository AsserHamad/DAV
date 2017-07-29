
Template.profile.helpers({
  'userId': function(){
    return FlowRouter.getParam('userId')
  },
  'firstName': function(){
    return Meteor.users.findOne({_id:FlowRouter.getParam('userId')}).profile.firstName;
  },
  'lastName': function(){
    return Meteor.users.findOne({_id:FlowRouter.getParam('userId')}).profile.lastName;
  },
  'age': function(){
    return Meteor.users.findOne({_id:FlowRouter.getParam('userId')}).profile.age;
  },
  'joinedAt': function(){
    return Meteor.users.findOne({_id:FlowRouter.getParam('userId')}).profile.joinedAt;
  },
  'mailingAddress': function(){
    return Meteor.users.findOne({_id:FlowRouter.getParam('userId')}).profile.mailingAddress;
  },
  'mobile': function(){
    return Meteor.users.findOne({_id:FlowRouter.getParam('userId')}).profile.mobile;
  },
  'sameUser': function(){
    return (FlowRouter.getParam('userId')==Meteor.userId());
  },
  'userAdmin': function(){
    if(Meteor.user())
      return Meteor.user().profile.role=='admin'
  },
  'myEmail': function(){
    if(Meteor.user())
      return Meteor.user().emails[0].address;
  }
})

Template.MainLayout.events({
  'click .logout': function(event){
        event.preventDefault();
        Meteor.logout(function(err){
          console.log(err);
        });
        console.log("Logged out!")
        FlowRouter.go('/');
    },
    'submit .editProfile' : function(event){
      event.preventDefault();
      console.log(Meteor.user());
      let firstName = event.target.firstName.value;
      let lastName = event.target.lastName.value;
      let summary = event.target.summary.value;
      let age = event.target.age.value;
      let mobile = event.target.mobile.value;
      let mailingAddress = event.target.mailingAddress.value;
      let data = {
        firstName: firstName,
        lastName: lastName,
        role: Meteor.user().profile.role,
        summary: summary,
        age: age,
        mobile: mobile,
        mailingAddress: mailingAddress,
        joinedAt: Meteor.user().profile.joinedAt
      };
      Meteor.users.update(Meteor.userId(),{
        $set:{
          profile: data
        }
      })
    }
})
