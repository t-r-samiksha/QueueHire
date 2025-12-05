
const { mongoose } = require("../db");
const { Schema } = mongoose;
const withId = require("./plugins/withid");

const InterviewSchema = new Schema(
  {
    applicationId: { type: Schema.Types.ObjectId, ref: "Application" },
    candidateId: { type: Schema.Types.ObjectId, ref: "CandidateProfile" },
    jobId: { type: Schema.Types.ObjectId, ref: "Job" },

    title: String, 
    role: String,

    mode: { type: String, enum: ["remote", "onsite"] },
    joinUrl: String,

    start: Date,
    end: Date,

    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },

    notes: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

InterviewSchema.index({ candidateId: 1, start: 1 });
InterviewSchema.plugin(withId);


const Interview = mongoose.model("Interview", InterviewSchema);

module.exports = Interview;
