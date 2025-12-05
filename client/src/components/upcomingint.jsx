import React from "react";
import "../styles/upcomingint.css";

export default function UpcomingInterviews({ list = null }) {
  const data = (list && list.length ? list : [])
    .slice(0, 3)
    .sort((a, b) => new Date(a.timeISO) - new Date(b.timeISO));

  return (
    <section className="ui-card" aria-labelledby="upcoming-title">
      <div className="ui-header">
        <h3 id="upcoming-title" className="ui-title">
          Upcoming Interviews
        </h3>
        <div className="ui-sub">Next {data.length} scheduled</div>
      </div>

      {data.length!=0 ? (
        <div className="ui-list">
          {data.map((item) => {
            const dt = new Date(item.timeISO);
            const timeStr = dt.toLocaleString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            });

            return (
              <div className="ui-row" key={item.id}>
                <div className="ui-left">
                  {item.avatar ? (
                    <img
                      className="ui-avatar"
                      src={item.avatar}
                      alt={item.candidateName}
                    />
                  ) : (
                    <div className="ui-avatar ui-avatar--initials">
                      {item.candidateName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase() || "NA"}
                    </div>
                  )}
                  <div className="ui-meta">
                    <div className="ui-name">{item.candidateName}</div>
                    <div className="ui-role">{item.role}</div>
                  </div>
                </div>

                <div className="ui-center">
                  <div className="ui-time">{timeStr}</div>
                 
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <p className="ui-empty muted small">No upcoming interviews.</p>
      )}

    
    </section>
  );
}


const MOCK = [
  {
    id: "i1",
    candidateName: "Alex Morgan",
    role: "Frontend Developer",
    timeISO: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(), // +2h
    avatar: "",
    // mode: "remote",
    // joinUrl: "https://zoom.us/j/123456789"
  },
  {
    id: "i2",
    candidateName: "Lisa Wong",
    role: "UI/UX Designer",
    timeISO: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString(), // +26h
    avatar: "",
    // mode: "onsite",
    // joinUrl: ""
  },
  {
    id: "i3",
    candidateName: "James Kim",
    role: "Backend Engineer",
    timeISO: new Date(Date.now() + 1000 * 60 * 60 * 40).toISOString(), // +40h
    avatar: "",
    // mode: "remote",
    // joinUrl: "https://meet.google.com/abc-defg-hij"
  },
];
