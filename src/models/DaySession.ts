import mongoose, { Document, Model, Schema } from "mongoose";

export interface IDaySession extends Document {
  associate: mongoose.Types.ObjectId;

  startTime: Date;
  endTime?: Date;

  startLatitude: number;
  startLongitude: number;
  startAccuracy?: number | null;

  endLatitude?: number | null;
  endLongitude?: number | null;
  endAccuracy?: number | null;

  totalDistance: number;

  status: "ACTIVE" | "COMPLETED";
}

const DaySessionSchema = new Schema<IDaySession>(
  {
    associate: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
    },

    startLatitude: {
      type: Number,
      required: true,
    },
    startAccuracy: {
  type: Number,
  default: null,
},

    startLongitude: {
      type: Number,
      required: true,
    },

    endAccuracy: {
  type: Number,
  default: null,
},

    endLatitude: {
  type: Number,
  default: null,
},

    endLongitude: Number,

    totalDistance: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "COMPLETED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

const DaySession: Model<IDaySession> =
  mongoose.models.DaySession ||
  mongoose.model<IDaySession>("DaySession", DaySessionSchema);

export default DaySession;