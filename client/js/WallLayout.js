import { WallPosts } from '../../collections/wall_posts.js'




Template.WallLayout.helpers({
  'wallPosts': function(){
    console.log(WallPosts.find({}).fetch());
    return WallPosts.find({}, {sort: {posted_at:-1}}).fetch();
  },
  'sameUser': function(){
    console.log(this);
    return Meteor.userId()==this.poster_id;
  },
  'userAdmin' : function(){
    console.log("Role is "+Meteor.user().profile.role);
    if(Meteor.user())
    return Meteor.user().profile.role=='admin';
  },
  'getName': function(id){
    console.log(id);
    let x = Meteor.users.findOne({_id:id}).profile;
    return x.firstName+" "+x.lastName;
  },
  'sendEmail':function(){
    //TODO: Send email to deleted poster's
    console.log(this);
    Meteor.call(
      'sendEmail',
      'Asser <asserhamad96@gmail.com>',
      'malza.is.best.lol@gmail.com',
      'Hello from Meteor!',
      'This is a test of Email.send.'
    );
  }
})
Template.WallLayout.events({
  'submit .wall_post': function(event){
    event.preventDefault();
    Meteor.call('addWallPost',event.target.title.value,event.target.text.value,Meteor.userId(),function(error){
      if(error)sweetalert(error,"error");
      else sweetalert("Your post has been submitted succesfully!","success");
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
