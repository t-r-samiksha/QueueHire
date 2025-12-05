// import React, { useEffect, useMemo, useState } from "react";
// import JobCard from "../components/jobcard.jsx";
// import JobModal from "../components/jobmodal.jsx";
// import JobOpenings from "../components/jobdata.jsx";
// import "../styles/job.css";
// import "../styles/userdash.css";
// import axios from "axios";
// import { useSelector } from "react-redux";

// // const DEMO_LOGO = "/mnt/data/f789f794-a831-49c7-9670-1b0ba0972984.png";

// // const SAMPLE_JOBS = [
// //   {
// //     id: "job1",
// //     title: "Frontend Developer",
// //     company: "BrightApps",
// //     location: "Remote · India",
// //     openings: 3,
// //     level: "Mid–Senior",
// //     salary: "₹6L - ₹12L",
// //     posted: "3 days ago",
// //     skills: [
// //       { name: "React", freq: 54 },
// //       { name: "TypeScript", freq: 18 },
// //       { name: "CSS", freq: 22 },
// //       { name: "Testing", freq: 10 },
// //     ],
// //     description:
// //       "Build performant and accessible UI components, own frontend architecture and developer experience.",
// //     responsibilities: [
// //       "Create reusable React components and design system primitives",
// //       "Improve performance and bundle sizes",
// //       "Collaborate with product and design",
// //       "Ship tests and CI pipelines",
// //     ],
// //     qualifications: ["3+ years building production React apps", "Comfort with TypeScript and modern toolchains"],
// //     levels: ["Resume screen", "Online coding", "Technical interview", "Hiring manager / GD"],
// //     logo: DEMO_LOGO,
// //     gradient: "linear-gradient(90deg,#2563eb,#06b6d4)",
// //   },
// //   {
// //     id: "job2",
// //     title: "Backend Engineer (Node.js)",
// //     company: "DataPulse",
// //     location: "Bengaluru · Hybrid",
// //     openings: 2,
// //     level: "Senior",
// //     salary: "₹12L - ₹22L",
// //     posted: "1 week ago",
// //     skills: [
// //       { name: "Node.js", freq: 48 },
// //       { name: "Postgres", freq: 30 },
// //       { name: "Redis", freq: 12 },
// //       { name: "AWS", freq: 18 },
// //     ],
// //     description: "Design and operate backend services with focus on reliability and observability.",
// //     responsibilities: ["Design REST/GraphQL APIs", "Implement monitoring & alerts", "Lead incident response and postmortems"],
// //     qualifications: ["5+ years backend experience, distributed systems exposure", "Strong DB and caching fundamentals"],
// //     levels: ["Resume screen", "System design", "Live coding", "Onsite"],
// //     logo: DEMO_LOGO,
// //     gradient: "linear-gradient(90deg,#10b981,#06b6d4)",
// //   },
// //   {
// //     id: "job3",
// //     title: "Product Designer",
// //     company: "Flowly",
// //     location: "Remote",
// //     openings: 1,
// //     level: "Mid",
// //     salary: "₹8L - ₹14L",
// //     posted: "2 days ago",
// //     skills: [
// //       { name: "Figma", freq: 26 },
// //       { name: "User Research", freq: 12 },
// //       { name: "Prototyping", freq: 10 },
// //       { name: "Accessibility", freq: 6 },
// //     ],
// //     description: "Lead product UI, prototyping and usability research to deliver thoughtful experiences.",
// //     responsibilities: ["Create prototypes and run user tests", "Maintain the design system", "Partner with PM & engineering"],
// //     qualifications: ["3+ years product/UX design", "Strong prototyping skills"],
// //     levels: ["Portfolio review", "Design exercise", "Interview"],
// //     logo: DEMO_LOGO,
// //     gradient: "linear-gradient(90deg,#a855f7,#ec4899)",
// //   },
// // ];

// export default function UserDashboard({ initialJobs } = {}) {
//   const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:4000";
//   console.log("API_URL ->", API_URL);

