

// const express = require("express");
// const router = express.Router();

// const Job = require("../models/job");
// const Application = require("../models/application");
// const CandidateProfile = require("../models/candidates");
// const File = require("../models/File");
// const User = require("../models/user");

// // -----------------------------------------------------
// // GET /reports/summary
// // - totalCandidates  -> distinct candidateEmail in Applications
// // - inQueue          -> apps in progress / needs_review
// // - review           -> apps in needs_review
// // - hired            -> sum(job.hired)  (fallback to count of selected apps)
// // -----------------------------------------------------
// router.get("/reports/summary", async (req, res) => {
//   try {
//     const distinctEmails = await Application.distinct("candidateEmail");
//     const totalCandidates = distinctEmails.length;

//     const inQueue = await Application.countDocuments({
//       overallStatus: { $in: ["in_progress", "needs_review"] },
//     });

//     const review = await Application.countDocuments({
//       overallStatus: "needs_review",
//     });

//     // Count selected applications
//     const selected = await Application.countDocuments({
//       overallStatus: "selected",
//     });
//     console.log({ totalCandidates, inQueue, review, selected });
//     res.json({ totalCandidates, inQueue, review, selected });
//   } catch (err) {
//     console.error("GET /reports/summary error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });



// router.get("/uploads/recent", async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit || "3", 10);

//     const apps = await Application.find({})
//       .sort({ appliedOn: -1 })
//       .limit(limit)
//       .select("candidateName jobTitle appliedOn _id candidateEmail")
//       .lean();

//     const items = apps.map((a) => ({
//       id: a._id.toString(),
//       name: a.candidateName || "Unknown",
//       role: a.jobTitle || "Unknown role",
//       time: a.appliedOn?.toISOString() || new Date().toISOString(),
//       avatar: "", // optional future use
//       email: a.candidateEmail
//     }));

//     res.json({ items });
//   } catch (err) {
//     console.error("GET /uploads/recent error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// // -----------------------------------------------------
// // GET /jobs
// // returns: { jobs: [{ id, title, openings, applied, shortlisted, hired }] }
// // -----------------------------------------------------
// router.get("/jobs", async (req, res) => {
//   try {
//     const jobs = await Job.find({})
//       .select("title openings applied shortlisted hired")
//       .lean();

//     const out = jobs.map((j) => ({
//       id: j._id.toString(),
//       title: j.title,
//       openings: j.openings || 0,
//       applied: j.applied || 0,
//       shortlisted: j.shortlisted || 0,
//       hired: j.hired || 0,
//     }));
// console.log(jobs)
//     res.json({ jobs: out });
//   } catch (err) {
//     console.error("GET /jobs error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // -----------------------------------------------------
// // GET /pipeline
// // builds funnel numbers from Application + Job
// // returns: { items: [{ key, label, value }] }
// // -----------------------------------------------------
// router.get("/pipeline", async (req, res) => {
//   try {
//     const applied = await Application.countDocuments({});

//     const screened = await Application.countDocuments({
//       stages: {
//         $elemMatch: {
//           name: "Resume Screen",
//           status: { $in: ["passed", "failed"] },
//         },
//       },
//     });

//     const interviewed = await Application.countDocuments({
//       stages: {
//         $elemMatch: {
//           type: "interview",
//           status: { $in: ["passed", "failed", "scheduled"] },
//         },
//       },
//     });

//     const jobs = await Job.find({}, { hired: 1 }).lean();
//     const hired = jobs.reduce((s, j) => s + (j.hired || 0), 0);

//     const items = [
//       { key: "applied", label: "Applied", value: applied },
//       { key: "screened", label: "Reviewed", value: screened },
//       { key: "interviewed", label: "Interviewed", value: interviewed },
//       { key: "hired", label: "Hired", value: hired },
//     ];

//     res.json({ items });
//   } catch (err) {
//     console.error("GET /pipeline error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // -----------------------------------------------------
// // GET /interviews/upcoming
// // Look for interview stages with status "scheduled" and future date
// // returns: { items: [{ id, candidateName, role, timeISO, avatar, mode, joinUrl }] }
// // -----------------------------------------------------
// router.get("/interviews/upcoming", async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit || "3", 10);
//     const now = new Date();

