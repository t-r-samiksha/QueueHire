import React from "react";
import "../styles/jobdata.css";

// export default function JobOpenings({ jobs: propJobs , width}) {
//   const jobs = propJobs ?? MOCK_JOBS;

//   const maxApplied = Math.max(...jobs.map(j => j.applied), 1);

//   return (
//     <section className="job-card" aria-labelledby="job-openings-title" style={width ? { width } : undefined}>
//       <div className="job-card-header">
//         <div>
//           <h3 id="job-openings-title" className="job-title">Job Openings Status</h3>
//           <div className="job-sub">Applicants per role</div>
//         </div>
//         {/* <button className="job-action">Create Job</button> */}
//       </div>

//       <div className="job-list">
//         {jobs.map(job => (
//           <div className="job-row" key={job.id}>
//             <div className="job-left">
//               <div className="job-name">{job.title}</div>
//               <div className="job-meta">Openings: {job.openings}</div>
//             </div>

//             {/* <div className="job-mid">
//               <div className="job-bar-wrap" aria-hidden>
//                 <div
//                   className="job-bar"
//                   style={{ width: `${(job.applied / maxApplied) * 100}%` }}
//                 />
//               </div>
//             </div> */}

//             <div className="job-right">
//               <div className="job-stats">
//                 <span className="stat applied">{job.applied}</span>
//                 <span className="stat short">{job.shortlisted}</span>
//                 <span className="stat hired">{job.hired}</span>
//               </div>
//               {/* <button className="job-view" onClick={() => alert(`Open job ${job.title}`)}>View</button> */}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* <div className="job-footer">
//         <small className="muted">Tip: click View to manage applicants for a job.</small>
//       </div> */}
//       <div className="job-footer">
//   <div className="job-legend">
//     <span className="legend-item">
//       <span className="legend-dot applied-dot" /> Applied
//     </span>
//     <span className="legend-item">
//       <span className="legend-dot short-dot" /> Shortlisted
//     </span>
//     <span className="legend-item">
//       <span className="legend-dot hired-dot" /> Hired
//     </span>
//   </div>
//   {/* <small className="muted">Tip: click View to manage applicants for a job.</small> */}
// </div>

//     </section>
//   );
// }

// // mock data
// const MOCK_JOBS = [
//   { id: "j1", title: "Frontend Developer", openings: 3, applied: 86, shortlisted: 12, hired: 2 },
//   { id: "j2", title: "Backend Engineer", openings: 2, applied: 76, shortlisted: 18, hired: 3 },
//   { id: "j3", title: "UI/UX Designer", openings: 1, applied: 43, shortlisted: 5, hired: 0 },
//   { id: "j4", title: "Product Manager", openings: 1, applied: 29, shortlisted: 4, hired: 1 },
// ];

export default function JobOpenings({ jobs = [], width }) {
  if (!jobs.length) {
    return (
      <section className="job-card" style={{ width }}>
        <h3>No jobs yet</h3>
      </section>
    );
  }

  const maxApplied = Math.max(...jobs.map(j => j.applied ?? 0), 1);

  return (
    <section
      className="job-card"
      aria-labelledby="job-openings-title"
      style={width ? { width } : undefined}
    >
      <div className="job-card-header">
        <div>
          <h3 id="job-openings-title" className="job-title">
            Job Openings Status
          </h3>
          <div className="job-sub">Applicants per role</div>
        </div>
      </div>

      <div className="job-list">
        {jobs.map((job) => (
          <div className="job-row" key={job.id}>
            <div className="job-left">
              <div className="job-name">{job.title}</div>
              <div className="job-meta">Openings: {job.openings}</div>
            </div>

            <div className="job-right">
              <div className="job-stats">
                <span className="stat applied">{job.applied ?? 0}</span>
                <span className="stat short">{job.shortlisted ?? 0}</span>
                <span className="stat hired">{job.hired ?? 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="job-footer">
        <div className="job-legend">
          <span className="legend-item">
            <span className="legend-dot applied-dot" /> Applied
          </span>
          <span className="legend-item">
            <span className="legend-dot short-dot" /> Shortlisted
          </span>
          <span className="legend-item">
            <span className="legend-dot hired-dot" /> Hired
          </span>
        </div>
      </div>
    </section>
  );
}
