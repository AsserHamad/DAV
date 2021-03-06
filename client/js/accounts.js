Meteor.subscribe('userData');
import { ProfilePics } from '../../collections/profilepics.js'

Template.register.events({
  'submit form': function(event){
      event.preventDefault();
      var email = $('[name=email]').val();
      var password = $('[name=password]').val();
      var firstName = $('[name=fname]').val();
      var lastName = $('[name=lname]').val();
      console.log(email);
      Accounts.createUser({
        email:email,
        password:password,
        profile: {
          firstName: firstName,
          lastName: lastName,
          role: 'user',
          mailingAddress: email,
          joinedAt: new Date()
        }
      },function(error){
        if(error)alert(error);
        else {
          FlowRouter.go('/');
        }
      });

  }
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        console.log(event);
        var email = event.target.email.value;
        var password = event.target.password.value;
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
