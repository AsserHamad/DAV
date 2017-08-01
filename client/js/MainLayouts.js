import { ProfilePics } from '../../collections/profilepics.js'

Template.MainLayout.onCreated(function () {
  document.title = "DAAD Whatever";
  this.currentUpload = new ReactiveVar(false);
});

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

Template.MainLayout.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
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
    'submit .editProfile' : function(event, template){
      event.preventDefault();

      var pic;

      //Uploading Profile Pic
      if(event.target.fileInput){
        const upload = ProfilePics.insert({
          file: event.target.fileInput.files[0],
          streams: 'dynamic',
          chunkSize: 'dynamic'
        }, false);

        upload.on('start', function () {
          template.currentUpload.set(this);
        });

        upload.on('end', function (error, fileObj) {
          if (error) {
            alert('Error during upload: ' + error);
          } else {
            alert('File "' + fileObj.name + '" successfully uploaded');
            pic=fileObj;
            console.log("Below me is pic!");
            console.log(pic);
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
              pic:pic,
              joinedAt: Meteor.user().profile.joinedAt
            };
            Meteor.users.update(Meteor.userId(),{
              $set:{
                profile: data
              }
            })
          }
          template.currentUpload.set(false);
        });

        upload.start();
    }//End of uploading
    else{
      console.log(Meteor.user());
      let firstName = event.target.firstName.value;
      let lastName = event.target.lastName.value;
      let summary = event.target.summary.value;
      let age = event.target.age.value;
      let mobile = event.target.mobile.value;
      let mailingAddress = event.target.mailingAddress.value;
      console.log("PIIIC"+JSON.stringify(pic));
      let data = {
        firstName: firstName,
        lastName: lastName,
        role: Meteor.user().profile.role,
        summary: summary,
        age: age,
        mobile: mobile,
        mailingAddress: mailingAddress,
        followers: [],
        following: [],
        notifications: {},
        joinedAt: Meteor.user().profile.joinedAt
      };
      Meteor.users.update(Meteor.userId(),{
        $set:{
          profile: data
        }
      })
    }


    }
})
