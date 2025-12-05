// // models/Application.js
// const { mongoose } = require("../db");
// const { Schema } = mongoose;
// const withId = require("./plugins/withid");

// const StageSchema = new Schema(
//   {
//     name: String, // "Online coding"
//     type: String, // "screen", "coding", "interview", "assignment", etc.
//     status: String, // "pending", "scheduled", "submitted", "passed", "failed"
//     date: Date,
//     score: Number,
//     notes: String,
//   },
//   { _id: false }
// );

// const ActivitySchema = new Schema(
//   {
//     title: String,
//     time: { type: Date, default: Date.now },
//   },
//   { _id: false }
// );

// const ApplicationSchema = new Schema(
//   {
//     jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
//     candidateId: {
//       type: Schema.Types.ObjectId,
//       ref: "CandidateProfile",
//       required: true,
//     },

//     candidateName: String,
//     candidateEmail: String,
//     candidatePhone: String,

//     appliedOn: { type: Date, default: Date.now },
//     jobTitle: String,

//     overallStatus: {
//       type: String,
//       enum: ["selected", "rejected", "in_progress", "needs_review"],
//       default: "in_progress",
//     },
//     currentStage: String,
//     privateNote: String,

//     stages: [StageSchema],
//     activity: [ActivitySchema],
//   },
//   { timestamps: true }
// );

// // useful indexes
// ApplicationSchema.index({ jobId: 1 });
// ApplicationSchema.index({ candidateId: 1 });
// ApplicationSchema.index({ overallStatus: 1 });

// ApplicationSchema.plugin(withId);

// const Application = mongoose.model("Application", ApplicationSchema);

// module.exports = Application;


const { mongoose } = require("../db");
const { Schema } = mongoose;
const withId = require("./plugins/withid");

const StageSchema = new Schema(
  {
    name: String,
    type: String,
    status: String,
    date: Date,
    score: Number,
    notes: String,
  },
  { _id: false }
);

const ActivitySchema = new Schema(
  {
    title: String,
    time: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ApplicationSchema = new Schema(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    candidateId: { type: Schema.Types.ObjectId, ref: "CandidateProfile", required: true },

    candidateName: String,
    candidateEmail: String,
    candidatePhone: String,

    appliedOn: { type: Date, default: Date.now },
    jobTitle: String,

    overallStatus: {
      type: String,
      enum: ["selected", "rejected", "in_progress", "needs_review"],
      default: "in_progress",
    },

    currentStage: String,
    privateNote: String,

    stages: [StageSchema],
    activity: [ActivitySchema],
  },
  { timestamps: true }
);

ApplicationSchema.index({ jobId: 1 });
ApplicationSchema.index({ candidateId: 1 });
ApplicationSchema.index({ overallStatus: 1 });

ApplicationSchema.plugin(withId);

const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;