//     const apps = await Application.find({
//       stages: {
//         $elemMatch: {
//           type: "interview",
//           status: "scheduled",
//           date: { $gt: now },
//         },
//       },
//     })
//       .select("candidateName jobTitle stages")
//       .lean();

//     const allInterviews = [];

//     apps.forEach((app) => {
//       (app.stages || []).forEach((st) => {
//         if (
//           st.type === "interview" &&
//           st.status === "scheduled" &&
//           st.date &&
//           new Date(st.date) > now
//         ) {
//           allInterviews.push({
//             id: `${app._id.toString()}-${st.name}`,
//             candidateName: app.candidateName,
//             role: app.jobTitle,
//             timeISO: st.date,
//             avatar: "",
//             mode: st.mode || "remote",
//             joinUrl: st.joinUrl || "",
//           });
//         }
//       });
//     });

//     allInterviews.sort((a, b) => new Date(a.timeISO) - new Date(b.timeISO));
// // console.log('interviews',allInterviews)
//     res.json({ items: allInterviews.slice(0, limit) });
//   } catch (err) {
//     console.error("GET /interviews/upcoming error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // -----------------------------------------------------
// // GET /skills
// // Aggregate from Job.skills [{ name, freq }]
// // returns: { skills: [{ name, count }] }
// // -----------------------------------------------------
// router.get("/skills", async (req, res) => {
//   try {
//     const jobs = await Job.find({}, { skills: 1 }).lean();
//     const map = new Map();

//     jobs.forEach((job) => {
//       (job.skills || []).forEach((s) => {
//         const key = (s.name || "").trim();
//         if (!key) return;
//         const prev = map.get(key) || 0;
//         map.set(key, prev + (s.freq || 1));
//       });
//     });

//     const skills = Array.from(map.entries()).map(([name, count]) => ({
//       name,
//       count,
//     }));

//     skills.sort((a, b) => b.count - a.count);

//     res.json({ skills });
//   } catch (err) {
//     console.error("GET /skills error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // -----------------------------------------------------
// // GET /candidates
// // Unique candidates from Application collection
// // returns: { items: [{ id, fullName, email, status }], total }
// // -----------------------------------------------------
// router.get("/candidates", async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit || "10", 10);

//     const agg = await Application.aggregate([
//       {
//         $group: {
//           _id: "$candidateEmail",
//           fullName: { $first: "$candidateName" },
//           email: { $first: "$candidateEmail" },
//           latestStatus: { $last: "$overallStatus" },
//         },
//       },
//       { $sort: { fullName: 1 } },
//       { $limit: limit },
//     ]);

//     const items = agg.map((c, idx) => ({
//       id: c._id || `cand_${idx}`,
//       fullName: c.fullName || "Unknown",
//       email: c.email || "",
//       status: c.latestStatus || "in_queue",
//     }));

//     res.json({ items, total: agg.length });
//   } catch (err) {
//     console.error("GET /candidates error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // -----------------------------------------------------
// router.get("/", (req, res) => res.send("QueueHire API OK"));
// // -----------------------------------------------------

// module.exports = router;

const express = require("express");
const router = express.Router();

const Job = require("../models/job");
const Application = require("../models/application");
const CandidateProfile = require("../models/candidates");
const File = require("../models/File");
const User = require("../models/user");