//   const [jobs, setJobs] = useState([]);
//   const [query, setQuery] = useState("");
//   const [skillFilter, setSkillFilter] = useState("");
//   // const [locationFilter, setLocationFilter] = useState("");
//   const [sortBy, setSortBy] = useState("relevance");

//   const [saved, setSaved] = useState([]);
//   const [applied, setApplied] = useState([]);

//   const user = useSelector((state) => state.user);

//   useEffect(() => {
//     const fetch = async () => {
//       const res = await axios.get(`${API_URL}/user/user-state`, {
//         params: { userId: user.id, email: user.email },
//       });
//       console.log(res)
//       setApplied(res.data.applied || []);
//       setSaved(res.data.saved || []);
//       console.log('applied userdb',applied)
//       console.log('saved userdb',saved)
//     };
//     fetch();
//   }, [API_URL, user.id, user.email]);

//   const [activeJob, setActiveJob] = useState(null);
//   const [modalMode, setModalMode] = useState("view");

//   useEffect(() => {
//     localStorage.setItem("savedJobs", JSON.stringify(saved));
//   }, [saved]);
//   useEffect(() => {
//     localStorage.setItem("appliedJobs", JSON.stringify(applied));
//   }, [applied]);

//   const allSkills = useMemo(() => {
//     const s = new Set();
//     jobs.forEach((j) => (j.skills || []).forEach((k) => s.add(k.name)));
//     return Array.from(s).sort();
//   }, [jobs]);

//   const filtered = useMemo(() => {
//     let out = jobs.slice();
//     if (query.trim()) {
//       const q = query.toLowerCase();
//       out = out.filter((j) =>
//         (j.title + " " + (j.company || "") + " " + (j.description || ""))
//           .toLowerCase()
//           .includes(q)
//       );
//     }
//     if (skillFilter) {
//       out = out.filter((j) =>
//         (j.skills || []).some((s) => s.name === skillFilter)
//       );
//     }
//     // if (locationFilter) {
//     //   out = out.filter((j) =>
//     //     (j.location || "").toLowerCase().includes(locationFilter.toLowerCase())
//     //   );
//     // }
//     if (sortBy === "new")
//       out = out.sort((a, b) => (a.posted > b.posted ? -1 : 1));
//     return out;
//   }, [jobs, query, skillFilter, sortBy]);

//   function openModal(job, mode = "view") {
//     setActiveJob(job);
//     setModalMode(mode);
//     document.body.style.overflow = "hidden";
//   }
//   function closeModal() {
//     setActiveJob(null);
//     setModalMode("view");
//     document.body.style.overflow = "";
//   }

//   // function toggleSave(jobId) {
//   //   setSaved((prev) =>
//   //     prev.includes(jobId)
//   //       ? prev.filter((id) => id !== jobId)
//   //       : [...prev, jobId]
//   //   );
//   // }

//   async function toggleSave(jobId) {
//   try {
//     setSaved((prev) =>
//       prev.includes(jobId)
//         ? prev.filter((id) => id !== jobId)
//         : [...prev, jobId]
//     );

//     const res = await axios.post(`${API_URL}/user/toggle-save`, {
//       userId: user.id,        
//       jobId,                  
//     });

//     setSaved(res.data.saved || []);
//   } catch (err) {
//     console.error("Failed to toggle save:", err);
    
//   }
// }


//   function handleApply(payload) {
//     if (!payload || !payload.jobId) return;
//     setApplied((prev) =>
//       prev.includes(payload.jobId) ? prev : [...prev, payload.jobId]
//     );
//     console.log(applied);
//     // closeModal();
//   }

//   function handleSaveJob(updated) {
//     setJobs((prev) => {
//       const exists = prev.find((p) => p.id === updated.id);
//       if (exists) return prev.map((p) => (p.id === updated.id ? updated : p));
//       return [updated, ...prev];
//     });
//     closeModal();
//   }

//   useEffect(() => {
//     const fetch = async () => {
//       const res = await axios.get(`${API_URL}/userdb/det`);
//       console.log('jos',res.data)
//       setJobs(res.data);
//     };
//     fetch();
//   }, []);

