import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Feedback = new Mongo.Collection('feedback');

FeedbackSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  email: {
    type: String,
    label: "Email"
  },
  subject: {
    type: String,
    label: "Subject"
  },
  message: {
    type: String,
    label: "Message"
  },
  sentAt: {
    type: Date,
    label: "Created at",
    autoValue: function(){
      return new Date();
    }
  }
});

Feedback.attachSchema(FeedbackSchema);
