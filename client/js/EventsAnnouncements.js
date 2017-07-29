import { Events } from '../../collections/events.js'
import { SuggestedEvents } from '../../collections/suggested_events.js'
import { Announcements } from '../../collections/announcements.js'

Template.EventsAnnouncementsLayout.helpers({
  'userAdmin':function(){
    if(Meteor.user())
      return Meteor.user().profile.role=='admin'
  },
  'events':function(){
    return Events.find({}).fetch();
  }
});
Template.EventsAnnouncementsLayout.events({
    'submit .createEvent': function(event){
      event.preventDefault();
      let title = event.target.title.value;
      let text = event.target.text.value;
      let date = event.target.date.value;
      Meteor.call('createEvent',title,text,date,function(error){
        if(error)alert(error);
        else console.log(Events.find({}).fetch());
      });
     },
    'submit .createAnnouncement': function(event){
      event.preventDefault();
      let title = event.target.title.value;
      let text = event.target.text.value;
      Meteor.call('createAnnouncement',title,text,function(error){
        if(error)alert(error);
        else console.log(Announcements.find({}).fetch());
      });
    },
  'submit .suggestEvent': function(event){
    event.preventDefault();
    let title = event.target.title.value;
    let text = event.target.text.value;
    let date = event.target.date.value;
    let suggester_id = Meteor.userId();
    Meteor.call('suggestEvent',title,text,date,suggester_id,function(error){
      if(error)alert(error);
      else console.log(SuggestedEvents.find({}).fetch());
    });
  },
  'click .delete': function(event){
    event.preventDefault();
    if(confirm("Delete this event"))Meteor.call('deleteEvent',this._id);
  }
})
