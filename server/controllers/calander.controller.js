

// // controllers/calendar.controller.js
// const express = require("express");
// const router = express.Router();

// const Application = require("../models/application");

// // Helper to pick a nice color based on stage status
// function pickColorFromStage(stage) {
//   const status = stage.status || "pending";

//   if (status === "scheduled") {
//     return "linear-gradient(135deg,#3b82f6,#06b6d4)"; // blue
//   }
//   if (status === "passed") {
//     return "linear-gradient(135deg,#10b981,#22c55e)"; // green
//   }
//   if (status === "failed") {
//     return "linear-gradient(135deg,#f97316,#ef4444)"; // red/orange
//   }
//   return "linear-gradient(135deg,#8b5cf6,#ec4899)"; // default purple/pink
// }

// /**
//  * GET /calendar/data
//  * Build calendar events from Application.stages
//  * Optional query: ?from=2025-01-01&to=2025-12-31
//  */
// router.get("/data", async (req, res) => {
//   try {
//     const now = new Date();

//     // default range: 1 week back to 60 days ahead
//     const from = req.query.from
//       ? new Date(req.query.from)
//       : new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

//     const to = req.query.to
//       ? new Date(req.query.to)
//       : new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);

//     // Find applications that have at least one interview stage in this range
//     const apps = await Application.find({
//       stages: {
//         $elemMatch: {
//           type: "interview",
//           date: { $gte: from, $lte: to },
//         },
//       },
//     })
//       .select("candidateName jobTitle stages")
//       .lean();

//     const events = [];

//     apps.forEach((app) => {
//       (app.stages || []).forEach((st, idx) => {
//         if (st.type !== "interview" || !st.date) return;

//         const start = new Date(st.date);
//         // extra guard in case some stages are outside the range
//         if (start < from || start > to) return;

//         const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 mins
//         const color = pickColorFromStage(st);

//         events.push({
//           id: `${app._id.toString()}-${idx}`,
//           title: app.candidateName || "Interview",
//           role: app.jobTitle || "Interview",
//           start,
//           end,
//           color,
//         });
//       });
//     });

//     res.json(events);
 
//   } catch (err) {
//     console.error("GET /calendar/data error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Application = require("../models/application");

function pickColorFromStage(stage) {
  const status = stage.status || "pending";

  if (status === "scheduled") {
    return "linear-gradient(135deg,#3b82f6,#06b6d4)";
  }
  if (status === "passed") {
    return "linear-gradient(135deg,#10b981,#22c55e)";
  }
  if (status === "failed") {
    return "linear-gradient(135deg,#f97316,#ef4444)";
  }
  return "linear-gradient(135deg,#8b5cf6,#ec4899)";
}

router.get("/data", async (req, res) => {
  try {
    const now = new Date();

    const from = req.query.from
      ? new Date(req.query.from)
      : new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const to = req.query.to
      ? new Date(req.query.to)
      : new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);

    const apps = await Application.find({
      stages: {
        $elemMatch: {
          type: "interview",
          date: { $gte: from, $lte: to },
        },
      },
    })
      .select("candidateName jobTitle stages")
      .lean();

    const events = [];

    apps.forEach((app) => {
      (app.stages || []).forEach((st, idx) => {
        if (st.type !== "interview" || !st.date) return;

        const start = new Date(st.date);
        if (start < from || start > to) return;

        const end = new Date(start.getTime() + 30 * 60 * 1000);
        const color = pickColorFromStage(st);

        events.push({
          id: `${app._id.toString()}-${idx}`,
          title: app.candidateName || "Interview",
          role: app.jobTitle || "Interview",
          start,
          end,
          color,
        });
      });
    });

    res.json(events);
  } catch (err) {
    console.error("GET /calendar/data error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
