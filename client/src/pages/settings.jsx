// import React, { useState, useEffect } from "react";
// import "../styles/cp.css";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// // const DEFAULT_CANDIDATE = {
// //   id: "c1",
// //   fullName: "Samiksha Rao",
// //   email: "sam@example.com",
// //   phone: "+91 98765 43210",
// //   appliedOn: "2025-06-02T10:00:00Z",
// //   jobTitle: "Frontend Developer",
// //   overallStatus: "in_progress",
// //   currentStage: "Online coding",
// //   privateNote: "",
// //   stages: [
// //     {
// //       name: "Resume Screen",
// //       type: "screen",
// //       status: "passed",
// //       date: "2025-06-02T10:00:00Z",
// //       score: 80,
// //       notes: "Good match",
// //     },
// //     {
// //       name: "Online coding",
// //       type: "coding",
// //       status: "scheduled",
// //       date: "2025-06-06T09:00:00Z",
// //       score: null,
// //       notes: "",
// //     },
// //     {
// //       name: "Technical interview",
// //       type: "interview",
// //       status: "pending",
// //       date: null,
// //       score: null,
// //       notes: "",
// //     },
// //   ],
// //   activity: [
// //     { title: "Resume uploaded", time: "2025-06-02T10:01:00Z" },
// //     { title: "Screen completed", time: "2025-06-02T11:00:00Z" },
// //   ],
// // };

// const STATUS_LABELS = {
//   in_progress: "In progress",
//   selected: "Selected",
//   rejected: "Rejected",
//   needs_review: "Needs review",
// };

// const STATUS_CLASS = {
//   in_progress: "status-pill in-progress",
//   selected: "status-pill selected",
//   rejected: "status-pill rejected",
//   needs_review: "status-pill needs-review",
// };

// export default function CandidateProgress() {
//   const user = useSelector((state) => state.user);
//   const isAdmin = user?.role === "admin";

//   const [candidate, setCandidate] = useState(null);

//   const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:4000";
//   const { id } = useParams(); // this is the applicationId

//   // ---------------- FETCH APPLICATION ----------------
//   useEffect(() => {
//     const fetchCandidate = async () => {
//       try {
//         const url = isAdmin
//           ? `${API_URL}/progress/det/${id}`
//           : `${API_URL}/progressuser/det/${id}`;

//         const config = isAdmin
//           ? {}
//           : {
//               params: {
//                 // we’ll use this on backend to ensure only owner can see it
//                 email: user?.email,
//               },
//             };

//         console.log("Fetching candidate progress:", url, config);

//         const res = await axios.get(url, config);
//         setCandidate(res.data);
//       } catch (err) {
//         console.error("Error fetching candidate progress", err);
//         // fallback to default if needed
//         // setCandidate(DEFAULT_CANDIDATE);
//       }
//     };

//     if (id) {
//       console.log("got id", id);
//       fetchCandidate();
//     }
//   }, [API_URL, id, isAdmin, user?.email]);

//   const effectiveCandidate = candidate;

//   const [data, setData] = useState(() =>
//     structuredClone(effectiveCandidate || {})
//   );
//   const [editingStage, setEditingStage] = useState(null);

//   useEffect(() => {
//     setData(structuredClone(effectiveCandidate || {}));
//   }, [effectiveCandidate]);

//   // ---------------- API UPDATE HELPERS ----------------

//   async function onChange(updated) {
//     // updated is the whole application/candidate object
//     if (!updated?.id) return;
//     try {
//       const res = await axios.put(
//         `${API_URL}/progress/det/${updated.id}`,
//         updated
//       );
//       // keep local + server in sync
//       setCandidate(res.data);
//       setData(structuredClone(res.data));
//     } catch (err) {
//       console.error("Error updating application", err);
//     }
//   }

//   function saveAndEmit() {
//     onChange?.(structuredClone(data));
//   }

//   // ---------------- STAGE HELPERS ----------------

//   function updateStage(idx, patch, emit = false) {
//     setData((d) => {
//       const next = { ...d };
//       next.stages = (next.stages || []).map((s, i) =>
//         i === idx ? { ...s, ...patch } : s
//       );
//       if (emit) {
//         onChange?.(structuredClone(next));
//       }
//       return next;
//     });
//   }

//   function toggleStageEdit(idx) {
//     setEditingStage((v) => (v === idx ? null : idx));
//   }

//   function handleAdminSave() {
//     saveAndEmit();
//     setEditingStage(null);
//   }

