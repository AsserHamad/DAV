import { Meteor } from 'meteor/meteor';
import { WallPosts } from '../collections/wall_posts.js'

Meteor.startup(() => {
  Meteor.methods({
    addWallPost(title,text,createdBy){
      WallPosts.insert({
        title: title,
        text: text,
        createdBy: Meteor.userId()
      })
    }
  })
});
