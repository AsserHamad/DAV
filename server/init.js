import { Meteor } from 'meteor/meteor';
import { WallPosts } from '../collections/wall_posts.js'
import { Events } from '../collections/events.js'
import { SuggestedEvents } from '../collections/suggested_events.js'
import { Announcements } from '../collections/announcements.js'
import { CatalogueInfo } from '../collections/catalogue-images.js'


Meteor.startup(() => {
  if(Meteor.users.find().fetch().length===0)
    Accounts.createUser({
    email: 'admin@admin.com',
    password: 'admin',
    profile: {
      role:'admin',
      firstName: 'Admin',
      lastName: 'Abo el Adamen',
      mailingAddress: 'admin@admin.com',
      joinedAt: new Date()
    },function(error){
      console.log(error);
    }
  })
  Meteor.methods({
    addWallPost(title,text,createdBy){
      WallPosts.insert({
        title: title,
        text: text,
        createdBy: Meteor.userId()
      })
    },
    createAnnouncement(title,text){
      Announcements.insert({
        title: title,
        text: text
      })
    },
    createEvent(title,text,date){
      Events.insert({
        name:title,
        date: date,
        description:text
      })
    },
    suggestEvent(title,text,date,sug_id){
      SuggestedEvents.insert({
        name:title,
        date: date,
        suggester_id: sug_id,
        description:text
      })
    },
    deleteEvent(_id){
      Events.remove({
        _id: _id
      })
    },
    removeWallPost(_id){
      WallPosts.remove({
        _id: _id
      })
    },
    catalogueInfo(file){
      CatalogueInfo.insert({
        poster_id: Meteor.userId(),
        info: file
      })
    }
  })
});
