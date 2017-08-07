import {
  Meteor
} from 'meteor/meteor';
import {
  WallPosts
} from '../collections/wall_posts.js'
import {
  Events
} from '../collections/events.js'
import {
  SuggestedEvents
} from '../collections/suggested_events.js'
import {
  Announcements
} from '../collections/announcements.js'
import {
  CatalogueImages,
  CatalogueInfo
} from '../collections/catalogue-images.js'


Meteor.startup(() => {
  if (Meteor.users.find().fetch().length === 0) {
    Accounts.createUser({
      email: 'admin@admin.com',
      password: 'admin',
      profile: {
        role: 'admin',
        firstName: 'Admin',
        lastName: 'Abo el Adamen',
        mailingAddress: 'admin@admin.com',
        followers: [],
        following: [],
        notifications: {},
        joinedAt: new Date()
      },
      function(error) {
        console.log(error);
      }
    })
  };

  Meteor.methods({
    addWallPost(title, text, createdBy) {
      WallPosts.insert({
        title: title,
        text: text,
        posted_at: new Date(),
        createdBy: Meteor.userId()
      })
    },
    createAnnouncement(title, text) {
      Announcements.insert({
        title: title,
        text: text
      })
    },
    createEvent(title, text, date) {
      Events.insert({
        name: title,
        date: date,
        description: text,
        attendees: []
      })
    },
    suggestEvent(title, text, date, sug_id) {
      SuggestedEvents.insert({
        name: title,
        date: date,
        suggester_id: sug_id,
        description: text
      })
    },
    deleteEvent(_id) {
      Events.remove({
        _id: _id
      })
    },
    addAttendee(event) {
      Events.update({
        _id: event._id
      }, {
        $push: {
          attendees: Meteor.userId()
        }
      })
    },
    removeAttendee(event) {
      Events.update({
        _id: event._id
      }, {
        $pull: {
          attendees: Meteor.userId()
        }
      })
    },
    removeWallPost(_id) {
      WallPosts.remove({
        _id: _id
      })
    },
    catalogueInfo(file) {
      CatalogueInfo.insert({
        poster_id: Meteor.userId(),
        info: file
      })
    },
    removeCataloguePic(file) {
      CatalogueImages.remove({
        _id: file.info._id
      }, function(error) {
        if (error) alert(error);
        else {
          CatalogueInfo.remove({
            _id: file._id
          }, function(error) {
            if (error) alert(error);
            else console.log(CatalogueInfo.find());
          })
        }
      })
    },
    follow(followed) {
      console.log(Meteor.users.findOne({
        _id: followed
      }).profile);
      if (!Meteor.users.findOne({
          _id: followed
        }).profile.followers || Meteor.users.findOne({
          _id: followed
        }).profile.followers.indexOf(Meteor.userId()) == -1) {
        let profile = Meteor.users.findOne({
          _id: followed
        }).profile;
        if (!profile.followers) profile.followers = [Meteor.userId()];
        else profile.followers.push(Meteor.userId());
        Meteor.users.update({
          _id: followed
        }, {
          $set: {
            profile: profile
          }
        });
        profile = Meteor.users.findOne({
          _id: Meteor.userId
        }).profile;
        if (!profile.following) profile.followers = [followed];
        else profile.following.push(followed);
        Meteor.users.update({
          _id: Meteor.userId()
        }, {
          $push: {
            profile: profile
          }
        });
      }

    }
  })
});
