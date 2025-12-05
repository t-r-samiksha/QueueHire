

const express = require("express");
const router = express.Router();

const User = require("../models/user");
const CandidateProfile = require("../models/candidates");

function mapToProfileResponse(userDoc, profileDoc) {
  const user = userDoc.toObject ? userDoc.toObject() : userDoc;
  const prof = profileDoc && profileDoc.toObject ? profileDoc.toObject() : profileDoc || {};

  return {
    id: user._id.toString(),
    role: user.role,
    fullName: user.fullName || "",
    title: prof.currentPosition || "Candidate",
    email: user.email || "",
    phone: user.phone || "",
    location: user.location || "",
    about: prof.about || "",
    skills:
      Array.isArray(prof.skills) && prof.skills.length > 0
        ? prof.skills
        : user.skills || [],
    resumeName: prof.resumeName || null,
    resumeUrl: prof.resumeUrl || null,
  };
}

router.get("/det/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let profile = await CandidateProfile.findOne({ userId });

    if (!profile) {
      profile = await CandidateProfile.create({
        userId,
        about: "",
        skills: user.skills || [],
        resumeName: null,
        resumeUrl: null,
        currentPosition: "",
        currentCompany: "",
        status: "candidate",
      });
    }

    return res.json(mapToProfileResponse(user, profile));
  } catch (err) {
    console.error("GET /profile/det error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/det/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const {
      fullName,
      title,
      email,
      phone,
      location,
      about,
      skills,
      resumeName,
      resumeUrl,
    } = req.body;

    const userUpdate = {};
    if (fullName !== undefined) userUpdate.fullName = fullName;
    if (email !== undefined) userUpdate.email = email;
    if (phone !== undefined) userUpdate.phone = phone;
    if (location !== undefined) userUpdate.location = location;
    if (Array.isArray(skills)) userUpdate.skills = skills;

    const user = await User.findByIdAndUpdate(userId, userUpdate, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const profileUpdate = {};
    if (about !== undefined) profileUpdate.about = about;
    if (Array.isArray(skills)) profileUpdate.skills = skills;
    if (resumeName !== undefined) profileUpdate.resumeName = resumeName;
    if (resumeUrl !== undefined) profileUpdate.resumeUrl = resumeUrl;
    if (title !== undefined) profileUpdate.currentPosition = title;

    const profile = await CandidateProfile.findOneAndUpdate(
      { userId },
      { $set: profileUpdate },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.json(mapToProfileResponse(user, profile));
  } catch (err) {
    console.error("PUT /profile/det error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
