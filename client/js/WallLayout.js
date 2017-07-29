import { WallPosts } from '../../collections/wall_posts.js'

Template.WallLayout.helpers({
  'wallPosts': function(){
    console.log(WallPosts.find({}).fetch());
    return WallPosts.find({}).fetch();
  }
})
Template.WallLayout.events({
  'submit .wall_post': function(event){
    event.preventDefault();
    Meteor.call('addWallPost',event.target.title.value,event.target.text.value,Meteor.userId(),function(error){
      if(error)alert(error);
      else console.log(WallPosts.find({}).fetch());
    })
  }
})
