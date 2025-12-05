// import React, { useEffect, useState } from "react";
// import "../styles/job.css";
// import JobModal from "../components/jobmodal.jsx";
// import JobOpenings from "../components/jobdata.jsx";
// import JobCard from "../components/jobcard.jsx";
// import { useSelector } from "react-redux";
// import axios from "axios";

// const DEMO_LOGO = "/mnt/data/f789f794-a831-49c7-9670-1b0ba0972984.png";

// // // const SAMPLE_JOBS = [
// // //   {
// // //     id: "job1",
// // //     title: "Frontend Developer",
// // //     company: "BrightApps",
// // //     location: "Remote · India",
// // //     openings: 3,
// // //     level: "Mid–Senior",
// // //     salary: "₹6L - ₹12L",
// // //     posted: "3 days ago",
// // //     skills: [
// // //       { name: "React", freq: 54 },
// // //       { name: "TypeScript", freq: 18 },
// // //       { name: "CSS", freq: 22 },
// // //       { name: "Testing", freq: 10 }
// // //     ],
// // //     description:
// // //       "Build performant and accessible UI components, own frontend architecture and developer experience.",
// // //     responsibilities: [
// // //       "Create reusable React components and design system primitives",
// // //       "Improve performance and bundle sizes",
// // //       "Collaborate with product and design",
// // //       "Ship tests and CI pipelines"
// // //     ],
// // //     qualifications: [
// // //       "3+ years building production React apps",
// // //       "Comfort with TypeScript and modern toolchains"
// // //     ],
// // //     levels: [
// // //       "Resume screen",
// // //       "Online coding",
// // //       "Technical interview",
// // //       "Hiring manager / GD"
// // //     ],
// // //     logo: DEMO_LOGO,
// // //     gradient: "linear-gradient(90deg,#2563eb,#06b6d4)"
// // //   },
// // //   {
// // //     id: "job2",
// // //     title: "Backend Engineer (Node.js)",
// // //     company: "DataPulse",
// // //     location: "Bengaluru · Hybrid",
// // //     openings: 2,
// // //     level: "Senior",
// // //     salary: "₹12L - ₹22L",
// // //     posted: "1 week ago",
// // //     skills: [
// // //       { name: "Node.js", freq: 48 },
// // //       { name: "Postgres", freq: 30 },
// // //       { name: "Redis", freq: 12 },
// // //       { name: "AWS", freq: 18 }
// // //     ],
// // //     description:
// // //       "Design and operate backend services with focus on reliability and observability.",
// // //     responsibilities: [
// // //       "Design REST/GraphQL APIs",
// // //       "Implement monitoring & alerts",
// // //       "Lead incident response and postmortems"
// // //     ],
// // //     qualifications: [
// // //       "5+ years backend experience, distributed systems exposure",
// // //       "Strong DB and caching fundamentals"
// // //     ],
// // //     levels: ["Resume screen", "System design", "Live coding", "Onsite"],
// // //     logo: DEMO_LOGO,
// // //     gradient: "linear-gradient(90deg,#10b981,#06b6d4)"
// // //   }
// // // ];

// // export default function Job() {

// //   const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:4000";
// //   console.log("API_URL ->", API_URL);

// //   const stored = (() => {
// //     try {
// //       return useSelector((state) => state.user);
// //     } catch {
// //       return null;
// //     }
// //   })();

// //   const isAdmin = stored?.role === "admin";
// //   const [jobs, setJobs] = useState([]);
// //   const [activeJob, setActiveJob] = useState(null);
// //   const [showModal, setShowModal] = useState(false);
// //   const [modalMode, setModalMode] = useState("view");

// //   function openModal(job, mode = "view") {
// //     setActiveJob(job);
// //     setModalMode(mode);
// //     setShowModal(true);
// //     document.body.style.overflow = "hidden";
// //   }

// //   function closeModal() {
// //     setShowModal(false);
// //     setActiveJob(null);
// //     setModalMode("view");
// //     document.body.style.overflow = "";
// //   }

// //   function handleCreate() {
// //     const newJob = {
// //       id: `job_${Date.now()}`,
// //       title: "",
// //       openings: 1,
// //       level: "Mid",
// //       salary: "",
// //       posted: "just now",
// //       skills: [],
// //       description: "",
// //       responsibilities: [],
// //       qualifications: [],
// //       levels: [],
// //       logo: DEMO_LOGO,
// //       gradient: "linear-gradient(90deg,#2563eb,#06b6d4)",
// //     };
// //     openModal(newJob, "edit");
// //   }

