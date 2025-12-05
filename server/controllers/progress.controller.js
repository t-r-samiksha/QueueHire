// // // const express = require('express')
// // // const router = express.Router()

// // // const FULL_CANDIDATES = [
// // //   {
// // //     id: "c1",
// // //     fullName: "Arjun Patel",
// // //     email: "arjun@example.com",
// // //     phone: "+91 98760 11111",
// // //     appliedOn: "2025-06-01T09:00:00Z",
// // //     jobTitle: "Frontend Developer",
// // //     overallStatus: "selected",
// // //     currentStage: "Technical interview",
// // //     privateNote: "",
// // //     stages: [
// // //       {
// // //         name: "Resume Screen",
// // //         type: "screen",
// // //         status: "passed",
// // //         date: "2025-06-01T09:00:00Z",
// // //         score: 82,
// // //         notes: "Strong React experience",
// // //       },
// // //       {
// // //         name: "Online coding",
// // //         type: "coding",
// // //         status: "passed",
// // //         date: "2025-06-03T11:00:00Z",
// // //         score: 85,
// // //         notes: "Clean code, good logic",
// // //       },
// // //       {
// // //         name: "Technical interview",
// // //         type: "interview",
// // //         status: "passed",
// // //         date: "2025-06-05T14:00:00Z",
// // //         score: 90,
// // //         notes: "Excellent fundamentals",
// // //       }
// // //     ],
// // //     activity: [
// // //       { title: "Resume uploaded", time: "2025-06-01T09:01:00Z" },
// // //       { title: "Coding round completed", time: "2025-06-03T12:00:00Z" },
// // //       { title: "Interview completed", time: "2025-06-05T15:30:00Z" }
// // //     ],
// // //   },

// // //   {
// // //     id: "c2",
// // //     fullName: "Priya Sharma",
// // //     email: "priya@example.com",
// // //     phone: "+91 98760 22222",
// // //     appliedOn: "2025-05-29T10:00:00Z",
// // //     jobTitle: "UI/UX Designer",
// // //     overallStatus: "selected",
// // //     currentStage: "Portfolio review",
// // //     privateNote: "",
// // //     stages: [
// // //       {
// // //         name: "Resume Screen",
// // //         type: "screen",
// // //         status: "passed",
// // //         date: "2025-05-29T10:00:00Z",
// // //         score: 75,
// // //         notes: "Clean resume",
// // //       },
// // //       {
// // //         name: "Portfolio review",
// // //         type: "review",
// // //         status: "passed",
// // //         date: "2025-05-31T14:00:00Z",
// // //         score: 78,
// // //         notes: "Good UI sense",
// // //       },
// // //       {
// // //         name: "Design interview",
// // //         type: "interview",
// // //         status: "passed",
// // //         date: "2025-06-02T15:00:00Z",
// // //         score: 82,
// // //         notes: "Strong design thinking",
// // //       }
// // //     ],
// // //     activity: [
// // //       { title: "Portfolio uploaded", time: "2025-05-29T10:30:00Z" },
// // //       { title: "Design interview done", time: "2025-06-02T16:15:00Z" }
// // //     ]
// // //   },

// // //   {
// // //     id: "c3",
// // //     fullName: "Aman Singh",
// // //     email: "aman@example.com",
// // //     phone: "+91 98760 33333",
// // //     appliedOn: "2025-06-03T12:00:00Z",
// // //     jobTitle: "Data Analyst",
// // //     overallStatus: "needs_review",
// // //     currentStage: "Online coding",
// // //     privateNote: "",
// // //     stages: [
// // //       {
// // //         name: "Resume Screen",
// // //         type: "screen",
// // //         status: "passed",
// // //         date: "2025-06-03T12:00:00Z",
// // //         score: 70,
// // //         notes: "Good SQL knowledge",
// // //       },
// // //       {
// // //         name: "Online coding",
// // //         type: "coding",
// // //         status: "submitted",
// // //         date: "2025-06-04T12:00:00Z",
// // //         score: 67,
// // //         notes: "Needs team to review",
// // //       },
// // //       {
// // //         name: "Technical interview",
// // //         type: "interview",
// // //         status: "pending",
// // //         date: null,
// // //         score: null,
// // //         notes: "",
// // //       }
// // //     ],
// // //     activity: [
// // //       { title: "Coding test submitted", time: "2025-06-04T12:40:00Z" }
// // //     ]
// // //   },

// // //   {
// // //     id: "c4",
// // //     fullName: "Neha Verma",
// // //     email: "neha@example.com",
// // //     phone: "+91 98760 44444",
// // //     appliedOn: "2025-05-28T09:30:00Z",
// // //     jobTitle: "Backend Engineer",
// // //     overallStatus: "selected",
// // //     currentStage: "HR interview",
// // //     privateNote: "",
// // //     stages: [
// // //       {
// // //         name: "Resume Screen",
// // //         type: "screen",
// // //         status: "passed",
// // //         date: "2025-05-28T09:30:00Z",
// // //         score: 88,
// // //         notes: "Strong Node.js experience",
// // //       },
// // //       {
// // //         name: "Coding round",
// // //         type: "coding",
// // //         status: "passed",
// // //         date: "2025-05-29T15:00:00Z",
// // //         score: 92,
// // //         notes: "Excellent performance",
// // //       },
// // //       {
// // //         name: "Technical interview",
// // //         type: "interview",
// // //         status: "passed",
// // //         date: "2025-05-31T13:00:00Z",
// // //         score: 89,
// // //         notes: "Strong backend architecture knowledge",
// // //       },
// // //       {
// // //         name: "HR interview",
// // //         type: "interview",
// // //         status: "scheduled",
// // //         date: "2025-06-06T10:00:00Z",
// // //         score: null,
// // //         notes: "",
// // //       }
// // //     ],
// // //     activity: [
// // //       { title: "Technical interview completed", time: "2025-05-31T15:00:00Z" }
// // //     ]
// // //   },

