import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const WallPosts = new Mongo.Collection('wallposts');

WallPostSchema = new SimpleSchema({
  title: {
    type: String,
    label: "Title"
  },
  text:{
    type: String,
    label: "Main Text"
  },
  poster_id: {
    type: String,
    label: "The poster's ID",
    autoValue: function(){
      return this.userId;
    },
    autoform: {
      type: "hidden"
    }
  }
});

WallPosts.attachSchema(WallPostSchema);
