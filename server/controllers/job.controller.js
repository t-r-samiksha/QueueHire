

const express = require("express");
const router = express.Router();
const Job = require("../models/job");

router.get("/det", async (req, res) => {
  try {
    const docs = await Job.find().lean();
    const jobs = docs.map(({ _id, __v, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const payload = req.body;

    const doc = await Job.create({
      title: payload.title,
      openings: payload.openings,
      level: payload.level,
      salary: payload.salary,
      posted: payload.posted || "just now",
      skills: payload.skills || [],
      description: payload.description,
      responsibilities: payload.responsibilities || [],
      qualifications: payload.qualifications || [],
      levels: payload.levels || [],
      logo: payload.logo,
      gradient: payload.gradient,
    });

    const { _id, __v, ...rest } = doc.toObject();
    console.log("job created", rest);
    res.status(201).json({ id: _id.toString(), ...rest });
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(500).json({ error: "could not create job" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    if (payload.openings !== undefined && Number(payload.openings) <= 0) {
      await Job.findByIdAndDelete(id);
      return res.json({ deleted: true, id });
    }

    const doc = await Job.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return res.status(404).json({ error: "job not found" });
    }

    const { _id, __v, ...rest } = doc.toObject();
    res.json({ id: _id.toString(), ...rest });
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(500).json({ error: "could not update job" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Job.findByIdAndDelete(id);
    res.json({ ok: true, id });
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).json({ error: "could not delete job" });
  }
});

module.exports = router;