// // //   {
// // //     id: "c5",
// // //     fullName: "Rohan Das",
// // //     email: "rohan@example.com",
// // //     phone: "+91 98760 55555",
// // //     appliedOn: "2025-06-02T11:00:00Z",
// // //     jobTitle: "Frontend Developer",
// // //     overallStatus: "rejected",
// // //     currentStage: "Application closed",
// // //     privateNote: "Weak coding round",
// // //     stages: [
// // //       {
// // //         name: "Resume Screen",
// // //         type: "screen",
// // //         status: "passed",
// // //         date: "2025-06-02T11:00:00Z",
// // //         score: 75,
// // //         notes: "",
// // //       },
// // //       {
// // //         name: "Online coding",
// // //         type: "coding",
// // //         status: "failed",
// // //         date: "2025-06-03T09:00:00Z",
// // //         score: 74,
// // //         notes: "Logic issues",
// // //       }
// // //     ],
// // //     activity: [
// // //       { title: "Application rejected", time: "2025-06-03T12:00:00Z" }
// // //     ]
// // //   },

// // //   {
// // //     id: "c6",
// // //     fullName: "Ananya Gupta",
// // //     email: "ananya@example.com",
// // //     phone: "+91 98760 66666",
// // //     appliedOn: "2025-05-30T08:00:00Z",
// // //     jobTitle: "Product Manager",
// // //     overallStatus: "selected",
// // //     currentStage: "Final round",
// // //     privateNote: "",
// // //     stages: [
// // //       {
// // //         name: "Resume Screen",
// // //         type: "screen",
// // //         status: "passed",
// // //         date: "2025-05-30T08:00:00Z",
// // //         score: 85,
// // //         notes: "Strong PM background",
// // //       },
// // //       {
// // //         name: "Case Study",
// // //         type: "assignment",
// // //         status: "passed",
// // //         date: "2025-06-01T10:00:00Z",
// // //         score: 88,
// // //         notes: "Very strong assignment",
// // //       },
// // //       {
// // //         name: "Panel interview",
// // //         type: "interview",
// // //         status: "passed",
// // //         date: "2025-06-03T14:00:00Z",
// // //         score: 90,
// // //         notes: "Excellent leadership thinking",
// // //       }
// // //     ],
// // //     activity: [
// // //       { title: "Case study completed", time: "2025-06-01T11:00:00Z" },
// // //       { title: "Panel interview completed", time: "2025-06-03T16:00:00Z" }
// // //     ]
// // //   },

// // //   {
// // //     id: "c7",
// // //     fullName: "Rahul Joshi",
// // //     email: "rahul@example.com",
// // //     phone: "+91 98760 77777",
// // //     appliedOn: "2025-05-29T12:00:00Z",
// // //     jobTitle: "DevOps Engineer",
// // //     overallStatus: "rejected",
// // //     currentStage: "Application closed",
// // //     privateNote: "Failed interview",
// // //     stages: [
// // //       {
// // //         name: "Resume Screen",
// // //         type: "screen",
// // //         status: "passed",
// // //         date: "2025-05-29T12:00:00Z",
// // //         score: 72,
// // //         notes: "",
// // //       },
// // //       {
// // //         name: "Technical interview",
// // //         type: "interview",
// // //         status: "failed",
// // //         date: "2025-05-31T10:00:00Z",
// // //         score: 70,
// // //         notes: "Weak Linux fundamentals",
// // //       }
// // //     ],
// // //     activity: [
// // //       { title: "Application rejected", time: "2025-05-31T13:00:00Z" }
// // //     ]
// // //   }
// // // ];

// // // router.get("/det/:id", (req, res) => {
// // //   const { id } = req.params;

// // //   if (!id) {
// // //     return res.status(400).json({ message: "ID is required" });
// // //   }

// // //   const candidate = FULL_CANDIDATES.find(c => c.id === id);

// // //   if (!candidate) {
// // //     return res.status(404).json({ message: "Candidate not found" });
// // //   }

// // //   res.json(candidate);
// // // });

// // // router.put()

// // // module.exports = router

// // const express = require('express')
// // const router = express.Router()

