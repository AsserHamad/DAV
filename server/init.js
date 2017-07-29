import { Meteor } from 'meteor/meteor';
import { WallPosts } from '../collections/wall_posts.js'

Meteor.startup(() => {
  if(Meteor.users.find().fetch().length===0)
    Accounts.createUser({
    email: 'admin@admin.com',
    password: 'admin',
    profile: {
      role:'admin',
      firstName: 'Admin',
      lastName: 'Abo el Adamen',
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
    removeWallPost(_id){
      WallPosts.remove({
        _id: _id
      })
    }
  })
});