// //   function handleSave(updatedJob) {
// //     setJobs((prev) => {
// //       const exists = prev.find((j) => j.id === updatedJob.id);
// //       if (exists) {
// //         return prev.map((j) => (j.id === updatedJob.id ? updatedJob : j));
// //       } else {
// //         return [updatedJob, ...prev];
// //       }
// //     });
// //     closeModal();
// //   }

// //   useEffect(() => {
// //     const fetch = async () => {
// //       const res = await axios.get(`${API_URL}/job/det`);
// //       console.log(res.data,`${API_URL}/job/det`)
// //       setJobs(res.data)
// //     };
// //     fetch()
// //   }, []);

// //   return (
// //     <div className="jh-page">
// //       <div className="jh-header">
// //         <div>
// //           <h1 className="jh-title">Open Roles</h1>
// //           <p className="jh-sub">
// //             Explore positions, levels and required skills.
// //           </p>
// //         </div>
// //         <div className="jh-actions">
// //           <button className="btn btn-ghost">Filter</button>
// //           {isAdmin ? (
// //             <button className="btn btn-primary" onClick={handleCreate}>
// //               Create Job
// //             </button>
// //           ) : (
// //             <button className="btn btn-primary">Saved</button>
// //           )}
// //         </div>
// //       </div>

// //       <div className="gridandside">
// //         <div className="jh-grid">
// //           {jobs.map((job) => (
// //             <JobCard
// //               key={job.id}
// //               job={job}
// //               isAdmin={isAdmin}
// //               onOpen={openModal}
// //             />
// //           ))}
// //         </div>

// //         <JobOpenings width={420} />
// //       </div>

// //       {showModal && activeJob && (
// //         <JobModal
// //           job={activeJob}
// //           isAdmin={isAdmin}
// //           mode={modalMode}
// //           onClose={closeModal}
// //           onSave={handleSave}
// //           onApply={(payload) => console.log("apply", payload)}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// // Job.jsx

// export default function Job() {
//   const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:4000";

//   const stored = (() => {
//     try {
//       return useSelector((state) => state.user);
//     } catch {
//       return null;
//     }
//   })();

//   const isAdmin = stored?.role === "admin";
//   const [jobs, setJobs] = useState([]);
//   const [activeJob, setActiveJob] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMode, setModalMode] = useState("view");

//   function openModal(job, mode = "view") {
//     setActiveJob(job);
//     setModalMode(mode);
//     setShowModal(true);
//     document.body.style.overflow = "hidden";
//   }

//   function closeModal() {
//     setShowModal(false);
//     setActiveJob(null);
//     setModalMode("view");
//     document.body.style.overflow = "";
//   }

//   // ✅ ADMIN: create new job (no id, Mongo will assign)
//   function handleCreate() {
//     const newJob = {
//       // no id yet
//       title: "",
//       company: "",
//       location: "",
//       openings: 1,
//       level: "Mid",
//       salary: "",
//       posted: "just now",
//       skills: [],
//       description: "",
//       responsibilities: [],
//       qualifications: [],
//       levels: [],
//       logo: DEMO_LOGO,
//       gradient: "linear-gradient(90deg,#2563eb,#06b6d4)",
//     };
//     openModal(newJob, "edit");
//   }

//   // ✅ ADMIN: save (create or update)
//   async function handleSave(updatedJob) {
//     try {
//       // existing job -> PUT
//       if (updatedJob.id) {
//         const { id, ...payload } = updatedJob;

//         const res = await axios.put(`${API_URL}/job/${id}`, payload);
//         const data = res.data;

//         if (data.deleted) {
//           // auto-removed because openings <= 0
//           setJobs((prev) => prev.filter((j) => j.id !== id));
//         } else {
//           setJobs((prev) =>
//             prev.map((j) => (j.id === data.id ? data : j))
//           );
//         }
//       } else {
//         // new job -> POST
//         const res = await axios.post(`${API_URL}/job`, updatedJob);
//         const created = res.data;
//         setJobs((prev) => [created, ...prev]);
//       }