router.get("/reports/summary", async (req, res) => {
  try {
    const distinctEmails = await Application.distinct("candidateEmail");
    const totalCandidates = distinctEmails.length;

    const inQueue = await Application.countDocuments({
      overallStatus: { $in: ["in_progress", "needs_review"] },
    });

    const review = await Application.countDocuments({
      overallStatus: "needs_review",
    });

    const selected = await Application.countDocuments({
      overallStatus: "selected",
    });

    res.json({ totalCandidates, inQueue, review, selected });
  } catch (err) {
    console.error("GET /reports/summary error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/uploads/recent", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "3", 10);

    const apps = await Application.find({})
      .sort({ appliedOn: -1 })
      .limit(limit)
      .select("candidateName jobTitle appliedOn _id candidateEmail")
      .lean();

    const items = apps.map((a) => ({
      id: a._id.toString(),
      name: a.candidateName || "Unknown",
      role: a.jobTitle || "Unknown role",
      time: a.appliedOn?.toISOString() || new Date().toISOString(),
      avatar: "",
      email: a.candidateEmail,
    }));

    res.json({ items });
  } catch (err) {
    console.error("GET /uploads/recent error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find({})
      .select("title openings applied shortlisted hired")
      .lean();

    const out = jobs.map((j) => ({
      id: j._id.toString(),
      title: j.title,
      openings: j.openings || 0,
      applied: j.applied || 0,
      shortlisted: j.shortlisted || 0,
      hired: j.hired || 0,
    }));

    res.json({ jobs: out });
  } catch (err) {
    console.error("GET /jobs error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/pipeline", async (req, res) => {
  try {
    const applied = await Application.countDocuments({});

    const screened = await Application.countDocuments({
      stages: {
        $elemMatch: {
          name: "Resume Screen",
          status: { $in: ["passed", "failed"] },
        },
      },
    });

    const interviewed = await Application.countDocuments({
      stages: {
        $elemMatch: {
          type: "interview",
          status: { $in: ["passed", "failed", "scheduled"] },
        },
      },
    });

    const jobs = await Job.find({}, { hired: 1 }).lean();
    const hired = jobs.reduce((s, j) => s + (j.hired || 0), 0);

    const items = [
      { key: "applied", label: "Applied", value: applied },
      { key: "screened", label: "Reviewed", value: screened },
      { key: "interviewed", label: "Interviewed", value: interviewed },
      { key: "hired", label: "Hired", value: hired },
    ];

    res.json({ items });
  } catch (err) {
    console.error("GET /pipeline error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/interviews/upcoming", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "3", 10);
    const now = new Date();

    const apps = await Application.find({
      stages: {
        $elemMatch: {
          type: "interview",
          status: "scheduled",
          date: { $gt: now },
        },
      },
    })
      .select("candidateName jobTitle stages")
      .lean();

    const allInterviews = [];

    apps.forEach((app) => {
      (app.stages || []).forEach((st) => {
        if (
          st.type === "interview" &&
          st.status === "scheduled" &&
          st.date &&
          new Date(st.date) > now
        ) {
          allInterviews.push({
            id: `${app._id.toString()}-${st.name}`,
            candidateName: app.candidateName,
            role: app.jobTitle,
            timeISO: st.date,
            avatar: "",
            mode: st.mode || "remote",
            joinUrl: st.joinUrl || "",
          });
        }
      });
    });

    allInterviews.sort((a, b) => new Date(a.timeISO) - new Date(b.timeISO));
    res.json({ items: allInterviews.slice(0, limit) });
  } catch (err) {
    console.error("GET /interviews/upcoming error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/skills", async (req, res) => {
  try {
    const jobs = await Job.find({}, { skills: 1 }).lean();
    const map = new Map();

    jobs.forEach((job) => {
      (job.skills || []).forEach((s) => {
        const key = (s.name || "").trim();
        if (!key) return;
        const prev = map.get(key) || 0;
        map.set(key, prev + (s.freq || 1));
      });
    });

    const skills = Array.from(map.entries()).map(([name, count]) => ({
      name,
      count,
    }));

    skills.sort((a, b) => b.count - a.count);

    res.json({ skills });
  } catch (err) {
    console.error("GET /skills error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/candidates", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "10", 10);

    const agg = await Application.aggregate([
      {
        $group: {
          _id: "$candidateEmail",
          fullName: { $first: "$candidateName" },
          email: { $first: "$candidateEmail" },
          latestStatus: { $last: "$overallStatus" },
        },
      },
      { $sort: { fullName: 1 } },
      { $limit: limit },
    ]);

    const items = agg.map((c, idx) => ({
      id: c._id || `cand_${idx}`,
      fullName: c.fullName || "Unknown",
      email: c.email || "",
      status: c.latestStatus || "in_queue",
    }));

    res.json({ items, total: agg.length });
  } catch (err) {
    console.error("GET /candidates error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", (req, res) => res.send("QueueHire API OK"));

module.exports = router;
