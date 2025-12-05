
const express = require("express");
const router = express.Router();
const Application = require("../models/application");
const User = require('../models/user')

router.get("/user-state", async (req, res) => {
  try {
    const { userId, email } = req.query;
    if (!email) return res.status(400).json({ message: "email required" });

    const apps = await Application.find({
      candidateEmail: email.toLowerCase(),
    }).select("jobId");

    const appliedJobIds = apps.map((a) => a.jobId.toString());
    console.log('appliedJobIds',appliedJobIds)

     const user = await User.findOne({ email: email.toLowerCase() }).select(
      "saved"
    );

    const savedJobIds = (user?.saved || []).map((id) => id.toString());

    res.json({
      applied: appliedJobIds,
      saved: savedJobIds,
    });
  } catch (err) {
    console.error("GET /user-state error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/toggle-save", async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    if (!userId || !jobId) {
      return res
        .status(400)
        .json({ message: "userId and jobId are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!Array.isArray(user.saved)) {
      user.saved = [];
    }

    const exists = user.saved.some(
      (id) => id.toString() === jobId.toString()
    );

    if (exists) {

      user.saved = user.saved.filter(
        (id) => id.toString() !== jobId.toString()
      );
    } else {
      
      user.saved.push(jobId);
    }

    await user.save();

    const savedJobIds = user.saved.map((id) => id.toString());

    return res.json({ saved: savedJobIds });
  } catch (err) {
    console.error("POST /toggle-save error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
