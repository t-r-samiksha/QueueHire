// const mongoose = require("mongoose");
// const withId = require("./plugins/withid");


// const SkillSchema = new mongoose.Schema(
//   {
//     name: String,
//     freq: Number,
//   },
//   { _id: false }
// );

// const JobSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     // company: { type: String, default: "Your Company" },
//     // location: String,
//     openings: { type: Number, default: 1 },
//     level: String,
//     salary: String,      // "₹6L - ₹12L"
//     posted: String,      // you can later switch to Date if you want
//     skills: [SkillSchema],
//     description: String,
//     responsibilities: [String],
//     qualifications: [String],
//     levels: [String],    // pipeline stages
//     logo: String,
//     gradient: String,
//     status: { type: String, enum: ["open", "closed"], default: "open" },

//     applied: { type: Number, default: 0 },
//     shortlisted: { type: Number, default: 0 },
//     hired: { type: Number, default: 0 },
//   },
//   { timestamps: true }
// );
// JobSchema.plugin(withId);
// const Job = mongoose.model("Job", JobSchema);

// module.exports = Job;

const mongoose = require("mongoose");
const withId = require("./plugins/withid");

const SkillSchema = new mongoose.Schema(
  {
    name: String,
    freq: Number,
  },
  { _id: false }
);

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    openings: { type: Number, default: 1 },
    level: String,
    salary: String,
    posted: String,
    skills: [SkillSchema],
    description: String,
    responsibilities: [String],
    qualifications: [String],
    levels: [String],
    logo: String,
    gradient: String,
    status: { type: String, enum: ["open", "closed"], default: "open" },

    applied: { type: Number, default: 0 },
    shortlisted: { type: Number, default: 0 },
    hired: { type: Number, default: 0 },
  },
  { timestamps: true }
);

JobSchema.plugin(withId);

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
