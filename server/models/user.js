const { mongoose } = require("../db");
const { Schema } = mongoose;
const withId = require("./plugins/withid");

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password_hash: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "candidate"],
      default: "candidate",
    },
    phone: String,
    location: String,
    skills: [String],
    resumePath: String, 
    saved: [
      {
        type: Schema.Types.ObjectId,
        ref: "job",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.plugin(withId);

const User = mongoose.model("user", UserSchema);

module.exports = User;
 