//   return (
//     <div className="jh-page">
//       <div className="jh-header">
//         <div>
//           <h1 className="jh-title">Jobs for you</h1>
//           <p className="jh-sub">
//             Curated roles based on your profile. Search, filter and apply.
//           </p>
//         </div>
//         <div className="jh-actions">
//           <div className="search-row">
//             <input
//               placeholder="Search roles or companies"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//             <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//               <option value="relevance">Relevance</option>
//               <option value="new">Newest</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="gridandside">
//         <div className="jh-leftpanel">
//           <div className="filters">
//             <label>
//               Skill
//               <select
//                 value={skillFilter}
//                 onChange={(e) => setSkillFilter(e.target.value)}
//               >
//                 <option value="">All</option>
//                 {allSkills.map((s) => (
//                   <option key={s} value={s}>
//                     {s}
//                   </option>
//                 ))}
//               </select>
//             </label>

//             {/* <label>
//               Location
//               <input
//                 placeholder="e.g. Bengaluru, Remote"
//                 value={locationFilter}
//                 onChange={(e) => setLocationFilter(e.target.value)}
//               />
//             </label> */}

//             <div className="quick-actions">
//               <button
//                 className="btn btn-ghost"
//                 onClick={() => {
//                   setQuery("");
//                   setSkillFilter("");
//                   // setLocationFilter("");
//                   setSortBy("relevance");
//                 }}
//               >
//                 Reset
//               </button>
//               <button className="btn btn-ghost" onClick={() => setSaved([])}>
//                 Clear saved
//               </button>
//             </div>
//           </div>

//           <div className="jh-grid">
//             {filtered.length === 0 ? (
//               <div className="empty">No roles match your filters.</div>
//             ) : (
//               filtered.map((job) => (
//                 // <div key={job.id} className="job-card-wrap">
//                   <JobCard
//                     job={job}
//                     isAdmin={false}
//                     onOpen={(j, mode) => openModal(j, mode || "view")}
//                     width={"125%"}
//                     hasApplied={applied.includes(job._id)}
//                     flag = {saved.includes(job._id) ? "Saved" : "Save"}
//                     toggleSave = {toggleSave}
//                     jid = {job._id}
//                   />
//                   // {/* <div className="job-actions-row">
//                   //   <button
//                   //     className="btn btn-ghost small"
//                   //     onClick={() => toggleSave(job.id)}
//                   //   >
//                   //     {saved.includes(job.id) ? "Saved" : "Save"}
//                   //   </button>
//                   //   <button
//                   //     className="btn btn-link small"
//                   //     onClick={() => openModal(job, "view")}
//                   //   >
//                   //     Preview
//                   //   </button>
//                   // </div> */}
//                 // </div>
//               ))
//             )}
//           </div>
//         </div>

//         <aside className="jh-side" style={{ width: 420 }}>
//           <div className="side-card">
//             <h4>Saved jobs</h4>
//             {saved.length === 0 ? (
//               <div className="muted small">No saved jobs</div>
//             ) : (
//               <ul>
//                 {saved.map((id) => {
//                   const j = jobs.find((x) => x._id === id);
//                   if (!j) return null;
//                   return (
//                     <li key={id} className="saved-item">
//                       <div>
//                         <strong>{j.title}</strong>
//                         <div className="muted small">
//                           {/* {j.company} · {j.location} */}
//                           {j.level}
//                         </div>
//                       </div>
//                       <div>
//                         <button
//                           className={`btn btn-primary small ${applied.includes(id) ? "disabled" : ""}`}
//                           onClick={() => openModal(j, "apply")}
//                           disabled={applied.includes(id)}
//                         >
//                           {applied.includes(id)?"Applied":"Apply"}
//                         </button>
//                         <button
//                           className="btn btn-ghost small"
//                           onClick={() => toggleSave(id)}
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     </li>
//                   );
//                 })}
//               </ul>
//             )}
//           </div>