//   function markOverallStatus(status) {
//     setData((prev) => {
//       const next = { ...prev, overallStatus: status };
//       onChange?.(structuredClone(next));
//       return next;
//     });
//   }

//   const progressPercent = (() => {
//     const total = (data.stages || []).length || 1;
//     const passed = (data.stages || []).filter(
//       (s) => s.status === "passed"
//     ).length;
//     return Math.round((passed / total) * 100);
//   })();

//   useEffect(() => {
//     console.log("Candidate progress data:", data);
//   }, [data]);

//   function deleteActivity(idx) {
//     setData((prev) => {
//       const next = { ...prev };
//       next.activity = (next.activity || []).filter((_, i) => i !== idx);
//       onChange?.(structuredClone(next)); // send to backend
//       return next;
//     });
//   }

//   // ---------------- RENDER ----------------

//   return (
//     <div className="cp-wrap">
//       <div className="cp-left">
//         <div className="cp-card cp-person">
//           <div className="cp-person-left">
//             <div
//               className="cp-avatar"
//               style={{
//                 backgroundImage: `linear-gradient(135deg,#7c3aed,#06b6d4)`,
//               }}
//               aria-hidden
//             >
//               {((data.fullName || "U").split(" ").map((n) => n[0]) || ["U"])
//                 .slice(0, 2)
//                 .join("")}
//             </div>
//             <div>
//               <div className="cp-name">
//                 {data.fullName || "Unnamed Candidate"}
//               </div>
//               <div className="cp-sub muted">{data.email || "—"}</div>
//               <div className="cp-sub muted">{data.phone || ""}</div>
//             </div>
//           </div>

//           <div className="cp-person-right">
//             <div className="cp-overall">
//               <div className="cp-progress" title={`${progressPercent}%`}>
//                 <svg viewBox="0 0 36 36" className="circular-chart">
//                   <path
//                     className="circle-bg"
//                     d="M18 2.0845
//                     a 15.9155 15.9155 0 0 1 0 31.831
//                     a 15.9155 15.9155 0 0 1 0 -31.831"
//                   />
//                   <path
//                     className="circle"
//                     strokeDasharray={`${progressPercent}, 100`}
//                     d="M18 2.0845
//                     a 15.9155 15.9155 0 0 1 0 31.831
//                     a 15.9155 15.9155 0 0 1 0 -31.831"
//                   />
//                 </svg>
//               </div>
//               <div className="cp-over-info">
//                 <div
//                   className={
//                     STATUS_CLASS[data.overallStatus] ||
//                     "status-pill in-progress"
//                   }
//                 >
//                   {STATUS_LABELS[data.overallStatus] || "In progress"}
//                 </div>

//                 <div className="muted small">
//                   {progressPercent}% stages passed
//                 </div>
//               </div>
//             </div>

//             <div className="cp-action-row">
//               {isAdmin ? (
//                 <div className="cp-status-actions">
//                   <span className="muted small">Set status:</span>

//                   <button
//                     className={`btn btn-chip ${
//                       data.overallStatus === "in_progress" ? "active" : ""
//                     }`}
//                     onClick={() => markOverallStatus("in_progress")}
//                   >
//                     In progress
//                   </button>

//                   <button
//                     className={`btn btn-chip ${
//                       data.overallStatus === "needs_review" ? "active" : ""
//                     }`}
//                     onClick={() => markOverallStatus("needs_review")}
//                   >
//                     Needs review
//                   </button>

//                   <button
//                     className={`btn btn-chip ${
//                       data.overallStatus === "selected" ? "active" : ""
//                     }`}
//                     onClick={() => markOverallStatus("selected")}
//                   >
//                     Selected
//                   </button>

//                   <button
//                     className={`btn btn-chip danger ${
//                       data.overallStatus === "rejected" ? "active" : ""
//                     }`}
//                     onClick={() => markOverallStatus("rejected")}
//                   >
//                     Rejected
//                   </button>
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         </div>

//         <div className="cp-card cp-timeline">
//           <div className="cp-title-row">
//             <h3>Application stages</h3>
//             <div className="muted small">Track stage results and notes</div>
//           </div>

//           <div className="cp-stages">
//             {(data.stages || []).map((stage, i) => (
//               <div className="cp-stage-row" key={i}>
//                 <div className={`cp-dot ${stage.status || "pending"}`} />
//                 <div className="cp-stage-body">
//                   <div className="cp-stage-head">
//                     <div>
//                       <div className="cp-stage-title">{stage.name}</div>
//                       <div className="muted small">{stage.type || "Stage"}</div>
//                     </div>

