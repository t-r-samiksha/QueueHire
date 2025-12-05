import React, { useEffect, useMemo, useState } from "react";
import "../styles/candidates.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Candidates({
  items = null,
  onView = (id) => alert(id),
}) {
  const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:4000";
  console.log("API_URL ->", API_URL);

  const sample = [
    {
      id: "c1",
      fullName: "Arjun Patel",
      email: "arjun@example.com",
      score: 85,
      status: "selected",
      avatar: "",
      position: "Frontend",
    },
    {
      id: "c2",
      fullName: "Priya Sharma",
      email: "priya@example.com",
      score: 78,
      status: "selected",
      avatar: "",
      position: "UI/UX",
    },
    {
      id: "c3",
      fullName: "Aman Singh",
      email: "aman@example.com",
      score: 67,
      status: "needs_review",
      avatar: "",
      position: "Data",
    },
    {
      id: "c4",
      fullName: "Neha Verma",
      email: "neha@example.com",
      score: 92,
      status: "selected",
      avatar: "",
      position: "Backend",
    },
    {
      id: "c5",
      fullName: "Rohan Das",
      email: "rohan@example.com",
      score: 74,
      status: "rejected",
      avatar: "",
      position: "Frontend",
    },
    {
      id: "c6",
      fullName: "Ananya Gupta",
      email: "ananya@example.com",
      score: 88,
      status: "selected",
      avatar: "",
      position: "PM",
    },
    {
      id: "c7",
      fullName: "Rahul Joshi",
      email: "rahul@example.com",
      score: 70,
      status: "rejected",
      avatar: "",
      position: "DevOps",
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    async function load() {
      console.log(`${API_URL}/candidates/det`);
      try {
        const res = await axios.get(`${API_URL}/candidates/det`);
        console.log(res.data);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    load();
  }, []);

  const nav = useNavigate();

  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalFilters, setModalFilters] = useState({
    status: "any",
    position: "",
    scoreMin: "",
    scoreMax: "",
  });

  const positions = useMemo(() => {
    const set = new Set();
    data.forEach((d) => d.position && set.add(d.position));
    return [...set];
  }, [data]);

  const filtered = useMemo(() => {
    const qLower = q.trim().toLowerCase();
    const min = modalFilters.scoreMin ? Number(modalFilters.scoreMin) : null;
    const max = modalFilters.scoreMax ? Number(modalFilters.scoreMax) : null;

    return data
      .filter((c) => {
        if (filter === "hired") return c.status === "hired";
        if (filter === "selected") return c.status === "selected";
        if (filter === "rejected") return c.status === "rejected";
        if (filter === "needs_review") return c.status === "needs_review";
        if (filter === "in_progress") return c.status === "in_progress";
        return true;
      })
      .filter((c) => {
        if (!qLower) return true;
        return (
          c.fullName.toLowerCase().includes(qLower) ||
          c.email.toLowerCase().includes(qLower) ||
          c.position.toLowerCase().includes(qLower)
        );
      })
      .filter((c) => {
        if (modalFilters.status !== "any")
          return c.status === modalFilters.status;
        return true;
      })
      .filter((c) => {
        if (modalFilters.position) {
          return c.position
            .toLowerCase()
            .includes(modalFilters.position.toLowerCase());
        }
        return true;
      })
      .filter((c) => {
        if (min !== null && max !== null)
          return c.score >= min && c.score <= max;
        if (min !== null) return c.score >= min;
        if (max !== null) return c.score <= max;
        return true;
      });
  }, [data, filter, q, modalFilters]);

  return (
    <main className="candidates-page">
      <header className="candidates-header">
        <div className="header-controls">
          <nav className="cand-tabs">
            <button
              className={`tab ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`tab ${filter === "selected" ? "active" : ""}`}
              onClick={() => setFilter("selected")}
            >
              Selected
            </button>
            <button
              className={`tab ${filter === "rejected" ? "active" : ""}`}
              onClick={() => setFilter("rejected")}
            >
              Rejected
            </button>
            <button
              className={`tab ${filter === "needs_review" ? "active" : ""}`}
              onClick={() => setFilter("needs_review")}
            >
              Needs Review
            </button>
            <button
              className={`tab ${filter === "in_progress" ? "active" : ""}`}
              onClick={() => setFilter("in_progress")}
            >
              In Progress
            </button>
            
          </nav>

          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="search"
              className="search"
              placeholder="Search name, email or position..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{ marginRight: 12 }}
            />
            <button
              className="btn btn-outline"
              onClick={() => setModalOpen(true)}
            >
              Filter
            </button>
          </div>
        </div>
      </header>

      <section className="cand-table">
        <div className="cand-row cand-head">
          <div className="col name-col">Name</div>
          <div className="col email-col">Email</div>
          <div className="col score-col">Score</div>
          <div className="col status-col">Status</div>
          <div className="col action-col">Actions</div>
        </div>

        {filtered.length === 0 && (
          <div className="cand-empty">No candidates found.</div>
        )}

        {filtered.map((c) => (
          <article key={c.id} className="cand-row" tabIndex={0}>
            <div className="col name-col">
              <div className="cand-avatar cand-initials">
                {c.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="name-block">
                <div className="cand-name">{c.fullName}</div>
                <div className="cand-position muted">{c.position}</div>
              </div>
            </div>

            <div className="col email-col">{c.email}</div>
            <div className="col score-col">
              <span className="score-pill">{c.score}</span>
            </div>
            <div className="col status-col">
              <span className={`badge status-${c.status}`}>
                {c.status}
              </span>
            </div>

            <div className="col action-col">
              <button
                className="view-link"
                onClick={() => nav(`/admin/candidate-det/${c.id}`)}
              >
                View
              </button>
            </div>
          </article>
        ))}
      </section>

      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Advanced Filters</h2>

            <div className="modal-row">
              <label>Status</label>
              <select
                value={modalFilters.status}
                onChange={(e) =>
                  setModalFilters((s) => ({ ...s, status: e.target.value }))
                }
              >
                <option value="any">Any</option>
                <option value="selected">Selected</option>
                <option value="rejected">Rejected</option>
                <option value="needs_review">Needs Review</option>
                <option value="needs_review">hired</option>
                <option value="needs_review">in_progress</option>
              </select>
            </div>

            <div className="modal-row">
              <label>Position</label>
              <input
                list="pos-list"
                value={modalFilters.position}
                onChange={(e) =>
                  setModalFilters((s) => ({ ...s, position: e.target.value }))
                }
              />
              <datalist id="pos-list">
                {positions.map((p) => (
                  <option key={p} value={p} />
                ))}
              </datalist>
            </div>

            <div className="modal-row">
              <label>Score Range</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="number"
                  placeholder="Min"
                  value={modalFilters.scoreMin}
                  onChange={(e) =>
                    setModalFilters((s) => ({ ...s, scoreMin: e.target.value }))
                  }
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={modalFilters.scoreMax}
                  onChange={(e) =>
                    setModalFilters((s) => ({ ...s, scoreMax: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() =>
                  setModalFilters({
                    status: "any",
                    position: "",
                    scoreMin: "",
                    scoreMax: "",
                  })
                }
              >
                Clear
              </button>

              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setModalOpen(false)}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