//           <div className="side-card">
//             <h4>Activity</h4>
//             <div className="muted small">
//               Applied: {applied.length} · Saved: {saved.length}
//             </div>

//             {applied.length === 0 ? (
//               <div className="muted small" style={{ marginTop: 8 }}>
//                 No applications yet.
//               </div>
//             ) : (
//               <ul
//                 className="applied-list"
//                 style={{ marginTop: 8, listStyle: "none" }}
//               >
//                 {jobs
//                   .filter((job) => applied.includes(job._id)) // 🔥 convert IDs → actual objects
//                   .map((job) => (
//                     <li key={job._id} className="applied-item">
//                       <div>
//                         <strong>{job.title}</strong>
//                         <div className="muted small">
//                           {/* {job.company} · {job.location} */}
//                           {job.level}
//                         </div>
//                       </div>

//                       <button
//                         className="btn btn-link small"
//                         onClick={() => openModal(job, "view")}
//                       >
//                         View
//                       </button>
//                     </li>
//                   ))}
//               </ul>
//             )}

//             {/* <div style={{ marginTop: 12 }}>
//               <button className="btn btn-ghost" onClick={() => setApplied([])}>
//                 Clear applied
//               </button>
//             </div> */}
//           </div>

//           <JobOpenings width={420} jobs={jobs} />
//         </aside>
//       </div>

//       {activeJob && (
//         <JobModal
//           job={activeJob}
//           isAdmin={false}
//           mode={modalMode}
//           onClose={closeModal}
//           onSave={handleSaveJob}
//           onApply={(payload) => handleApply(payload)}
//           hasApplied={applied.includes(activeJob._id)}
//         />
//       )}
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import JobCard from "../components/jobcard.jsx";
import JobModal from "../components/jobmodal.jsx";
import JobOpenings from "../components/jobdata.jsx";
import "../styles/job.css";
import "../styles/userdash.css";
import axios from "axios";
import { useSelector } from "react-redux";