//                     <div className="cp-stage-meta">
//                       <div className="muted small">
//                         {stage.date
//                           ? new Date(stage.date).toLocaleString("en-US", {
//                               month: "short",
//                               day: "numeric",
//                               year: "numeric",
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })
//                           : "No date"}
//                       </div>
//                       <div className="muted small">
//                         {stage.score !== undefined && stage.score !== null
//                           ? `Score: ${stage.score}`
//                           : ""}
//                       </div>
//                       <div className={`cp-tag ${stage.status || ""}`}>
//                         {(stage.status || "pending").toUpperCase()}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="cp-stage-desc">
//                     {stage.notes || stage.summary || "No details yet."}
//                   </div>

//                   {isAdmin && editingStage === i ? (
//                     <div className="cp-edit-area">
//                       <div className="row">
//                         <label className="label">
//                           Date
//                           <input
//                             type="datetime-local"
//                             value={
//                               stage.date
//                                 ? new Date(stage.date)
//                                     .toISOString()
//                                     .slice(0, 16)
//                                 : ""
//                             }
//                             onChange={(e) =>
//                               updateStage(i, {
//                                 date: e.target.value
//                                   ? new Date(e.target.value).toISOString()
//                                   : null,
//                               })
//                             }
//                           />
//                         </label>
//                         <label className="label">
//                           Score
//                           <input
//                             type="number"
//                             min="0"
//                             max="100"
//                             value={stage.score ?? ""}
//                             onChange={(e) =>
//                               updateStage(i, {
//                                 score:
//                                   e.target.value === ""
//                                     ? null
//                                     : Number(e.target.value),
//                               })
//                             }
//                           />
//                         </label>
//                       </div>

//                       <div className="row">
//                         <label className="label">
//                           Type
//                           <select
//                             value={stage.type || "screen"}
//                             onChange={(e) =>
//                               updateStage(i, { type: e.target.value })
//                             }
//                           >
//                             <option value="screen">Screen</option>
//                             <option value="coding">Coding</option>
//                             <option value="interview">Interview</option>
//                             <option value="other">Other</option>
//                           </select>
//                         </label>

//                         <label className="label">
//                           Status
//                           <select
//                             value={stage.status || "pending"}
//                             onChange={(e) =>
//                               updateStage(i, { status: e.target.value })
//                             }
//                           >
//                             <option value="pending">Pending</option>
//                             <option value="scheduled">Scheduled</option>
//                             <option value="passed">Passed</option>
//                             <option value="failed">Failed</option>
//                           </select>
//                         </label>
//                       </div>

//                       <div className="row">
//                         <label className="label" style={{ width: "100%" }}>
//                           Notes
//                           <input
//                             value={stage.notes || ""}
//                             onChange={(e) =>
//                               updateStage(i, { notes: e.target.value })
//                             }
//                           />
//                         </label>
//                       </div>

//                       <div className="cp-edit-actions">
//                         <button
//                           className="btn btn-primary"
//                           onClick={handleAdminSave}
//                         >
//                           Save
//                         </button>
//                         <button
//                           className="btn btn-ghost"
//                           onClick={() => setEditingStage(null)}
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="cp-stage-actions">
//                       {isAdmin ? (
//                         <>
//                           <button
//                             className="btn btn-ghost small"
//                             onClick={() => toggleStageEdit(i)}
//                           >
//                             Edit
//                           </button>
//                           <button
//                             className="btn btn-ghost small"
//                             onClick={() => {
//                               const nextStatus =
//                                 stage.status === "passed" ? "failed" : "passed";
//                               updateStage(i, { status: nextStatus }, true);
//                             }}
//                           >
//                             Toggle pass
//                           </button>
//                         </>
//                       ) : null}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="cp-card cp-notes">
//           <h4>Private notes</h4>
//           <textarea
//             className="cp-note-input"
//             value={data.privateNote || ""}
//             onChange={(e) =>
//               setData((d) => ({ ...d, privateNote: e.target.value }))
//             }
//             placeholder={isAdmin ? "Admin-only notes" : "Your notes"}
//           />
//           <div className="cp-note-actions">
//             <button
//               className="btn btn-primary"
//               onClick={() => {
//                 saveAndEmit();
//               }}
//             >
//               Save notes
//             </button>
//           </div>
//         </div>
//       </div>