// // const FULL_CANDIDATES = [
// //   {
// //     id: "c1",
// //     fullName: "Arjun Patel",
// //     email: "arjun@example.com",
// //     phone: "+91 98760 11111",
// //     appliedOn: "2025-06-01T09:00:00Z",
// //     jobTitle: "Frontend Developer",
// //     overallStatus: "selected",
// //     currentStage: "Technical interview",
// //     privateNote: "",
// //     stages: [
// //       {
// //         name: "Resume Screen",
// //         type: "screen",
// //         status: "passed",
// //         date: "2025-06-01T09:00:00Z",
// //         score: 82,
// //         notes: "Strong React experience",
// //       },
// //       {
// //         name: "Online coding",
// //         type: "coding",
// //         status: "passed",
// //         date: "2025-06-03T11:00:00Z",
// //         score: 85,
// //         notes: "Clean code, good logic",
// //       },
// //       {
// //         name: "Technical interview",
// //         type: "interview",
// //         status: "passed",
// //         date: "2025-06-05T14:00:00Z",
// //         score: 90,
// //         notes: "Excellent fundamentals",
// //       }
// //     ],
// //     activity: [
// //       { title: "Resume uploaded", time: "2025-06-01T09:01:00Z" },
// //       { title: "Coding round completed", time: "2025-06-03T12:00:00Z" },
// //       { title: "Interview completed", time: "2025-06-05T15:30:00Z" }
// //     ],
// //   },
// //   {
// //     id: "c2",
// //     fullName: "Priya Sharma",
// //     email: "priya@example.com",
// //     phone: "+91 98760 22222",
// //     appliedOn: "2025-05-29T10:00:00Z",
// //     jobTitle: "UI/UX Designer",
// //     overallStatus: "selected",
// //     currentStage: "Portfolio review",
// //     privateNote: "",
// //     stages: [
// //       {
// //         name: "Resume Screen",
// //         type: "screen",
// //         status: "passed",
// //         date: "2025-05-29T10:00:00Z",
// //         score: 75,
// //         notes: "Clean resume",
// //       },
// //       {
// //         name: "Portfolio review",
// //         type: "review",
// //         status: "passed",
// //         date: "2025-05-31T14:00:00Z",
// //         score: 78,
// //         notes: "Good UI sense",
// //       },
// //       {
// //         name: "Design interview",
// //         type: "interview",
// //         status: "passed",
// //         date: "2025-06-02T15:00:00Z",
// //         score: 82,
// //         notes: "Strong design thinking",
// //       }
// //     ],
// //     activity: [
// //       { title: "Portfolio uploaded", time: "2025-05-29T10:30:00Z" },
// //       { title: "Design interview done", time: "2025-06-02T16:15:00Z" }
// //     ]
// //   },
// //   {
// //     id: "c3",
// //     fullName: "Aman Singh",
// //     email: "aman@example.com",
// //     phone: "+91 98760 33333",
// //     appliedOn: "2025-06-03T12:00:00Z",
// //     jobTitle: "Data Analyst",
// //     overallStatus: "needs_review",
// //     currentStage: "Online coding",
// //     privateNote: "",
// //     stages: [
// //       {
// //         name: "Resume Screen",
// //         type: "screen",
// //         status: "passed",
// //         date: "2025-06-03T12:00:00Z",
// //         score: 70,
// //         notes: "Good SQL knowledge",
// //       },
// //       {
// //         name: "Online coding",
// //         type: "coding",
// //         status: "submitted",
// //         date: "2025-06-04T12:00:00Z",
// //         score: 67,
// //         notes: "Needs team to review",
// //       },
// //       {
// //         name: "Technical interview",
// //         type: "interview",
// //         status: "pending",
// //         date: null,
// //         score: null,
// //         notes: "",
// //       }
// //     ],
// //     activity: [
// //       { title: "Coding test submitted", time: "2025-06-04T12:40:00Z" }
// //     ]
// //   },
// //   {
// //     id: "c4",
// //     fullName: "Neha Verma",
// //     email: "neha@example.com",
// //     phone: "+91 98760 44444",
// //     appliedOn: "2025-05-28T09:30:00Z",
// //     jobTitle: "Backend Engineer",
// //     overallStatus: "selected",
// //     currentStage: "HR interview",
// //     privateNote: "",
// //     stages: [
// //       {
// //         name: "Resume Screen",
// //         type: "screen",
// //         status: "passed",
// //         date: "2025-05-28T09:30:00Z",
// //         score: 88,
// //         notes: "Strong Node.js experience",
// //       },
// //       {
// //         name: "Coding round",
// //         type: "coding",
// //         status: "passed",
// //         date: "2025-05-29T15:00:00Z",
// //         score: 92,
// //         notes: "Excellent performance",
// //       },
// //       {
// //         name: "Technical interview",
// //         type: "interview",
// //         status: "passed",
// //         date: "2025-05-31T13:00:00Z",
// //         score: 89,
// //         notes: "Strong backend architecture knowledge",
// //       },
// //       {
// //         name: "HR interview",
// //         type: "interview",
// //         status: "scheduled",
// //         date: "2025-06-06T10:00:00Z",
// //         score: null,
// //         notes: "",
// //       }
// //     ],
// //     activity: [
// //       { title: "Technical interview completed", time: "2025-05-31T15:00:00Z" }
// //     ]
// //   },
// //   {
// //     id: "c5",
// //     fullName: "Rohan Das",
// //     email: "rohan@example.com",
// //     phone: "+91 98760 55555",
// //     appliedOn: "2025-06-02T11:00:00Z",
// //     jobTitle: "Frontend Developer",
// //     overallStatus: "rejected",
// //     currentStage: "Application closed",
// //     privateNote: "Weak coding round",
// //     stages: [
// //       {
// //         name: "Resume Screen",
// //         type: "screen",
// //         status: "passed",
// //         date: "2025-06-02T11:00:00Z",
// //         score: 75,
// //         notes: "",
// //       },
// //       {
// //         name: "Online coding",
// //         type: "coding",
// //         status: "failed",
// //         date: "2025-06-03T09:00:00Z",
// //         score: 74,
// //         notes: "Logic issues",
// //       }
// //     ],
// //     activity: [
// //       { title: "Application rejected", time: "2025-06-03T12:00:00Z" }
// //     ]
// //   },
// //   {
// //     id: "c6",
// //     fullName: "Ananya Gupta",
// //     email: "ananya@example.com",
// //     phone: "+91 98760 66666",
// //     appliedOn: "2025-05-30T08:00:00Z",
// //     jobTitle: "Product Manager",
// //     overallStatus: "selected",
// //     currentStage: "Final round",
// //     privateNote: "",
// //     stages: [
// //       {
// //         name: "Resume Screen",
// //         type: "screen",
// //         status: "passed",
// //         date: "2025-05-30T08:00:00Z",
// //         score: 85,
// //         notes: "Strong PM background",
// //       },
// //       {
// //         name: "Case Study",
// //         type: "assignment",
// //         status: "passed",
// //         date: "2025-06-01T10:00:00Z",
// //         score: 88,
// //         notes: "Very strong assignment",
// //       },
// //       {
// //         name: "Panel interview",
// //         type: "interview",
// //         status: "passed",
// //         date: "2025-06-03T14:00:00Z",
// //         score: 90,
// //         notes: "Excellent leadership thinking",
// //       }
// //     ],
// //     activity: [
// //       { title: "Case study completed", time: "2025-06-01T11:00:00Z" },
// //       { title: "Panel interview completed", time: "2025-06-03T16:00:00Z" }
// //     ]
// //   },
// //   {
// //     id: "c7",
// //     fullName: "Rahul Joshi",
// //     email: "rahul@example.com",
// //     phone: "+91 98760 77777",
// //     appliedOn: "2025-05-29T12:00:00Z",
// //     jobTitle: "DevOps Engineer",
// //     overallStatus: "rejected",
// //     currentStage: "Application closed",
// //     privateNote: "Failed interview",
// //     stages: [
// //       {
// //         name: "Resume Screen",
// //         type: "screen",
// //         status: "passed",
// //         date: "2025-05-29T12:00:00Z",
// //         score: 72,
// //         notes: "",
// //       },
// //       {
// //         name: "Technical interview",
// //         type: "interview",
// //         status: "failed",
// //         date: "2025-05-31T10:00:00Z",
// //         score: 70,
// //         notes: "Weak Linux fundamentals",
// //       }
// //     ],
// //     activity: [
// //       { title: "Application rejected", time: "2025-05-31T13:00:00Z" }
// //     ]
// //   }
// // ]

