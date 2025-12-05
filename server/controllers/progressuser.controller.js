
// const express = require("express");
// const router = express.Router();

// const Application = require("../models/application");
// const CandidateProfile = require("../models/candidates");

// // helper: map Application doc → shape CandidateProgress.jsx expects
// function mapApplication(appDoc) {
//   const obj = appDoc.toObject ? appDoc.toObject() : appDoc;

//   return {
//     id: obj._id.toString(),           // this is applicationId
//     fullName: obj.candidateName,
//     email: obj.candidateEmail,
//     phone: obj.candidatePhone,
//     appliedOn: obj.appliedOn,
//     jobTitle: obj.jobTitle,
//     overallStatus: obj.overallStatus,
//     currentStage: obj.currentStage,
//     privateNote: obj.privateNote || "",
//     stages: obj.stages || [],
//     activity: obj.activity || [],
//   };
// }

// /**
//  * CANDIDATE VIEW
//  * GET /progressuser/det/:userId
//  *
//  * :userId = the logged-in user's id (what you store in Redux)
//  * Sidebar -> /user/progress/${user.id}
//  * CandidateProgress.jsx -> hits /progressuser/det/:userId
//  */
// router.get("/det/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     if (!userId) {
//       return res.status(400).json({ message: "userId is required" });
//     }

//     // 1) find candidate profile for this userId
//     const candidateProfile = await CandidateProfile.findOne({ userId });
//     if (!candidateProfile) {
//       return res
//         .status(404)
//         .json({ message: "No candidate profile found for this user" });
//     }

//     // 2) find latest application for this candidate
//     const app = await Application.findOne({
//       candidateId: candidateProfile._id,
//     }).sort({ appliedOn: -1 });

//     if (!app) {
//       return res
//         .status(404)
//         .json({ message: "No applications found for this candidate" });
//     }

//     // 3) send mapped data
//     return res.json(mapApplication(app));
//   } catch (err) {
//     console.error("GET /progressuser/det error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

const Application = require("../models/application");
const CandidateProfile = require("../models/candidates");

function mapApplication(appDoc) {
  const obj = appDoc.toObject ? appDoc.toObject() : appDoc;

  return {
    id: obj._id.toString(),
    fullName: obj.candidateName,
    email: obj.candidateEmail,
    phone: obj.candidatePhone,
    appliedOn: obj.appliedOn,
    jobTitle: obj.jobTitle,
    overallStatus: obj.overallStatus,
    currentStage: obj.currentStage,
    privateNote: obj.privateNote || "",
    stages: obj.stages || [],
    activity: obj.activity || [],
  };
}

router.get("/det/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const candidateProfile = await CandidateProfile.findOne({ userId });
    if (!candidateProfile) {
      return res
        .status(404)
        .json({ message: "No candidate profile found for this user" });
    }

    const app = await Application.findOne({
      candidateId: candidateProfile._id,
    }).sort({ appliedOn: -1 });

    if (!app) {
      return res
        .status(404)
        .json({ message: "No applications found for this candidate" });
    }

    return res.json(mapApplication(app));
  } catch (err) {
    console.error("GET /progressuser/det error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