//       <aside className="cp-right">
//         <div className="cp-card cp-summary">
//           <h4>Summary</h4>
//           <div className="kv">
//             <span>Applied on</span>
//             <strong>
//               {data.appliedOn
//                 ? new Date(data.appliedOn).toLocaleDateString()
//                 : "—"}
//             </strong>
//           </div>
//           <div className="kv">
//             <span>Job</span>
//             <strong>{data.jobTitle || "—"}</strong>
//           </div>
//           <div className="kv">
//             <span>Current stage</span>
//             <strong>{data.currentStage || "—"}</strong>
//           </div>
//           <div className="kv">
//             <span>Interviews</span>
//             <strong>
//               {(data.stages || []).filter((s) => s.type === "interview").length}
//             </strong>
//           </div>
//           <div className="kv">
//             <span>Overall</span>
//             <strong>{data.overallStatus || "In progress"}</strong>
//           </div>
//         </div>

//         {/* <div className="cp-card cp-activity">
//           <h4>Recent activity</h4>
//           {(data.activity || []).slice(0, 6).map((a, idx) => (
//             <div className="activity-row" key={idx}>
//               <div className="activity-left">
//                 <div className="activity-dot" />
//               </div>
//               <div>
//                 <div className="activity-title">{a.title}</div>
//                 <div className="muted small">
//                   {new Date(a.time).toLocaleString()}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div> */}
//         <div className="cp-card cp-activity">
//           <h4>Recent activity</h4>
//           {(data.activity || []).length === 0 ? (
//             <div className="muted small">No activity yet.</div>
//           ) : (
//             (data.activity || []).slice(0, 6).map((a, idx) => (
//               <div className="activity-row" key={idx}>
//                 <div className="activity-left">
//                   <div className="activity-dot" />
//                 </div>
//                 <div className="activity-main">
//                   <div className="activity-title">{a.title}</div>
//                   <div className="muted small">
//                     {a.time ? new Date(a.time).toLocaleString() : "—"}
//                   </div>
//                 </div>

//                 {isAdmin && (
//                   <button
//                     className="btn btn-ghost small activity-delete"
//                     onClick={() => deleteActivity(idx)}
//                   >
//                     Delete
//                   </button>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </aside>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "../styles/cp.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const STATUS_LABELS = {
  in_progress: "In progress",
  selected: "Selected",
  rejected: "Rejected",
  needs_review: "Needs review",
};

const STATUS_CLASS = {
  in_progress: "status-pill in-progress",
  selected: "status-pill selected",
  rejected: "status-pill rejected",
  needs_review: "status-pill needs-review",
};

