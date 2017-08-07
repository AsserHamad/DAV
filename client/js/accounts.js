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
          if(error){

            swal(error.reason,"", "error");
          }
          else {
            swal({title: "Login Succesful!", confirmButtonText:"Take me home", type: "success"},function(){
              // console.log("Hey son!");
              FlowRouter.go('/');
            })
          }
        });
    }
});
