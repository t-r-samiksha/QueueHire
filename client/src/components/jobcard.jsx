
import React from "react";
import "../styles/jobcard.css";

export default function JobCard({
  job,
  isAdmin = false,
  onOpen = () => {},
  width,
  hasApplied,
  flag,
  toggleSave,
  jid,
}) {
  return (
    <article className="jh-card" key={job._id} style={width && { width }}>
      <div className="jh-card-left">
        <div
          className="jh-logo"
          style={{
            backgroundImage: `url(${
              job.logo || "/mnt/data/f789f794-a831-49c7-9670-1b0ba0972984.png"
            })`,
          }}
        />
        <div className="jh-meta">
          <div className="jh-role">{job.title || "Untitled Role"}</div>
          <div className="muted small">
            Posted {job.posted || "—"} • {job.level || "—"}
          </div>
        </div>
      </div>

      <div className="jh-card-right">
        <div className="jh-top">
          <div
            className="jh-openings"
            style={{
              background:
                job.gradient || "linear-gradient(90deg,#2563eb,#06b6d4)",
            }}
          >
            {job.openings ?? 1} openings
          </div>
          <div className="jh-salary">{job.salary || "—"}</div>
        </div>

        <div className="jh-skills">
          {(job.skills || []).map((s) => (
            <div className="jh-skill" key={s.name}>
              <div className="skill-head">
                <span className="skill-name">{s.name}</span>
                <span className="skill-count">{s.freq}</span>
              </div>
              <div className="skill-track">
                <div
                  className="skill-fill"
                  style={{ width: `${Math.min(100, s.freq)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="jh-card-footer">
          {isAdmin ? (
            <>
              <button
                className="btn btn-primary"
                onClick={() => onOpen(job, "edit")}
              >
                Manage
              </button>
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <button
                  className="btn btn-link"
                  style={{ paddingLeft: 10 }} 
                  onClick={() => toggleSave(jid)}
                >
                  {flag}
                </button>
              </div>

              <button
                className={`btn btn-primary ${hasApplied ? "disabled" : ""}`}
                onClick={() => onOpen(job, "apply")}
                disabled={hasApplied}
              >
                {hasApplied ? "Applied" : "Apply"}
              </button>
            </>
          )}
          <button className="btn btn-link" onClick={() => onOpen(job, "view")}>
            Details
          </button>
        </div>
      </div>
    </article>
  );
}