export default function CandidateProgress() {
  const user = useSelector((state) => state.user);
  const isAdmin = user?.role === "admin";

  const [candidate, setCandidate] = useState(null);

  const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:4000";
  const { id } = useParams();

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const url = isAdmin
          ? `${API_URL}/progress/det/${id}`
          : `${API_URL}/progressuser/det/${id}`;

        const config = isAdmin
          ? {}
          : {
              params: {
                email: user?.email,
              },
            };

        console.log("Fetching candidate progress:", url, config);

        const res = await axios.get(url, config);
        setCandidate(res.data);
      } catch (err) {
        console.error("Error fetching candidate progress", err);
      }
    };

    if (id) {
      console.log("got id", id);
      fetchCandidate();
    }
  }, [API_URL, id, isAdmin, user?.email]);

  const effectiveCandidate = candidate;

  const [data, setData] = useState(() =>
    structuredClone(effectiveCandidate || {})
  );
  const [editingStage, setEditingStage] = useState(null);

  useEffect(() => {
    setData(structuredClone(effectiveCandidate || {}));
  }, [effectiveCandidate]);

  async function onChange(updated) {
    if (!updated?.id) return;
    try {
      const res = await axios.put(
        `${API_URL}/progress/det/${updated.id}`,
        updated
      );
      setCandidate(res.data);
      setData(structuredClone(res.data));
    } catch (err) {
      console.error("Error updating application", err);
    }
  }

  function saveAndEmit() {
    onChange?.(structuredClone(data));
  }

  function updateStage(idx, patch, emit = false) {
    setData((d) => {
      const next = { ...d };
      next.stages = (next.stages || []).map((s, i) =>
        i === idx ? { ...s, ...patch } : s
      );
      if (emit) {
        onChange?.(structuredClone(next));
      }
      return next;
    });
  }

  function toggleStageEdit(idx) {
    setEditingStage((v) => (v === idx ? null : idx));
  }

  function handleAdminSave() {
    saveAndEmit();
    setEditingStage(null);
  }

  function markOverallStatus(status) {
    setData((prev) => {
      const next = { ...prev, overallStatus: status };
      onChange?.(structuredClone(next));
      return next;
    });
  }

  const progressPercent = (() => {
    const total = (data.stages || []).length || 1;
    const passed = (data.stages || []).filter(
      (s) => s.status === "passed"
    ).length;
    return Math.round((passed / total) * 100);
  })();

  useEffect(() => {
    console.log("Candidate progress data:", data);
  }, [data]);

  function deleteActivity(idx) {
    setData((prev) => {
      const next = { ...prev };
      next.activity = (next.activity || []).filter((_, i) => i !== idx);
      onChange?.(structuredClone(next));
      return next;
    });
  }

  return (
    <div className="cp-wrap">
      <div className="cp-left">
        <div className="cp-card cp-person">
          <div className="cp-person-left">
            <div
              className="cp-avatar"
              style={{
                backgroundImage: `linear-gradient(135deg,#7c3aed,#06b6d4)`,
              }}
              aria-hidden
            >
              {((data.fullName || "U").split(" ").map((n) => n[0]) || ["U"])
                .slice(0, 2)
                .join("")}
            </div>
            <div>
              <div className="cp-name">
                {data.fullName || "Unnamed Candidate"}
              </div>
              <div className="cp-sub muted">{data.email || "—"}</div>
              <div className="cp-sub muted">{data.phone || ""}</div>
            </div>
          </div>

          <div className="cp-person-right">
            <div className="cp-overall">
              <div className="cp-progress" title={`${progressPercent}%`}>
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path
                    className="circle-bg"
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="circle"
                    strokeDasharray={`${progressPercent}, 100`}
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
              <div className="cp-over-info">
                <div
                  className={
                    STATUS_CLASS[data.overallStatus] ||
                    "status-pill in-progress"
                  }
                >
                  {STATUS_LABELS[data.overallStatus] || "In progress"}
                </div>

                <div className="muted small">
                  {progressPercent}% stages passed
                </div>
              </div>
            </div>

            <div className="cp-action-row">
              {isAdmin ? (
                <div className="cp-status-actions">
                  <span className="muted small">Set status:</span>

                  <button
                    className={`btn btn-chip ${
                      data.overallStatus === "in_progress" ? "active" : ""
                    }`}
                    onClick={() => markOverallStatus("in_progress")}
                  >
                    In progress
                  </button>

                  <button
                    className={`btn btn-chip ${
                      data.overallStatus === "needs_review" ? "active" : ""
                    }`}
                    onClick={() => markOverallStatus("needs_review")}
                  >
                    Needs review
                  </button>

                  <button
                    className={`btn btn-chip ${
                      data.overallStatus === "selected" ? "active" : ""
                    }`}
                    onClick={() => markOverallStatus("selected")}
                  >
                    Selected
                  </button>

                  <button
                    className={`btn btn-chip danger ${
                      data.overallStatus === "rejected" ? "active" : ""
                    }`}
                    onClick={() => markOverallStatus("rejected")}
                  >
                    Rejected
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="cp-card cp-timeline">
          <div className="cp-title-row">
            <h3>Application stages</h3>
            <div className="muted small">Track stage results and notes</div>
          </div>

          <div className="cp-stages">
            {(data.stages || []).map((stage, i) => (
              <div className="cp-stage-row" key={i}>
                <div className={`cp-dot ${stage.status || "pending"}`} />
                <div className="cp-stage-body">
                  <div className="cp-stage-head">
                    <div>
                      <div className="cp-stage-title">{stage.name}</div>
                      <div className="muted small">{stage.type || "Stage"}</div>
                    </div>

                    <div className="cp-stage-meta">
                      <div className="muted small">
                        {stage.date
                          ? new Date(stage.date).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "No date"}
                      </div>
                      <div className="muted small">
                        {stage.score !== undefined && stage.score !== null
                          ? `Score: ${stage.score}`
                          : ""}
                      </div>
                      <div className={`cp-tag ${stage.status || ""}`}>
                        {(stage.status || "pending").toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div className="cp-stage-desc">
                    {stage.notes || stage.summary || "No details yet."}
                  </div>

                  {isAdmin && editingStage === i ? (
                    <div className="cp-edit-area">
                      <div className="row">
                        <label className="label">
                          Date
                          <input
                            type="datetime-local"
                            value={
                              stage.date
                                ? new Date(stage.date)
                                    .toISOString()
                                    .slice(0, 16)
                                : ""
                            }
                            onChange={(e) =>
                              updateStage(i, {
                                date: e.target.value
                                  ? new Date(e.target.value).toISOString()
                                  : null,
                              })
                            }
                          />
                        </label>
                        <label className="label">
                          Score
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={stage.score ?? ""}
                            onChange={(e) =>
                              updateStage(i, {
                                score:
                                  e.target.value === ""
                                    ? null
                                    : Number(e.target.value),
                              })
                            }
                          />
                        </label>
                      </div>

                      <div className="row">
                        <label className="label">
                          Type
                          <select
                            value={stage.type || "screen"}
                            onChange={(e) =>
                              updateStage(i, { type: e.target.value })
                            }
                          >
                            <option value="screen">Screen</option>
                            <option value="coding">Coding</option>
                            <option value="interview">Interview</option>
                            <option value="other">Other</option>
                          </select>
                        </label>

                        <label className="label">
                          Status
                          <select
                            value={stage.status || "pending"}
                            onChange={(e) =>
                              updateStage(i, { status: e.target.value })
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="passed">Passed</option>
                            <option value="failed">Failed</option>
                          </select>
                        </label>
                      </div>

                      <div className="row">
                        <label className="label" style={{ width: "100%" }}>
                          Notes
                          <input
                            value={stage.notes || ""}
                            onChange={(e) =>
                              updateStage(i, { notes: e.target.value })
                            }
                          />
                        </label>
                      </div>

                      <div className="cp-edit-actions">
                        <button
                          className="btn btn-primary"
                          onClick={handleAdminSave}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-ghost"
                          onClick={() => setEditingStage(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="cp-stage-actions">
                      {isAdmin ? (
                        <>
                          <button
                            className="btn btn-ghost small"
                            onClick={() => toggleStageEdit(i)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-ghost small"
                            onClick={() => {
                              const nextStatus =
                                stage.status === "passed" ? "failed" : "passed";
                              updateStage(i, { status: nextStatus }, true);
                            }}
                          >
                            Toggle pass
                          </button>
                        </>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cp-card cp-notes">
          <h4>Private notes</h4>
          <textarea
            className="cp-note-input"
            value={data.privateNote || ""}
            onChange={(e) =>
              setData((d) => ({ ...d, privateNote: e.target.value }))
            }
            placeholder={isAdmin ? "Admin-only notes" : "Your notes"}
          />
          <div className="cp-note-actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                saveAndEmit();
              }}
            >
              Save notes
            </button>
          </div>
        </div>
      </div>

      <aside className="cp-right">
        <div className="cp-card cp-summary">
          <h4>Summary</h4>
          <div className="kv">
            <span>Applied on</span>
            <strong>
              {data.appliedOn
                ? new Date(data.appliedOn).toLocaleDateString()
                : "—"}
            </strong>
          </div>
          <div className="kv">
            <span>Job</span>
            <strong>{data.jobTitle || "—"}</strong>
          </div>
          <div className="kv">
            <span>Current stage</span>
            <strong>{data.currentStage || "—"}</strong>
          </div>
          <div className="kv">
            <span>Interviews</span>
            <strong>
              {(data.stages || []).filter((s) => s.type === "interview").length}
            </strong>
          </div>
          <div className="kv">
            <span>Overall</span>
            <strong>{data.overallStatus || "In progress"}</strong>
          </div>
        </div>

        <div className="cp-card cp-activity">
          <h4>Recent activity</h4>
          {(data.activity || []).length === 0 ? (
            <div className="muted small">No activity yet.</div>
          ) : (
            (data.activity || []).slice(0, 6).map((a, idx) => (
              <div className="activity-row" key={idx}>
                <div className="activity-left">
                  <div className="activity-dot" />
                </div>
                <div className="activity-main">
                  <div className="activity-title">{a.title}</div>
                  <div className="muted small">
                    {a.time ? new Date(a.time).toLocaleString() : "—"}
                  </div>
                </div>

                {isAdmin && (
                  <button
                    className="btn btn-ghost small activity-delete"
                    onClick={() => deleteActivity(idx)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}
