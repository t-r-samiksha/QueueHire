import React from "react";
import "../styles/pipeline.css";


export default function HiringPipeline({
  items = [
    { key: "applied", label: "Applied", value: 156 },
    { key: "screened", label: "Screened", value: 89 },
    { key: "interviewed", label: "Interviewed", value: 34 },
    { key: "hired", label: "Hired", value: 23 },
  ],
  title = "Hiring Pipeline",
  subtitle = "Current stage distribution",
}) {
  console.log('inside pieplline',items)
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <section className="hp-card" aria-label="Hiring pipeline">
      <div className="hp-head">
        <h3 className="hp-title">{title}</h3>
        <div className="hp-sub">{subtitle}</div>
      </div>

      <div className="hp-body">
        {items.map((it) => {
          const pct = Math.round((it.value / max) * 100);
          return (
            <div className="hp-row" key={it.key}>
              <div className="hp-row-top">
                <div className="hp-label">{it.label}</div>
                <div className="hp-count">{it.value} candidates</div>
              </div>

              <div className="hp-track" role="progressbar" aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100">
                <div
                  className="hp-fill"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