// // router.get("/det/:id", (req, res) => {
// //   const { id } = req.params

// //   if (!id) {
// //     return res.status(400).json({ message: "ID is required" })
// //   }

// //   const candidate = FULL_CANDIDATES.find(c => c.id === id)

// //   if (!candidate) {
// //     return res.status(404).json({ message: "Candidate not found" })
// //   }

// //   res.json(candidate)
// // })

// // router.put("/det/:id", (req, res) => {
// //   const { id } = req.params
// //   const payload = req.body

// //   if (!id) {
// //     return res.status(400).json({ message: "ID is required" })
// //   }

// //   const idx = FULL_CANDIDATES.findIndex(c => c.id === id)

// //   if (idx === -1) {
// //     return res.status(404).json({ message: "Candidate not found" })
// //   }

// //   if (payload && payload.id && payload.id !== id) {
// //     return res.status(400).json({ message: "Payload id mismatch" })
// //   }

// //   const existing = FULL_CANDIDATES[idx]
// //   const updated = { ...existing, ...payload, id: existing.id }

// //   FULL_CANDIDATES[idx] = updated

// //   console.log(updated )
// //   res.json(updated)
// // })

// // module.exports = router

// // controllers/progress.controller.js
// const express = require("express");
// const router = express.Router();
// const Application = require("../models/application");
// const Job = require("../models/job");

// const { sendMail } = require("../mail/sendMail");

// // Utility: map Application doc -> shape expected by frontend
// function mapApplication(appDoc) {
//   const obj = appDoc.toObject ? appDoc.toObject() : appDoc;

//   return {
//     id: obj._id.toString(),
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

// // ---------- ADMIN: GET /progress/det/:id ----------
// router.get("/det/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       return res.status(400).json({ message: "ID is required" });
//     }

//     const app = await Application.findById(id);
//     if (!app) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     return res.json(mapApplication(app));
//   } catch (err) {
//     console.error("GET /progress/det error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// // ---------- CANDIDATE: GET /progressuser/det/:id ----------
// // we verify using ?email= query so user only sees their own app
// router.get("/progressuser/det/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { email } = req.query;

//     if (!id) {
//       return res.status(400).json({ message: "ID is required" });
//     }
//     if (!email) {
//       return res.status(400).json({ message: "email is required" });
//     }

//     const app = await Application.findOne({
//       _id: id,
//       candidateEmail: email.toLowerCase(),
//     });

