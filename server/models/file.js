
const { mongoose } = require("../db");
const { Schema } = mongoose;
const withId = require("./plugins/withid");

const FileSchema = new Schema(
  {
    ownerUserId: { type: Schema.Types.ObjectId, ref: "User" },
    candidateId: { type: Schema.Types.ObjectId, ref: "CandidateProfile" },
    applicationId: { type: Schema.Types.ObjectId, ref: "Application" },

    type: {
      type: String,
      enum: ["resume", "portfolio", "other"],
      default: "resume",
    },

    originalName: String,
    path: String,
    mimeType: String,
    sizeBytes: Number,

    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

FileSchema.plugin(withId);

const File = mongoose.model("File", FileSchema);

module.exports = File;
