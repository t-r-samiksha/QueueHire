// import DashCard from "../components/dashcard";
// import Sidebar from "../components/sidebar";
// import "../styles/dashboard.css";
// import RecentUploads from "../components/recentuploads.jsx";
// import HiringPipeline from "../components/pipeline.jsx";
// import JobOpenings from "../components/jobdata.jsx";
// import SkillDistribution from "../components/skill.jsx";
// import UpcomingInterviews from "../components/upcomingint.jsx";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import TopBar from "../components/topbar.jsx";
// import { useSelector } from "react-redux";

// // const recent = [
// //   {
// //     id: "r1",
// //     name: "Alex Morgan",
// //     role: "Frontend Developer",
// //     time: "5m ago",
// //     avatar: "https://randomuser.me/api/portraits/men/32.jpg"
// //   },
// //   {
// //     id: "r2",
// //     name: "Lisa Wong",
// //     role: "UI/UX Designer",
// //     time: "12m ago",
// //     avatar: "https://randomuser.me/api/portraits/women/45.jpg"
// //   },
// //   {
// //     id: "r3",
// //     name: "James Kim",
// //     role: "Backend Engineer",
// //     time: "35m ago",
// //     avatar: ""
// //   },
// //   // {
// //   //   id: "r4",
// //   //   name: "Emily Chen",
// //   //   role: "Data Analyst",
// //   //   time: "1h ago",
// //   //   avatar: "https://randomuser.me/api/portraits/women/28.jpg"
// //   // },
// //   // {
// //   //   id: "r5",
// //   //   name: "John Lee",
// //   //   role: "Full Stack Developer",
// //   //   time: "2h ago",
// //   //   avatar: ""
// //   // }
// // ];

// function Dashboard() {
//   // const user = localStorage.getItem("user");
//   const user = useSelector((state)=>state.user)
//   const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

//   const [summary, setSummary] = useState(null);
//   const [recent, setRecent] = useState([]);
//   const [pipelineData, setPipelineData] = useState(null);
//   const [jobsData, setJobsData] = useState([]);
//   const [skillsData, setSkillsData] = useState([]);
//   const [upcoming, setUpcoming] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState("");

//   useEffect(() => {
//     // let mounted = true;
//     console.log("useef");
//     async function load() {
//       setLoading(true);
//       // setError("");
//       try {
//         const [sumRes, uploadsRes, pipeRes, jobsRes, skillsRes, upcomingRes] =
//           await Promise.all([
//             axios.get(`${API}/dash/reports/summary`),
//             axios.get(`${API}/dash/uploads/recent`),
//             axios.get(`${API}/dash/pipeline`),
//             axios.get(`${API}/dash/jobs`),
//             axios.get(`${API}/dash/skills`),
//             axios.get(`${API}/dash/interviews/upcoming?limit=3`),
//           ]);

//         console.log('upcnung',upcomingRes);

//         // if (!mounted) return;
//         setSummary(sumRes.data || null);
//         setRecent(uploadsRes.data?.items || []);
//         setPipelineData(pipeRes.data.items || null);
//         setJobsData(jobsRes.data.jobs || []);
//         setSkillsData(skillsRes.data?.skills || []);
//         setUpcoming(upcomingRes.data?.items || []);
//       } catch (err) {
//         console.error("Dashboard load error", err);
//         // if (mounted) setError("Failed to load dashboard data");
//       } finally {
//         setLoading(false);
//       }
//     }

//     load();
//     // return () => { mounted = false; };
//   }, []);

//   return (
//     // <div className="fulldash" style={{ display: "flex" }}>
//       // <div>
//       //   <Sidebar />
//       // </div>
//       // <div>
//       //   <TopBar title="Dashboard" subtitle="Automated Resume Screening" />
//         <div className="dashboard-wrapper">
//           <div className="dc-cont">
//             <DashCard
//               title="Total Applicants"
//               qty={summary?.totalCandidates ?? 0}
//               icon="https://cdn-icons-png.flaticon.com/128/18898/18898499.png"
//             />
//             <DashCard
//               title="Selected"
//               qty={summary?.selected ?? 0}
//               icon="https://cdn-icons-png.flaticon.com/128/10995/10995865.png"
//             />
//             <DashCard
//               title="Pending Review"
//               qty={summary?.review ?? 0}
//               icon="https://cdn-icons-png.flaticon.com/128/5835/5835291.png"
//             />
//             <DashCard
//               title="In Queue"
//               qty={summary?.inQueue ?? 0}
//               icon="https://cdn-icons-png.flaticon.com/128/17552/17552442.png"
//             />
//           </div>
//           {/* <div className="recent">
//           <h3 className="recent-title">Recent Uploads</h3>
//           {recent.map((r) => (
//             <div className="recent-ind">
//                 <div style={{display:"flex"}}>
//                 <img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg" alt="icon" className="pfp" height={30} />
//               <span>{r.name}</span>
//               </div>
//               <span>{r.status}</span>
//             </div>
//           ))}
//         </div> */}
//           <div style={{ display: "flex", gap: 20 }}>
//             <RecentUploads list={recent} />
//             {pipelineData ? <HiringPipeline items={pipelineData} /> : <></>}
//           </div>

//           <div style={{ display: "flex", marginTop: 20 }}>
//             <JobOpenings jobs={jobsData} />
//             <div
//               style={{
//                 display: "flex",
//                 gap: 20,
//                 marginTop: 12,
//                 flexDirection: "column",
//                 // alignItems:'start'
//               }}
//             >
//               <UpcomingInterviews list={upcoming} />
//               <SkillDistribution skills={skillsData} />
//             </div>
//           </div>