//     if (!app) {
//       return res
//         .status(404)
//         .json({ message: "Application not found for this user" });
//     }

//     return res.json(mapApplication(app));
//   } catch (err) {
//     console.error("GET /progressuser/det error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// // // ---------- ADMIN: PUT /progress/det/:id ----------
// // // update stages / status / notes
// // router.put("/det/:id", async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const payload = req.body;

// //     if (!id) {
// //       return res.status(400).json({ message: "ID is required" });
// //     }

// //     // We only accept certain fields from frontend
// //     const update = {};

// //     if (payload.overallStatus) update.overallStatus = payload.overallStatus;
// //     if (payload.currentStage) update.currentStage = payload.currentStage;
// //     if (typeof payload.privateNote === "string") {
// //       update.privateNote = payload.privateNote;
// //     }
// //     if (Array.isArray(payload.stages)) {
// //       update.stages = payload.stages;
// //     }
// //     if (Array.isArray(payload.activity)) {
// //       update.activity = payload.activity;
// //     }

// //     // Optionally, recompute currentStage from stages:
// //     if (!update.currentStage && Array.isArray(payload.stages)) {
// //       const latest = payload.stages[payload.stages.length - 1];
// //       if (latest?.name) {
// //         update.currentStage = latest.name;
// //       }
// //     }

// //     const updated = await Application.findByIdAndUpdate(id, update, {
// //       new: true,
// //     });

// //     if (!updated) {
// //       return res.status(404).json({ message: "Application not found" });
// //     }

// //     console.log("Application updated:", updated);
// //     return res.json(mapApplication(updated));
// //   } catch (err) {
// //     console.error("PUT /progress/det error:", err);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // });

// // module.exports = router;

// // ---------- ADMIN: PUT /progress/det/:id ----------
// // update stages / status / notes
// // router.put("/det/:id", async (req, res) => {
// //   // console.log("inside put");
// //   try {
// //     const { id } = req.params;
// //     const payload = req.body;

// //     if (!id) {
// //       return res.status(400).json({ message: "ID is required" });
// //     }

// //     // 1️⃣ Load existing application first so we know old status + jobId
// //     const existing = await Application.findById(id);
// //     if (!existing) {
// //       return res.status(404).json({ message: "Application not found" });
// //     }

// //     const prevStatus = existing.overallStatus; // e.g. "in_progress"
// //     const update = {};

// //     // 2️⃣ Build allowed update fields
// //     if (payload.overallStatus) update.overallStatus = payload.overallStatus;
// //     if (payload.currentStage) update.currentStage = payload.currentStage;
// //     if (typeof payload.privateNote === "string") {
// //       update.privateNote = payload.privateNote;
// //     }
// //     if (Array.isArray(payload.stages)) {
// //       update.stages = payload.stages;
// //     }
// //     if (Array.isArray(payload.activity)) {
// //       update.activity = payload.activity;
// //     }

// //     // Optionally recompute currentStage from stages
// //     if (!update.currentStage && Array.isArray(payload.stages)) {
// //       const latest = payload.stages[payload.stages.length - 1];
// //       if (latest?.name) {
// //         update.currentStage = latest.name;
// //       }
// //     }

// //     // 3️⃣ Perform application update
// //     const updated = await Application.findByIdAndUpdate(id, update, {
// //       new: true,
// //     });

// //     if (!updated) {
// //       return res.status(404).json({ message: "Application not found" });
// //     }

// //     // 4️⃣ Sync Job.hired if overallStatus changed
// //     const newStatus = updated.overallStatus; // after update

// //     if (prevStatus !== newStatus && updated.jobId) {
// //       // console.log("inside prevstatus");
// //       const jobInc = {};

// //       // If it WAS selected before, and now it's not → hired--
// //       if (prevStatus === "selected" && newStatus !== "selected") {
// //         jobInc.hired = -1;
// //       }

// //       // If it WAS NOT selected before, and now it IS → hired++
// //       if (prevStatus !== "selected" && newStatus === "selected") {
// //         jobInc.hired = (jobInc.hired || 0) + 1;
// //       }

// //       console.log("j");
// //       console.log(jobInc);

// //       if (Object.keys(jobInc).length > 0) {
// //         await Job.findByIdAndUpdate(updated.jobId, { $inc: jobInc });
// //       }
// //     }

// //     // const j = await Job.findById(updated.jobId);
// //     // console.log(j);

// //     console.log("Application updated:", updated);
// //     return res.json(mapApplication(updated));
// //   } catch (err) {
// //     console.error("PUT /progress/det error:", err);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // });

// // ---------- ADMIN: PUT /progress/det/:id ----------
// // update stages / status / notes
// router.put("/det/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const payload = req.body;

//     if (!id) {
//       return res.status(400).json({ message: "ID is required" });
//     }

//     // 1️⃣ Load existing application first so we know old status + jobId + stages + activity
//     const existing = await Application.findById(id);
//     if (!existing) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     const prevStatus = existing.overallStatus; // e.g. "in_progress"
//     const oldStages = existing.stages || [];
//     const newStages = Array.isArray(payload.stages)
//       ? payload.stages
//       : oldStages;

//     // start from payload.activity if provided (for delete),
//     // else from existing.activity
//     // let activity = Array.isArray(payload.activity)
//     //   ? [...payload.activity]
//     //   : [...(existing.activity || [])];

