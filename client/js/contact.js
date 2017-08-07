import { Feedback } from '../../collections/feedback.js';

Template.contact.events({
  'submit .contact_form':function(event){
    event.preventDefault();
    let values = {
      name: event.target.name.value,
      email: event.target.email.value,
      subject: event.target.subject.value,
      message: event.target.message.value
    }
    Meteor.call('feedback',values,function(error){
      if(error)console.log(error);
      else console.log(Feedback.find({}).fetch());
    });
  }
})
