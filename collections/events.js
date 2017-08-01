import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Events = new Mongo.Collection('events');


EventSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  date: {
    type: Date,
    label: "Date"
  },
  description: {
    type: String,
    label: "Description"
  },
  suggester_email: {
    type: String,
    label: "Suggester's Email",
    optional: true
  },
  attendees: {
    type: Array,
    label: "Attendees"
  },
  'attendees.$':{
    type: String
  },
  supervisor_id: {
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

Events.attachSchema(EventSchema);
