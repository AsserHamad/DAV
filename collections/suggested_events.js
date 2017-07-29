import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const SuggestedEvents = new Mongo.Collection('suggested-events');


SuggestedEventSchema = new SimpleSchema({
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
  suggester_id: {
    type: String,
    label: "Suggester's ID"
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

SuggestedEvents.attachSchema(SuggestedEventSchema);
