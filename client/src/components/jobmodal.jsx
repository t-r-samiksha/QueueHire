
import React, { useMemo, useState, useEffect } from "react";
import "../styles/jobmodal.css";
import { useSelector } from "react-redux";
import axios from "axios";

export default function JobModal({
  job,
  mode = "view",
  isAdmin = false,
  onClose = () => {},
  onSave = (updated) => {},
  onApply = (payload) => {},
  hasApplied
}) {


  console.log('jobmodel,job',job)

  const initial = useMemo(
    () => ({
      id: job?.id,
      title: job?.title || "",
      company: job?.company || "",
      location: job?.location || "",
      openings: job?.openings ?? 1,
      salary: job?.salary || "",
      description: job?.description || "",
      responsibilities: (job?.responsibilities || []).slice(),
      qualifications: (job?.qualifications || []).slice(),
      skills: (job?.skills || []).slice(),
      levels: (job?.levels || []).slice(),
      logo: job?.logo || "",
      gradient: job?.gradient || "linear-gradient(90deg,#2563eb,#06b6d4)",
      posted: job?.posted || "",
      applied: job?.applied ?? 0,
      shortlisted: job?.shortlisted ?? 0,
      level: job?.level || "",
    }),
    [job]
  );

  const [form, setForm] = useState(initial);
  useEffect(() => setForm(initial), [initial]);

  const [localMode, setLocalMode] = useState(mode);
  useEffect(() => setLocalMode(mode), [mode]);

  const editable = localMode === "edit" && isAdmin;

  const [applying, setApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const fileRef = React.useRef(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [serverMessage, setServerMessage] = useState(null);
  const user = useSelector((state) => state.user);
  console.log('jobmodel,user',user)

  function updateField(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  function updateArrayField(key, idx, value) {
    setForm((f) => {
      const arr = [...(f[key] || [])];
      arr[idx] = value;
      return { ...f, [key]: arr };
    });
  }

  function pushArrayField(key, value) {
    setForm((f) => ({ ...f, [key]: [...(f[key] || []), value] }));
  }

  function removeArrayField(key, idx) {
    setForm((f) => {
      const arr = [...(f[key] || [])];
      arr.splice(idx, 1);
      return { ...f, [key]: arr };
    });
  }

  function validateSave() {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.company.trim()) e.company = "Company is required";
    return e;
  }

  async function handleSave(e) {
    e?.preventDefault?.();
    const eobj = validateSave();
    if (Object.keys(eobj).length) {
      setErrors(eobj);
      return;
    }
    await onSave(form);
    setLocalMode("view");
  }

  async function handleApply(e) {
    e.preventDefault();
    setApplying(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      onApply?.({ jobId: job.id });
      setApplySuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setApplying(false);
    }
  }

  async function submitApplication(e) {
    e.preventDefault();
    if (!resumeFile && !job?.resumeUrl) {
      return alert("Attach resume (PDF) before applying.");
    }

    setApplying(true);
    setUploadProgress(0);
    setServerMessage(null);

    try {
      const fd = new FormData();
      if (resumeFile) fd.append("resume", resumeFile);
      fd.append("jobId", job.id||job._id);
      fd.append("userId", user.id ?? user?._id ?? "anon");
      fd.append("name", e.target.appName.value);
      fd.append("email", e.target.appEmail.value);
      fd.append("phone", e.target.appPhone.value);

      console.log('fd',
        'job._id',job._id,
        'user._id',user,
        'appName',e.target.appName.value,
        'appEmail',e.target.appEmail.value,
        'appPhone',e.target.appPhone.value)

      const resp = await axios.post(`${API_URL}/queue/apply`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (ev) => {
          if (ev.total) {
            setUploadProgress(Math.round((ev.loaded / ev.total) * 100));
          }
        },
      });

      const data = resp.data;
      setServerMessage("Application submitted — parsing started.");
      setApplySuccess(true);

      
      onApply?.({ jobId: job._id, applicationId: data.applicationId });
    } catch (err) {
      console.error(err);
      setServerMessage("Upload failed. Try again.");
    } finally {
      setApplying(false);
      setUploadProgress(0);
    }
  }
  function stop(ev) {
    ev.stopPropagation();
  }
  function btnPrevent(fn) {
    return (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      fn && fn(ev);
    };
  }

  function handleFilePick(e) {
    const f = e.target.files?.[0];
    if (f) {
      setResumeFile(f);
      setServerMessage(null);
    }
  }

  return (
    <div
      className="jm-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="jm-modal" onClick={stop}>
        <header className="jm-head">
          <div className="jm-left">
            <div
              className="jm-logo"
              style={{
                backgroundImage: form.logo ? `url(${form.logo})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-hidden
            >
              {!form.logo && (
                <span className="jm-logo-initial">
                  {(form.company || "").slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              {editable ? (
                <input
                  className="jm-title-input"
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Job title"
                />
              ) : (
                <h2 className="jm-title">{form.title}</h2>
              )}
              
            </div>
          </div>

          <div className="jm-actions">
            <div className="jm-meta-small">
              <div>
                <strong>{form.openings}</strong> openings
              </div>
              <div className="muted">{form.salary}</div>
            </div>

            {isAdmin &&
              (localMode === "edit" ? (
                <>
                  <button
                    className="jm-save"
                    onClick={() => {
                      console.log(form);
                      alert("save clicked");
                      onSave(form);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="jm-cancel"
                    onClick={btnPrevent(() => {
                      setForm(initial);
                      setLocalMode("view");
                      setErrors({});
                    })}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="jm-edit"
                  onClick={btnPrevent(() => setLocalMode("edit"))}
                >
                  Edit
                </button>
              ))}

            <button
              className="jm-close"
              onClick={onClose}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </header>

        <div className="jm-body">
          <main className="jm-main">
            <section className="jm-section">
              <div className="jm-section-head">
                <h3>Job description</h3>
              </div>

              {editable ? (
                <textarea
                  className="jm-textarea"
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={5}
                  placeholder="describe the role"
                />
              ) : (
                <p className="jm-desc">{form.description}</p>
              )}
            </section>

            <div className="jm-grid">
              <section className="jm-card">
                <h4>Responsibilities</h4>
                {editable ? (
                  <>
                    {form.responsibilities.map((r, i) => (
                      <div className="jm-row" key={i}>
                        <input
                          value={r}
                          onChange={(e) =>
                            updateArrayField(
                              "responsibilities",
                              i,
                              e.target.value
                            )
                          }
                          placeholder="Add resposibilities"
                        />
                        <button
                          className="small x"
                          onClick={btnPrevent(() =>
                            removeArrayField("responsibilities", i)
                          )}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      className="btn btn-ghost small"
                      onClick={btnPrevent(() =>
                        pushArrayField("responsibilities", "")
                      )}
                    >
                      + add
                    </button>
                  </>
                ) : (
                  <ul className="jm-list">
                    {form.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="jm-card">
                <h4>Qualifications</h4>
                {editable ? (
                  <>
                    {form.qualifications.map((q, i) => (
                      <div className="jm-row" key={i}>
                        <input
                          value={q}
                          onChange={(e) =>
                            updateArrayField(
                              "qualifications",
                              i,
                              e.target.value
                            )
                          }
                          placeholder="Add qualifications"
                        />
                        <button
                          className="small x"
                          onClick={btnPrevent(() =>
                            removeArrayField("qualifications", i)
                          )}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      className="btn btn-ghost small"
                      onClick={btnPrevent(() =>
                        pushArrayField("qualifications", "")
                      )}
                    >
                      + add
                    </button>
                  </>
                ) : (
                  <ul className="jm-list">
                    {form.qualifications.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                )}
              </section>
            </div>

            <section className="jm-section">
              <h4>Stages</h4>
              {editable ? (
                <>
                  <div className="jm-stages">
                    {form.levels.map((l, i) => (
                      <div className="jm-stage" key={i}>
                        <input
                          value={l}
                          onChange={(e) =>
                            updateArrayField("levels", i, e.target.value)
                          }
                          placeholder="Add stages"
                        />
                        <button
                          className="small x"
                          onClick={btnPrevent(() =>
                            removeArrayField("levels", i)
                          )}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn btn-ghost small"
                    onClick={btnPrevent(() =>
                      pushArrayField("levels", "")
                    )}
                  >
                    + add stage
                  </button>
                </>
              ) : (
                <ol className="jm-list jm-stagelist">
                  {form.levels.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ol>
              )}
            </section>
          </main>

          <aside className="jm-side">
            <div className="jm-side-card">
              <div className="jm-side-row">
                <div>
                  <strong>Openings</strong>
                </div>
                {editable ? (
                  <input
                    type="number"
                    min="1"
                    value={form.openings}
                    onChange={(e) =>
                      updateField("openings", Number(e.target.value))
                    }
                  />
                ) : (
                  <div>{form.openings}</div>
                )}
              </div>

              <div className="jm-side-row">
                <div>
                  <strong>Level</strong>
                </div>
                {editable ? (
                  <input
                    value={form.level}
                    onChange={(e) => updateField("level", e.target.value)}
                  />
                ) : (
                  <div>{form.level || "—"}</div>
                )}
              </div>

              <div className="jm-side-row">
                <div>
                  <strong>Salary</strong>
                </div>
                {editable ? (
                  <input
                    value={form.salary}
                    onChange={(e) => updateField("salary", e.target.value)}
                  />
                ) : (
                  <div>{form.salary}</div>
                )}
              </div>

              <div className="jm-divider" />

              <h5>Skills (matching freq)</h5>
              <div className="jm-skills">
                {form.skills.map((s, i) => (
                  <div className="jm-skill" key={i}>
                    <div className="jm-skill-left">
                      {editable ? (
                        <input
                          value={s.name}
                          placeholder="Add Skill"
                          onChange={(e) =>
                            updateArrayField("skills", i, {
                              ...s,
                              name: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <div className="muted">{s.name}</div>
                      )}
                    </div>
                    <div className="jm-skill-right">
                      {editable ? (
                        <input
                          type="number"
                          min="0"
                          value={s.freq}
                          // placeholder="Add Skill"
                          onChange={(e) =>
                            updateArrayField("skills", i, {
                              ...s,
                              freq: Number(e.target.value),
                            })
                          }
                        />
                      ) : (
                        <div className="skill-count">{s.freq}</div>
                      )}
                    </div>
                  </div>
                ))}
                {editable && (
                  <button
                    className="btn btn-ghost small"
                    onClick={btnPrevent(() =>
                      pushArrayField("skills", { name: "", freq: 0 })
                    )}
                  >
                    + add skill
                  </button>
                )}
              </div>
            </div>

            <div className="jm-side-card">
              {localMode === "apply" ? (
                applySuccess ? (
                  <div className="apply-success">
                    <h4>Application sent</h4>
                    <p className="muted">We’ll email you the next steps.</p>
                    <button className="btn btn-primary" onClick={onClose}>
                      Close
                    </button>
                  </div>
                ) : (
                  <form className="apply-form" onSubmit={submitApplication}>
                    <label className="label">
                      Your name
                      <input name="appName" defaultValue={user?.fullName} />
                    </label>

                    <label className="label">
                      Email
                      <input
                        name="appEmail"
                        type="email"
                        defaultValue={user?.email}
                      />
                    </label>

                    <label className="label">
                      Phone
                      <input name="appPhone" defaultValue={user?.phone ?? 0} />
                    </label>

                    <label className="file">
                      <input
                        ref={fileRef}
                        type="file"
                        accept=".pdf"
                        onChange={handleFilePick}
                      />
                      <div className="file-note">
                        {resumeFile ? resumeFile.name : "Attach resume (PDF)"}
                      </div>
                    </label>

                    {uploadProgress > 0 && (
                      <div className="upload-progress">
                        <div
                          className="progress-bar"
                          style={{ width: `${uploadProgress}%` }}
                        />
                        <div className="muted small">{uploadProgress}%</div>
                      </div>
                    )}

                    {serverMessage && (
                      <div className="muted small" style={{ marginTop: 8 }}>
                        {serverMessage}
                      </div>
                    )}

                    <div className="jm-cta-row">
                      <button className="btn btn-primary" disabled={applying}>
                        {applying ? "Applying…" : "Apply"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )
              ) : (
                <>
                  <div className="muted small">Preview</div>
                  <div className="jm-side-preview">
                    <div>
                      <strong>Posted:</strong> {form.posted || "—"}
                    </div>
                    <div>
                      <strong>Applicants:</strong> {form.applied ?? "—"}
                    </div>
                    <div>
                      <strong>Shortlisted:</strong> {form.shortlisted ?? "—"}
                    </div>
                  </div>

                  <div className="jm-cta-row">
                    {!isAdmin && (
                      <>
                        <button
                          className={`btn btn-primary ${hasApplied?"disabled":''}`}
                          onClick={btnPrevent(() => setLocalMode("apply"))}
                          disabled={hasApplied}
                        >
                          {hasApplied?"Applied":"Apply"}
                        </button>
                        <button className="btn btn-link" onClick={onClose}>
                          Close
                        </button>
                      </>
                    )}

                    
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
