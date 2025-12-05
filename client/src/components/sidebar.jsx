import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const nav = useNavigate();
  const [active, setActive] = useState("dashboard");
  const user = useSelector((state) => state.user);
  const loc = useLocation();
  const path = loc.pathname;

  useEffect(() => {
    setActive(path.split("/")[2]);
  }, [path]);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-box">QH</div>
        <span>QueueHire</span>
      </div>

      {user.role === "admin" ? (
        <nav className="sidebar-menu">
          <button
            className={`menu-item ${active === "dashboard" ? "active" : ""}`}
            onClick={() => {
              nav("/admin/dashboard");
            }}
          >
            <span>Dashboard</span>
          </button>
          <button
            className={`menu-item ${active === "candidates" ? "active" : ""}`}
            onClick={() => {
              nav("/admin/candidates");
            }}
          >
            <span>Candidates</span>
          </button>
          <button
            className={`menu-item ${active === "calander" ? "active" : ""}`}
            onClick={() => {
              nav("/admin/calander");
            }}
          >
            <span>Calendar</span>
          </button>
          <button
            className={`menu-item ${active === "jobs" ? "active" : ""}`}
            onClick={() => {
              nav("/admin/jobs");
            }}
          >
            <span>Jobs</span>
          </button>
        </nav>
      ) : (
        <nav className="sidebar-menu">
          <button
            className={`menu-item ${active === "dashboard" ? "active" : ""}`}
            onClick={() => {
              nav("/user/dashboard");
            }}
          >
            <span>Dashboard</span>
          </button>
          <button
            className={`menu-item ${active === "progress" ? "active" : ""}`}
            onClick={() => {
              nav(`/user/progress/${user.id}`);
              console.log(`/user/progress/${user.id}`);
            }}
          >
            <span>Progress</span>
          </button>
          <button
            className={`menu-item ${active === "profile" ? "active" : ""}`}
            onClick={() => {
              nav(`/user/profile/${user._id}`);
            }}
          >
            <span>Profile</span>
          </button>
        </nav>
      )}
    </aside>
  );
}
