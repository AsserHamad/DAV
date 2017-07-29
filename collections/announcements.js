import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Announcements = new Mongo.Collection('announcements');

AnnouncementSchema = new SimpleSchema({
  title: {
    type: String,
    label: "Title"
  },
  text: {
    type: String,
    label: "Text"
  },
  poster_id: {
    type: String,
    label: "Supervising Admin ID",
    autoValue: function(){
      return this.userId;
    },
    autoform: {
      type: "hidden"
    }
  },
createdAt: {
    type: Date,
    label: "Created at",
    autoValue: function(){
      return new Date();
    },
    autoform: {
      type: "hidden"
    }
  }
});

Announcements.attachSchema(AnnouncementSchema);
