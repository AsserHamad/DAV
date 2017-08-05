import { WallPosts } from '../../collections/wall_posts.js'

Template.WallLayout.helpers({
  'wallPosts': function(){
    console.log(WallPosts.find({}).fetch());
    return WallPosts.find({}).fetch();
  },
  'sameUser': function(){
    console.log(this);
    return Meteor.userId()==this.poster_id;
  },
  'userAdmin' : function(){
    return Meteor.user().role=='admin';
  },
  'getName': function(id){
    console.log(id);
    let x = Meteor.users.findOne({_id:id}).profile;
    return x.firstName+" "+x.lastName;
  }
})
Template.WallLayout.events({
  'submit .wall_post': function(event){
    event.preventDefault();
    Meteor.call('addWallPost',event.target.title.value,event.target.text.value,Meteor.userId(),function(error){
      if(error)alert(error);
      else console.log(WallPosts.find({}).fetch());
    })
  },
  'click .delete' : function(event){
    event.preventDefault();
    if(confirm('Are you sure you want to delete this wall post?'))
      Meteor.call('removeWallPost',this._id,function(error){
        if(error)alert(error);
        else console.log(WallPosts.find({}).fetch());
      })
  }
})
