

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const Job = require("../models/job");
const { resumeQueue } = require("../queue/resumeQueue");

const router = express.Router();

const uploadFolder = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes("pdf")) {
      return cb(new Error("Only PDF files allowed"));
    }
    cb(null, true);
  },
});


router.post("/apply", upload.single("resume"), async (req, res) => {
  try {
    const { jobId, userId, name, email, phone } = req.body;

    if (!jobId || jobId === "undefined") {
      return res.status(400).json({ msg: "jobId is required" });
    }

    if (!req.file) {
      return res.status(400).json({ msg: "Resume PDF not uploaded" });
    }

    const job = await Job.findById(jobId).lean();
    if (!job) {
      return res.status(404).json({ msg: "Job not found", jobId });
    }

    console.log("\n========== USER APPLIED (QUEUED) ==========");
    console.log("Job:", jobId, "-", job.title);
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Resume saved at:", req.file.path);
    console.log("==========================================\n");

    const bullJob = await resumeQueue.add("resume-processing", {
      jobId,
      userId: userId || null,
      name,
      email,
      phone,
      resumePath: req.file.path,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      sizeBytes: req.file.size,
    });

    

    return res.json({
      success: true,
      msg: "Application queued for processing",
      queueJobId: bullJob.id,
    });
  } catch (err) {
    console.error("QUEUE /apply ERROR:", err);
    return res.status(500).json({ msg: "Server error", error: String(err) });
  }
});

module.exports = router;