//           {/* <div style={{display:'flex'}}> */}

//           {/* <div
//           style={{
//             display: "flex",
//             gap: 20,
//             marginTop: 12,
//             // flexDirection: "column",
//           }}
//         >
//           <JobOpenings />
//           <UpcomingInterviews />
//           <SkillDistribution />
//         </div> */}
//           {/* </div> */}
//         </div>
//       // </div>
//     // </div>
//   );
// }
// export default Dashboard;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import DashCard from "../components/dashcard";
// // import Sidebar from "../components/sidebar";
// // import "../styles/dashboard.css";
// // import RecentUploads from "../components/recentuploads.jsx";
// // import HiringPipeline from "../components/pipeline.jsx";
// // import JobOpenings from "../components/jobdata.jsx";
// // import SkillDistribution from "../components/skill.jsx";
// // import UpcomingInterviews from "../components/upcomingint.jsx";

// // const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

// // export default function Dashboard() {

// //   return (
// //     <div className="fulldash" style={{ display: "flex" }}>
// //       <Sidebar />

// //       <div className="dashboard-wrapper">
// //         <h1>Dashboard</h1>
// //         <p>Automated Resume Screening</p>

// //         <div className="dc-cont">
// //           <DashCard
// //             title="Total Applicants"
// //             qty={summary?.totalCandidates ?? 0}
// //             icon="https://cdn-icons-png.flaticon.com/128/18898/18898499.png"
// //           />
// //           <DashCard
// //             title="Selected"
// //             qty={summary?.hired ?? 0}
// //             icon="https://cdn-icons-png.flaticon.com/128/10995/10995865.png"
// //           />
// //           <DashCard
// //             title="Pending Review"
// //             qty={summary?.inQueue ?? 0}
// //             icon="https://cdn-icons-png.flaticon.com/128/5835/5835291.png"
// //           />
// //           <DashCard
// //             title="In Queue"
// //             qty={summary?.scheduled ?? 0}
// //             icon="https://cdn-icons-png.flaticon.com/128/17552/17552442.png"
// //           />
// //         </div>

// //         {loading ? (
// //           <div style={{ padding: 24 }}>Loading dashboard...</div>
// //         ) : error ? (
// //           <div style={{ padding: 24, color: "crimson" }}>{error}</div>
// //         ) : (
// //           <>
// //             <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
// //               <RecentUploads list={recent} />
// //               <HiringPipeline data={pipelineData} />
// //             </div>

// //             <div style={{ display: "flex", marginTop: 20, gap: 20 }}>
// //               <JobOpenings jobs={jobsData} />
// //               <div style={{ display: "flex", gap: 20, marginTop: 12, flexDirection: "column" }}>
// //                 <UpcomingInterviews list={upcoming} />
// //                 <SkillDistribution skills={skillsData} />
// //               </div>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


import DashCard from "../components/dashcard";
import Sidebar from "../components/sidebar";
import "../styles/dashboard.css";
import RecentUploads from "../components/recentuploads.jsx";
import HiringPipeline from "../components/pipeline.jsx";
import JobOpenings from "../components/jobdata.jsx";
import SkillDistribution from "../components/skill.jsx";
import UpcomingInterviews from "../components/upcomingint.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import TopBar from "../components/topbar.jsx";
import { useSelector } from "react-redux";

function Dashboard() {
  const user = useSelector((state) => state.user);
  const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const [summary, setSummary] = useState(null);
  const [recent, setRecent] = useState([]);
  const [pipelineData, setPipelineData] = useState(null);
  const [jobsData, setJobsData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        const [sumRes, uploadsRes, pipeRes, jobsRes, skillsRes, upcomingRes] =
          await Promise.all([
            axios.get(`${API}/dash/reports/summary`),
            axios.get(`${API}/dash/uploads/recent`),
            axios.get(`${API}/dash/pipeline`),
            axios.get(`${API}/dash/jobs`),
            axios.get(`${API}/dash/skills`),
            axios.get(`${API}/dash/interviews/upcoming?limit=3`),
          ]);

        setSummary(sumRes.data || null);
        setRecent(uploadsRes.data?.items || []);
        setPipelineData(pipeRes.data.items || null);
        setJobsData(jobsRes.data.jobs || []);
        setSkillsData(skillsRes.data?.skills || []);
        setUpcoming(upcomingRes.data?.items || []);
      } catch (err) {
        console.error("Dashboard load error", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dc-cont">
        <DashCard
          title="Total Applicants"
          qty={summary?.totalCandidates ?? 0}
          icon="https://cdn-icons-png.flaticon.com/128/18898/18898499.png"
        />
        <DashCard
          title="Selected"
          qty={summary?.selected ?? 0}
          icon="https://cdn-icons-png.flaticon.com/128/10995/10995865.png"
        />
        <DashCard
          title="Pending Review"
          qty={summary?.review ?? 0}
          icon="https://cdn-icons-png.flaticon.com/128/5835/5835291.png"
        />
        <DashCard
          title="In Queue"
          qty={summary?.inQueue ?? 0}
          icon="https://cdn-icons-png.flaticon.com/128/17552/17552442.png"
        />
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        <RecentUploads list={recent} />
        {pipelineData && <HiringPipeline items={pipelineData} />}
      </div>

      <div style={{ display: "flex", marginTop: 20 }}>
        <JobOpenings jobs={jobsData} />
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 12,
            flexDirection: "column",
          }}
        >
          <UpcomingInterviews list={upcoming} />
          <SkillDistribution skills={skillsData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
