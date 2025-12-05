
const { mongoose } = require("../db");
const { Schema } = mongoose;
const withId = require("./plugins/withid");

const CandidateProfileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    about: String,
    skills: [String],

    resumeName: String,
    resumeUrl: String,

    currentPosition: String,
    currentCompany: String,
    status: {
      type: String,
      enum: ["candidate", "employee"],
      default: "candidate",
    },
  },
  { timestamps: true }
);

const CandidateProfile = mongoose.model(
  "CandidateProfile",
  CandidateProfileSchema
);

module.exports = CandidateProfile;
