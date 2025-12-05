
import React from "react";
import "../styles/skill.css";

export default function SkillBarGraph({ skills: propSkills, maxBars = 6 }) {
  const data = (propSkills && propSkills.length ? propSkills : [])
    .sort((a, b) => b.count - a.count)
    .slice(0, maxBars);

  const maxCount = Math.max(...data.map(s => s.count), 1);

  return (
    <section className="skill-bar-card">
      <h3 className="sb-title">Skill Distribution</h3>
      <p className="sb-sub">Top applicant skills</p>

      <div className="sb-graph">
        {data.map((s, i) => {
          const height = (s.count / maxCount) * 100;
          return (
            <div className="sb-item" key={s.name}>
              <div className="sb-bar-wrap">
                <div
                  className="sb-bar"
                  style={{
                    height: `${height}%`,
                    background: `linear-gradient(to bottom, #ec4899,#a855f7)`,
                    
                  }}
                  title={`${s.count} applicants`}
                ></div>
              </div>
              <div className="sb-count">{s.count}</div>
              <div className="sb-label">{s.name}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// const MOCK = [
//   { name: "React", count: 54 },
//   { name: "Python", count: 48 },
//   { name: "Node", count: 31 },
//   { name: "Figma", count: 22 },
//   { name: "TypeScript", count: 20 },
// //   { name: "AWS", count: 16 },
// ];