export default function UserDashboard({ initialJobs } = {}) {
  const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:4000";
  console.log("API_URL ->", API_URL);

  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  const [saved, setSaved] = useState([]);
  const [applied, setApplied] = useState([]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${API_URL}/user/user-state`, {
        params: { userId: user.id, email: user.email },
      });
      console.log(res);
      setApplied(res.data.applied || []);
      setSaved(res.data.saved || []);
      console.log("applied userdb", applied);
      console.log("saved userdb", saved);
    };
    fetch();
  }, [API_URL, user.id, user.email]);

  const [activeJob, setActiveJob] = useState(null);
  const [modalMode, setModalMode] = useState("view");

  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    localStorage.setItem("appliedJobs", JSON.stringify(applied));
  }, [applied]);

  const allSkills = useMemo(() => {
    const s = new Set();
    jobs.forEach((j) => (j.skills || []).forEach((k) => s.add(k.name)));
    return Array.from(s).sort();
  }, [jobs]);

  const filtered = useMemo(() => {
    let out = jobs.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter((j) =>
        (j.title + " " + (j.company || "") + " " + (j.description || ""))
          .toLowerCase()
          .includes(q)
      );
    }
    if (skillFilter) {
      out = out.filter((j) =>
        (j.skills || []).some((s) => s.name === skillFilter)
      );
    }
    if (sortBy === "new")
      out = out.sort((a, b) => (a.posted > b.posted ? -1 : 1));
    return out;
  }, [jobs, query, skillFilter, sortBy]);

  function openModal(job, mode = "view") {
    setActiveJob(job);
    setModalMode(mode);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setActiveJob(null);
    setModalMode("view");
    document.body.style.overflow = "";
  }

  async function toggleSave(jobId) {
    try {
      setSaved((prev) =>
        prev.includes(jobId)
          ? prev.filter((id) => id !== jobId)
          : [...prev, jobId]
      );

      const res = await axios.post(`${API_URL}/user/toggle-save`, {
        userId: user.id,
        jobId,
      });

      setSaved(res.data.saved || []);
    } catch (err) {
      console.error("Failed to toggle save:", err);
    }
  }

  function handleApply(payload) {
    if (!payload || !payload.jobId) return;
    setApplied((prev) =>
      prev.includes(payload.jobId) ? prev : [...prev, payload.jobId]
    );
    console.log(applied);
  }

  function handleSaveJob(updated) {
    setJobs((prev) => {
      const exists = prev.find((p) => p.id === updated.id);
      if (exists) return prev.map((p) => (p.id === updated.id ? updated : p));
      return [updated, ...prev];
    });
    closeModal();
  }

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${API_URL}/userdb/det`);
      console.log("jos", res.data);
      setJobs(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="jh-page">
      <div className="jh-header">
        <div>
          <h1 className="jh-title">Jobs for you</h1>
          <p className="jh-sub">
            Curated roles based on your profile. Search, filter and apply.
          </p>
        </div>
        <div className="jh-actions">
          <div className="search-row">
            <input
              placeholder="Search roles or companies"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="relevance">Relevance</option>
              <option value="new">Newest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="gridandside">
        <div className="jh-leftpanel">
          <div className="filters">
            <label>
              Skill
              <select
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
              >
                <option value="">All</option>
                {allSkills.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <div className="quick-actions">
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setQuery("");
                  setSkillFilter("");
                  setSortBy("relevance");
                }}
              >
                Reset
              </button>
              <button className="btn btn-ghost" onClick={() => setSaved([])}>
                Clear saved
              </button>
            </div>
          </div>

          <div className="jh-grid">
            {filtered.length === 0 ? (
              <div className="empty">No roles match your filters.</div>
            ) : (
              filtered.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  isAdmin={false}
                  onOpen={(j, mode) => openModal(j, mode || "view")}
                  width={"125%"}
                  hasApplied={applied.includes(job._id)}
                  flag={saved.includes(job._id) ? "Saved" : "Save"}
                  toggleSave={toggleSave}
                  jid={job._id}
                />
              ))
            )}
          </div>
        </div>

        <aside className="jh-side" style={{ width: 420 }}>
          <div className="side-card">
            <h4>Saved jobs</h4>
            {saved.length === 0 ? (
              <div className="muted small">No saved jobs</div>
            ) : (
              <ul>
                {saved.map((id) => {
                  const j = jobs.find((x) => x._id === id);
                  if (!j) return null;
                  return (
                    <li key={id} className="saved-item">
                      <div>
                        <strong>{j.title}</strong>
                        <div className="muted small">{j.level}</div>
                      </div>
                      <div>
                        <button
                          className={`btn btn-primary small ${
                            applied.includes(id) ? "disabled" : ""
                          }`}
                          onClick={() => openModal(j, "apply")}
                          disabled={applied.includes(id)}
                        >
                          {applied.includes(id) ? "Applied" : "Apply"}
                        </button>
                        <button
                          className="btn btn-ghost small"
                          onClick={() => toggleSave(id)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="side-card">
            <h4>Activity</h4>
            <div className="muted small">
              Applied: {applied.length} · Saved: {saved.length}
            </div>

            {applied.length === 0 ? (
              <div className="muted small" style={{ marginTop: 8 }}>
                No applications yet.
              </div>
            ) : (
              <ul
                className="applied-list"
                style={{ marginTop: 8, listStyle: "none" }}
              >
                {jobs
                  .filter((job) => applied.includes(job._id))
                  .map((job) => (
                    <li key={job._id} className="applied-item">
                      <div>
                        <strong>{job.title}</strong>
                        <div className="muted small">{job.level}</div>
                      </div>

                      <button
                        className="btn btn-link small"
                        onClick={() => openModal(job, "view")}
                      >
                        View
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <JobOpenings width={420} jobs={jobs} />
        </aside>
      </div>

      {activeJob && (
        <JobModal
          job={activeJob}
          isAdmin={false}
          mode={modalMode}
          onClose={closeModal}
          onSave={handleSaveJob}
          onApply={(payload) => handleApply(payload)}
          hasApplied={applied.includes(activeJob._id)}
        />
      )}
    </div>
  );
}
