import React from "react";
import "../styles/recentuploads.css";

export default function RecentUploads({ list = [] }) {

  function formatPrettyDate(isoString) {
  const date = new Date(isoString);

  const formatted = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return formatted.replace(", ", " • ");
}


  return (
    <section className="recent-card" aria-labelledby="recent-title">
      <div className="recent-header">
        <div>
          <h3 id="recent-title" className="recent-title">
            Recent Uploads
          </h3>
          <div className="recent-sub">Latest resumes submitted</div>
        </div>
      </div>

      <div className="recent-list">
        {list.map((item, i) => (
          <div className="recent-item" key={item.id || i}>
            <div className="recent-left">
              {item.avatar ? (
                <img
                  className="recent-avatar"
                  src={item.avatar || item.pfp || defaultAvatar()}
                  alt={`${item.name} avatar`}
                />
              ) : (
                <div className="ui-avatar ui-avatar--initials">
                    {item.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase() || "NA"}
                  </div>
              )}
              <div className="recent-meta">
                <div className="recent-name">{item.name}</div>
                <div className="recent-role">
                  {item.role || item.position || "Applicant"}
                </div>
              </div>
            </div>

            <div className="recent-time">
              {formatPrettyDate(item.time)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

