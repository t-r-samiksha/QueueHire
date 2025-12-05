

// // controllers/candidates.controller.js
// const express = require("express");
// const router = express.Router();

// const Application = require("../models/application");

// // map Application doc -> row expected by Candidates.jsx
// function mapAppToRow(appDoc) {
//   const obj = appDoc.toObject ? appDoc.toObject() : appDoc;

//   // pick a score: resume screen if present, otherwise first stage
//   const stages = obj.stages || [];
//   const resumeStage =
//     stages.find((s) => s.type === "screen") ||
//     stages[0] ||
//     null;

//   const score = resumeStage && typeof resumeStage.score === "number"
//     ? resumeStage.score
//     : null;

//   // map overallStatus -> ui status ("selected" | "rejected" | "needs_review")
//   let status;
//   switch (obj.overallStatus) {
//     case "hired":
//       status = 'hired';
//       break;
//     case "selected":
//       status = "selected";
//       break;
//     case "rejected":
//       status = "rejected";
//       break;
//     case "needs_review":
//       status = "needs_review";
//       break;
//     case "in_progress":
//       status = "in_progress";
//       break;
//     default:
//       // treat null / anything else as "needs_review"
//       status = "needs_review";
//       break;
//   }

//   console.log(status)

//   return {
//     id: obj._id.toString(),           // 👉 this is the Application id
//     fullName: obj.candidateName,
//     email: obj.candidateEmail,
//     score: score ?? 0,                // your UI assumes number, so default 0
//     status,
//     avatar: "",                       // you can add later
//     position: obj.jobTitle || "",     // shows in "position" column
//   };
// }

// // GET /candidates/det  → list all applications as candidate rows
// router.get("/det", async (req, res) => {
//   try {
//     const apps = await Application
//       .find({})
//       .sort({ appliedOn: -1 })       // newest first
//       .limit(200);                   // safety cap
// console.log('candidates application fom app',apps)
//     const rows = apps.map(mapAppToRow);
//     console.log(rows)
//     return res.json(rows);
//   } catch (err) {
//     console.error("GET /candidates/det error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Application = require("../models/application");

function mapAppToRow(appDoc) {
  const obj = appDoc.toObject ? appDoc.toObject() : appDoc;

  const stages = obj.stages || [];
  const resumeStage =
    stages.find((s) => s.type === "screen") ||
    stages[0] ||
    null;

  const score =
    resumeStage && typeof resumeStage.score === "number"
      ? resumeStage.score
      : null;

  let status;
  switch (obj.overallStatus) {
    case "hired":
      status = "hired";
      break;
    case "selected":
      status = "selected";
      break;
    case "rejected":
      status = "rejected";
      break;
    case "needs_review":
      status = "needs_review";
      break;
    case "in_progress":
      status = "in_progress";
      break;
    default:
      status = "needs_review";
      break;
  }

  return {
    id: obj._id.toString(),
    fullName: obj.candidateName,
    email: obj.candidateEmail,
    score: score ?? 0,
    status,
    avatar: "",
    position: obj.jobTitle || "",
  };
}

router.get("/det", async (req, res) => {
  try {
    const apps = await Application.find({})
      .sort({ appliedOn: -1 })
      .limit(200);

    const rows = apps.map(mapAppToRow);
    return res.json(rows);
  } catch (err) {
    console.error("GET /candidates/det error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
