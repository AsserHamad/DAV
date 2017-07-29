import { Announcements } from '../../collections/announcements.js'

var count = 0;
Template.HomeLayout.helpers({
  'latestAnnouncement':function(){
    return Announcements.find({}).fetch();
  }
})