//     let activity = [...(existing.activity || [])];

//     const now = new Date();
//     const update = {};

//     // 2️⃣ Build allowed update fields
//     if (payload.overallStatus) update.overallStatus = payload.overallStatus;
//     if (payload.currentStage) update.currentStage = payload.currentStage;
//     if (typeof payload.privateNote === "string") {
//       update.privateNote = payload.privateNote;
//     }
//     if (Array.isArray(payload.stages)) {
//       update.stages = newStages;
//     }

//     // 3️⃣ Auto-activity: detect stage changes (schedule / passed / failed / etc.)
//     newStages.forEach((stage, idx) => {
//       const prev = oldStages[idx] || {};
//       const name = stage.name || "Stage";

//       // date scheduled / rescheduled
//       const prevDateStr = prev.date ? new Date(prev.date).toISOString() : null;
//       const newDateStr = stage.date ? new Date(stage.date).toISOString() : null;

//       if (prevDateStr !== newDateStr && newDateStr) {
//         activity.push({
//           title: `${name} scheduled`,
//           time: now,
//         });
//       }

//       // status changed
//       if (prev.status !== stage.status && stage.status) {
//         if (stage.status === "passed") {
//           activity.push({
//             title: `${name} passed`,
//             time: now,
//           });
//         } else if (stage.status === "failed") {
//           activity.push({
//             title: `${name} failed`,
//             time: now,
//           });
//         } else if (stage.status === "scheduled") {
//           activity.push({
//             title: `${name} scheduled`,
//             time: now,
//           });
//         }
//       }
//     });

//     // 4️⃣ Auto-activity: overallStatus changed (selected / rejected / needs_review / in_progress)
//     const newOverallStatus =
//       payload.overallStatus !== undefined
//         ? payload.overallStatus
//         : existing.overallStatus;

//     console.log(prevStatus,newOverallStatus);

//     if (prevStatus !== newOverallStatus) {
//       console.log('prevStatus !== newOverallStatus')
//       if (newOverallStatus === "selected") {
//         activity.push({
//           title: "Application marked selected",
//           time: now,
//         });
//       } else if (newOverallStatus === "rejected") {
//         activity.push({
//           title: "Application rejected",
//           time: now,
//         });
//       } else if (newOverallStatus === "needs_review") {
//         console.log('newOverallStatus === "needs_review"')
//         activity.push({
//           title: "Moved to needs review",
//           time: now,
//         });
//       } else if (newOverallStatus === "in_progress") {
//         activity.push({
//           title: "Moved back to in-progress",
//           time: now,
//         });
//       }
//     }

//     // 5️⃣ Attach updated activity to update object
//     update.activity = activity;
//     console.log('update',update,'acitvity',activity)

//     // Optionally recompute currentStage from stages if not provided
//     if (!update.currentStage && Array.isArray(newStages) && newStages.length) {
//       const latest = newStages[newStages.length - 1];
//       if (latest?.name) {
//         update.currentStage = latest.name;
//       }
//     }

//     // 6️⃣ Perform application update
//     const updated = await Application.findByIdAndUpdate(id, update, {
//       new: true,
//     });

//     if (!updated) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     // // 7️⃣ Sync Job.hired if overallStatus changed
//     // const newStatus = updated.overallStatus; // after update
    
//     // if (prevStatus !== newStatus && updated.jobId) {
//     //   const jobInc = {};

//     //   // If it WAS selected before, and now it's not → hired--
//     //   if (prevStatus === "selected" && newStatus !== "selected") {
//     //     jobInc.hired = -1;
//     //   }

//     //   // If it WAS NOT selected before, and now it IS → hired++
//     //   if (prevStatus !== "selected" && newStatus === "selected") {
//     //     jobInc.hired = (jobInc.hired || 0) + 1;
//     //   }

//     //   if (Object.keys(jobInc).length > 0) {
//     //     await Job.findByIdAndUpdate(updated.jobId, { $inc: jobInc });
//     //   }
//     // }

//     // 7️⃣ Sync Job.hired if overallStatus changed
//     const newStatus = updated.overallStatus; // after update

//     if (prevStatus !== newStatus && updated.jobId) {
//       const jobInc = {};

//       // If it WAS selected before, and now it's not → hired--
//       if (prevStatus === "selected" && newStatus !== "selected") {
//         jobInc.hired = -1;
//       }

//       // If it WAS NOT selected before, and now it IS → hired++
//       if (prevStatus !== "selected" && newStatus === "selected") {
//         jobInc.hired = (jobInc.hired || 0) + 1;
//       }

//       if (Object.keys(jobInc).length > 0) {
//         await Job.findByIdAndUpdate(updated.jobId, { $inc: jobInc });
//       }
//     }

//     const textBody = `Hi ${updated.candidateName},

// Congratulations! We are delighted to inform you that you have been selected for the position of ${updated.jobTitle}.

// Our hiring team will contact you shortly with the next steps, including offer details, required documentation, and expected timelines.

// If you have any questions in the meantime, you may simply reply to this email.

// Once again, congratulations — and welcome to the next step of the process. We’re excited to continue this journey with you.

// Warm regards,  
// HR Team
// `;

