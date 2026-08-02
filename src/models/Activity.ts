import mongoose, { Document, Model, Schema } from "mongoose";

export interface IActivity extends Document {
  session: mongoose.Types.ObjectId;
  associate: mongoose.Types.ObjectId;
  lead: mongoose.Types.ObjectId;
  activityType: string;

  notes: string;

  latitude: number;
  longitude: number;

  accuracy?: number;

  loggedAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    session: {
      type: Schema.Types.ObjectId,
      ref: "DaySession",
      required: true,
    },

    associate: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    lead: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },
    activityType: {
  type: String,
  default: "IN_PERSON_MEETING",
},

    notes: {
      type: String,
      required: true,
      trim: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    accuracy: {
      type: Number,
      default: null,
    },

    loggedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Activity: Model<IActivity> =
  mongoose.models.Activity ||
  mongoose.model<IActivity>("Activity", ActivitySchema);

export default Activity;