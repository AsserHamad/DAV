Meteor.subscribe('userData');
import { ProfilePics } from '../../collections/profilepics.js'

Template.register.events({
  'submit form': function(event){
      event.preventDefault();
      var email = $('[name=email]').val();
      var password = $('[name=password]').val();
      var firstName = $('[name=fname]').val();
      var lastName = $('[name=lname]').val();
      Meteor.call('registerUser',email,password,firstName,lastName,function(error){
        if(error)console.log(error);
        else console.log("success!");
      })

  }
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
          if(error)alert(error.reason);
          else {
            swal("Good job!", "You clicked the button!", "success")
            // FlowRouter.go('/');
          }
        });
    }
});