//     const htmlBody = `
// <!DOCTYPE html>
// <html>
//   <body style="margin:0; padding:0; background-color:#f3f4f6;">
//     <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 0;">
//       <tr>
//         <td align="center">
//           <table width="640" cellpadding="0" cellspacing="0" style="background:#fff; border-radius:18px; overflow:hidden; font-family:'Segoe UI', Arial, sans-serif; color:#1f2937;">

//             <!-- Header -->
//             <tr>
//               <td style="background:linear-gradient(157deg,#2563eb,#06b6d4); padding:16px 24px; color:#fff; font-size:18px; font-weight:600;">
//                 🎉 Congratulations — You're Selected!
//               </td>
//             </tr>

//             <!-- Content -->
//             <tr>
//               <td style="padding:24px; font-size:15px; line-height:1.7;">
                
//                 <p>Hi ${updated.candidateName},</p>

//                 <p>
//                   We are pleased to inform you that you have been 
//                   <strong style="color:#2563eb;">selected</strong> for the position of 
//                   <strong>${updated.jobTitle}</strong>.
//                 </p>

//                 <!-- Highlight Box -->
//                 <div style="background:#e0f2fe; border-left:4px solid #06b6d4; padding:12px 16px; border-radius:8px; margin:18px 0;">
//                   <strong>Status:</strong> Selected for next steps 🚀<br />
//                   <strong>Next Action:</strong> HR will reach out shortly.
//                 </div>

//                 <p>
//                   Our hiring team will contact you soon with:
//                 </p>

//                 <ul style="padding-left:18px; margin-top:0;">
//                   <li>Offer details</li>
//                   <li>Required documents</li>
//                   <li>Joining schedule & onboarding steps</li>
//                 </ul>

//                 <p>
//                   If you have any questions before then, feel free to reply directly to this email.
//                 </p>

//                 <!-- CTA -->
//                 <p style="margin:26px 0;">
//                   <a href="https://your-portal-url.com"
//                      style="background:#2563eb; color:#fff; padding:12px 28px; font-weight:600; border-radius:30px; text-decoration:none; display:inline-block;">
//                     View Status
//                   </a>
//                 </p>

//                 <p>
//                   Once again, congratulations — we’re thrilled to move forward with you.
//                 </p>

//                 <p style="margin-top:22px;">
//                   Warm regards,<br />
//                   <strong>HR Team</strong><br>
//                   <span style="font-size:12px; color:#6b7280;">QueueHire · Powered by SPRITLE</span>
//                 </p>
//               </td>
//             </tr>

//             <!-- Footer -->
//             <tr>
//               <td style="padding:14px 24px; background:#fafafa; font-size:11px; color:#6b7280; border-top:1px solid #e5e7eb;">
//                 You received this email because you applied for a job using QueueHire ATS.
//               </td>
//             </tr>

//           </table>
//         </td>
//       </tr>
//     </table>
//   </body>
// </html>
// `;
// console.log(prevStatus, prevStatus !== "selected" , newStatus,newStatus === "selected")
//     // 8️⃣ Send email when candidate is selected (status changed → selected)
//     if (prevStatus !== "selected" && newStatus === "selected") {
//       try {
//         await sendMail({
//           to: updated.candidateEmail,
//           subject: `Great news! You’ve been selected for ${updated.jobTitle}`,
//           text: textBody,
//           html: htmlBody,
//         });
//       } catch (err) {
//         console.error("❌ Failed to send selection email:", err);
//       }
//     }

//     console.log("Application updated:", updated);
//     return res.json(mapApplication(updated));
//   } catch (err) {
//     console.error("PUT /progress/det error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Application = require("../models/application");
const Job = require("../models/job");
const { sendMail } = require("../mail/sendMail");

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

