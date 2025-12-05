
const bcrypt = require("bcryptjs");
const User = require('../models/user'); 

async function createUser({
  fullName = "",
  email,
  password,
  role = "candidate",
  phone = "",
  location = "",
  skills = "",
}) {
  const normalizedEmail = (email || "").toLowerCase();

  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) {
    throw new Error("Email already in use");
  }

  const password_hash = await bcrypt.hash(password, 10);

  const doc = await User.create({
    fullName,
    email: normalizedEmail,
    password_hash,
    role,
    phone,
    location,
    skills,
  });

  const publicUser = {
    id: doc._id.toString(),  
    fullName: doc.fullName,
    email: doc.email,
    role: doc.role,
    phone: doc.phone,
    location: doc.location,
    skills: doc.skills,
  };

  return publicUser;
}

async function findByEmail(email) {
  const normalizedEmail = (email || "").toLowerCase();
  return User.findOne({ email: normalizedEmail }).exec();
}

async function findById(id) {
  const doc = await User.findById(id).exec();
  if (!doc) return null;
  const { password_hash, ...rest } = doc.toObject();
  return { ...rest, id: doc._id.toString() };
}

module.exports = { createUser, findByEmail };

