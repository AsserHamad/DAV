Meteor.subscribe('userData');
import { ProfilePics } from '../../collections/profilepics.js'

Template.register.events({
  'submit form': function(event){
      event.preventDefault();
      var email = $('[name=email]').val();
      var password = $('[name=password]').val();
      var firstName = $('[name=fname]').val();
      var lastName = $('[name=lname]').val();
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
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
          if(error)alert(error.reason);
          else FlowRouter.go('/');
        });
    }
});