router.get("/det/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const app = await Application.findById(id);
    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    return res.json(mapApplication(app));
  } catch (err) {
    console.error("GET /progress/det error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/progressuser/det/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }

    const app = await Application.findOne({
      _id: id,
      candidateEmail: email.toLowerCase(),
    });

    if (!app) {
      return res
        .status(404)
        .json({ message: "Application not found for this user" });
    }

    return res.json(mapApplication(app));
  } catch (err) {
    console.error("GET /progressuser/det error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.put("/det/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const existing = await Application.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "Application not found" });
    }

    const prevStatus = existing.overallStatus;
    const oldStages = existing.stages || [];
    const newStages = Array.isArray(payload.stages)
      ? payload.stages
      : oldStages;

    let activity = [...(existing.activity || [])];

    const now = new Date();
    const update = {};

    if (payload.overallStatus) update.overallStatus = payload.overallStatus;
    if (payload.currentStage) update.currentStage = payload.currentStage;
    if (typeof payload.privateNote === "string") {
      update.privateNote = payload.privateNote;
    }
    if (Array.isArray(payload.stages)) {
      update.stages = newStages;
    }

    newStages.forEach((stage, idx) => {
      const prev = oldStages[idx] || {};
      const name = stage.name || "Stage";

      const prevDateStr = prev.date ? new Date(prev.date).toISOString() : null;
      const newDateStr = stage.date ? new Date(stage.date).toISOString() : null;

      if (prevDateStr !== newDateStr && newDateStr) {
        activity.push({
          title: `${name} scheduled`,
          time: now,
        });
      }

      if (prev.status !== stage.status && stage.status) {
        if (stage.status === "passed") {
          activity.push({
            title: `${name} passed`,
            time: now,
          });
        } else if (stage.status === "failed") {
          activity.push({
            title: `${name} failed`,
            time: now,
          });
        } else if (stage.status === "scheduled") {
          activity.push({
            title: `${name} scheduled`,
            time: now,
          });
        }
      }
    });

    const newOverallStatus =
      payload.overallStatus !== undefined
        ? payload.overallStatus
        : existing.overallStatus;

    console.log(prevStatus, newOverallStatus);

    if (prevStatus !== newOverallStatus) {
      console.log("prevStatus !== newOverallStatus");
      if (newOverallStatus === "selected") {
        activity.push({
          title: "Application marked selected",
          time: now,
        });
      } else if (newOverallStatus === "rejected") {
        activity.push({
          title: "Application rejected",
          time: now,
        });
      } else if (newOverallStatus === "needs_review") {
        console.log('newOverallStatus === "needs_review"');
        activity.push({
          title: "Moved to needs review",
          time: now,
        });
      } else if (newOverallStatus === "in_progress") {
        activity.push({
          title: "Moved back to in-progress",
          time: now,
        });
      }
    }

    update.activity = activity;
    console.log("update", update, "acitvity", activity);

    if (!update.currentStage && Array.isArray(newStages) && newStages.length) {
      const latest = newStages[newStages.length - 1];
      if (latest?.name) {
        update.currentStage = latest.name;
      }
    }

    const updated = await Application.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Application not found" });
    }

    const newStatus = updated.overallStatus;

    if (prevStatus !== newStatus && updated.jobId) {
      const jobInc = {};

      if (prevStatus === "selected" && newStatus !== "selected") {
        jobInc.hired = -1;
      }

      if (prevStatus !== "selected" && newStatus === "selected") {
        jobInc.hired = (jobInc.hired || 0) + 1;
      }

      if (Object.keys(jobInc).length > 0) {
        await Job.findByIdAndUpdate(updated.jobId, { $inc: jobInc });
      }
    }

    const textBody = `Hi ${updated.candidateName},

Congratulations! We are delighted to inform you that you have been selected for the position of ${updated.jobTitle}.

Our hiring team will contact you shortly with the next steps, including offer details, required documentation, and expected timelines.

If you have any questions in the meantime, you may simply reply to this email.

Once again, congratulations — and welcome to the next step of the process. We’re excited to continue this journey with you.

Warm regards,  
HR Team
`;

    const htmlBody = `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f3f4f6;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 0;">
      <tr>
        <td align="center">
          <table width="640" cellpadding="0" cellspacing="0" style="background:#fff; border-radius:18px; overflow:hidden; font-family:'Segoe UI', Arial, sans-serif; color:#1f2937;">

            <tr>
              <td style="background:linear-gradient(157deg,#2563eb,#06b6d4); padding:16px 24px; color:#fff; font-size:18px; font-weight:600;">
                🎉 Congratulations — You're Selected!
              </td>
            </tr>

            <tr>
              <td style="padding:24px; font-size:15px; line-height:1.7;">
                
                <p>Hi ${updated.candidateName},</p>

                <p>
                  We are pleased to inform you that you have been 
                  <strong style="color:#2563eb;">selected</strong> for the position of 
                  <strong>${updated.jobTitle}</strong>.
                </p>

                <div style="background:#e0f2fe; border-left:4px solid #06b6d4; padding:12px 16px; border-radius:8px; margin:18px 0;">
                  <strong>Status:</strong> Selected for next steps 🚀<br />
                  <strong>Next Action:</strong> HR will reach out shortly.
                </div>

                <p>
                  Our hiring team will contact you soon with:
                </p>

                <ul style="padding-left:18px; margin-top:0;">
                  <li>Offer details</li>
                  <li>Required documents</li>
                  <li>Joining schedule & onboarding steps</li>
                </ul>

                <p>
                  If you have any questions before then, feel free to reply directly to this email.
                </p>

                <p style="margin:26px 0;">
                  <a href="https://your-portal-url.com"
                     style="background:#2563eb; color:#fff; padding:12px 28px; font-weight:600; border-radius:30px; text-decoration:none; display:inline-block;">
                    View Status
                  </a>
                </p>

                <p>
                  Once again, congratulations — we’re thrilled to move forward with you.
                </p>

                <p style="margin-top:22px;">
                  Warm regards,<br />
                  <strong>HR Team</strong><br>
                  <span style="font-size:12px; color:#6b7280;">QueueHire · Powered by SPRITLE</span>
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:14px 24px; background:#fafafa; font-size:11px; color:#6b7280; border-top:1px solid #e5e7eb;">
                You received this email because you applied for a job using QueueHire ATS.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
    console.log(
      prevStatus,
      prevStatus !== "selected",
      newStatus,
      newStatus === "selected"
    );

    if (prevStatus !== "selected" && newStatus === "selected") {
      try {
        await sendMail({
          to: updated.candidateEmail,
          subject: `Great news! You’ve been selected for ${updated.jobTitle}`,
          text: textBody,
          html: htmlBody,
        });
      } catch (err) {
        console.error("❌ Failed to send selection email:", err);
      }
    }

    console.log("Application updated:", updated);
    return res.json(mapApplication(updated));
  } catch (err) {
    console.error("PUT /progress/det error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
