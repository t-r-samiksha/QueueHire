

const express = require("express");
const router = express.Router();

const Job = require("../models/job"); 

router.get("/det", async (req, res) => {
  try {
    const jobs = await Job.find().lean();
    console.log(jobs)
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