//       closeModal();
//     } catch (err) {
//       console.error("Failed to save job", err);
//       alert(err.response?.data?.error || "Could not save job");
//     }
//   }

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/job/det`);
//         setJobs(res.data);
//       } catch (err) {
//         console.error("Error fetching jobs", err);
//       }
//     };
//     fetchJobs();
//   }, [API_URL]);

//   return (
//     <div className="jh-page">
//       {/* ...header and grid same as before... */}
//       <div className="jh-header">
//         <div>
//           <h1 className="jh-title">Open Roles</h1>
//           <p className="jh-sub">
//             Explore positions, levels and required skills.
//           </p>
//         </div>
//         <div className="jh-actions">
//           <button className="btn btn-ghost">Filter</button>
//           {isAdmin ? (
//             <button className="btn btn-primary" onClick={handleCreate}>
//               Create Job
//             </button>
//           ) : (
//             <button className="btn btn-primary">Saved</button>
//           )}
//         </div>
//       </div>

//       <div className="gridandside">
//         <div className="jh-grid">
//           {jobs.map((job) => (
//             <JobCard
//               key={job.id}
//               job={job}
//               isAdmin={isAdmin}
//               onOpen={openModal}
//             />
//           ))}
//         </div>

//         <JobOpenings width={420} jobs={jobs} />
//       </div>

//       {showModal && activeJob && (
//         <JobModal
//           job={activeJob}
//           isAdmin={isAdmin}
//           mode={modalMode}
//           onClose={closeModal}
//           onSave={handleSave}     
//           onApply={(payload) => console.log("apply", payload)}
//         />
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import "../styles/job.css";
import JobModal from "../components/jobmodal.jsx";
import JobOpenings from "../components/jobdata.jsx";
import JobCard from "../components/jobcard.jsx";
import { useSelector } from "react-redux";
import axios from "axios";

const DEMO_LOGO = "/mnt/data/f789f794-a831-49c7-9670-1b0ba0972984.png";

export default function Job() {
  const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:4000";

  const stored = (() => {
    try {
      return useSelector((state) => state.user);
    } catch {
      return null;
    }
  })();

  const isAdmin = stored?.role === "admin";
  const [jobs, setJobs] = useState([]);
  const [activeJob, setActiveJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");

  function openModal(job, mode = "view") {
    setActiveJob(job);
    setModalMode(mode);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setShowModal(false);
    setActiveJob(null);
    setModalMode("view");
    document.body.style.overflow = "";
  }

  function handleCreate() {
    const newJob = {
      title: "",
      company: "",
      location: "",
      openings: 1,
      level: "Mid",
      salary: "",
      posted: "just now",
      skills: [],
      description: "",
      responsibilities: [],
      qualifications: [],
      levels: [],
      logo: DEMO_LOGO,
      gradient: "linear-gradient(90deg,#2563eb,#06b6d4)",
    };
    openModal(newJob, "edit");
  }

  async function handleSave(updatedJob) {
    try {
      if (updatedJob.id) {
        const { id, ...payload } = updatedJob;

        const res = await axios.put(`${API_URL}/job/${id}`, payload);
        const data = res.data;

        if (data.deleted) {
          setJobs((prev) => prev.filter((j) => j.id !== id));
        } else {
          setJobs((prev) => prev.map((j) => (j.id === data.id ? data : j)));
        }
      } else {
        const res = await axios.post(`${API_URL}/job`, updatedJob);
        const created = res.data;
        setJobs((prev) => [created, ...prev]);
      }

      closeModal();
    } catch (err) {
      console.error("Failed to save job", err);
      alert(err.response?.data?.error || "Could not save job");
    }
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API_URL}/job/det`);
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };
    fetchJobs();
  }, [API_URL]);

  return (
    <div className="jh-page">
      <div className="jh-header">
        <div>
          <h1 className="jh-title">Open Roles</h1>
          <p className="jh-sub">Explore positions, levels and required skills.</p>
        </div>
        <div className="jh-actions">
          <button className="btn btn-ghost">Filter</button>
          {isAdmin ? (
            <button className="btn btn-primary" onClick={handleCreate}>
              Create Job
            </button>
          ) : (
            <button className="btn btn-primary">Saved</button>
          )}
        </div>
      </div>

      <div className="gridandside">
        <div className="jh-grid">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} isAdmin={isAdmin} onOpen={openModal} />
          ))}
        </div>

        <JobOpenings width={420} jobs={jobs} />
      </div>

      {showModal && activeJob && (
        <JobModal
          job={activeJob}
          isAdmin={isAdmin}
          mode={modalMode}
          onClose={closeModal}
          onSave={handleSave}
          onApply={(payload) => console.log("apply", payload)}
        />
      )}
    </div>
  );
}
