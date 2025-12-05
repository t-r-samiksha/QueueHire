// import React, { useEffect, useState, useRef } from "react";
// import "../styles/profile.css";
// import {
//   useGetProfileQuery,
//   useSaveProfileMutation,
// } from "../api/profileslice";
// import { useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setUser as setUserAction } from "../store/userslice";

// export default function Profile() {
//   const [user, setUser] = useState({
//     id: "",
//     fullName: "",
//     title: "",
//     email: "",
//     phone: "",
//     location: "",
//     about: "",
//     skills: [],
//     resumeName: null,
//     resumeUrl: null,
//   });

//   const { id } = useParams();
//   const dispatch = useDispatch();

//   const [editing, setEditing] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const fileRef = useRef(null);

//   const { data: profileData } = useGetProfileQuery(id);
//   const [saveProfileApi] = useSaveProfileMutation();

//   const [newSkill, setNewSkill] = useState("");
//   const [addingSkill, setAddingSkill] = useState(false);

//   // 1) Hydrate from localStorage on mount
//   useEffect(() => {
//     const saved = (() => {
//       try {
//         return JSON.parse(localStorage.getItem("qh_user")) || null;
//       } catch {
//         return null;
//       }
//     })();
//     if (saved) setUser(saved);
//   }, []);

//   // 2) Override with server data when available
//   useEffect(() => {
//     if (profileData) {
//       setUser((prev) => ({ ...prev, ...profileData }));
//       localStorage.setItem("qh_user", JSON.stringify(profileData));
//       // dispatch(setUserAction(profileData));
//     }
//   }, [profileData,dispatch]);

//   // 3) Keep localStorage in sync
//   useEffect(() => {
//     localStorage.setItem("qh_user", JSON.stringify(user));
//   }, [user]);

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setUser((prev) => ({ ...prev, [name]: value }));
//   }

//   // function addSkill() {
//   //   const name = prompt("Add skill");
//   //   if (name && name.trim()) {
//   //     setUser((p) => ({ ...p, skills: [...p.skills, name.trim()] }));
//   //   }
//   // }

//   function addSkill() {
//     setAddingSkill(true);
//     setNewSkill("");
//   }

//   function saveNewSkill() {
//     if (newSkill.trim()) {
//       setUser((prev) => ({
//         ...prev,
//         skills: [...prev.skills, newSkill.trim()],
//       }));
//     }
//     setAddingSkill(false);
//   }

//   function removeSkill(i) {
//     setUser((p) => ({
//       ...p,
//       skills: p.skills.filter((_, idx) => idx !== i),
//     }));
//   }

//   function startEdit() {
//     setEditing(true);
//   }

//   function cancelEdit() {
//     setEditing(false);
//     const saved = (() => {
//       try {
//         return JSON.parse(localStorage.getItem("qh_user")) || null;
//       } catch {
//         return null;
//       }
//     })();
//     if (saved) setUser(saved);
//   }

//   async function saveProfile(e) {
//     e?.preventDefault?.();
//     setSaving(true);
//     try {
//       console.log(user);
//       const res = await saveProfileApi(user).unwrap();
//       // dispatch(setUser(res));
//       // setUser
// console.log('this is the res pf suer updated in PROFILE',res)
//       setUser(res);
//       dispatch(setUserAction(res));
//       localStorage.setItem("qh_user", JSON.stringify(res));

//       setEditing(false);
//     } catch (err) {
//       console.error("Save profile error:", err);
//     } finally {
//       setSaving(false);
//     }
//   }

//   function handleFilePick(e) {
//     const f = e.target.files?.[0];
//     if (!f) return;
//     uploadResume(f);
//   }

//   function simulateUpload(file) {
//     return new Promise((resolve) => {
//       setUploading(true);
//       setUploadProgress(6);
//       const t = setInterval(() => {
//         setUploadProgress((p) => {
//           const next = Math.min(100, Math.floor(p + Math.random() * 18));
//           if (next >= 100) {
//             clearInterval(t);
//             setTimeout(() => {
//               setUploading(false);
//               setUploadProgress(0);
//               resolve(true);
//             }, 300);
//           }
//           return next;
//         });
//       }, 220);
//     });
//   }

//   async function uploadResume(file) {
//     await simulateUpload(file);
//     const url = URL.createObjectURL(file);
//     setUser((p) => ({ ...p, resumeName: file.name, resumeUrl: url }));
//   }

//   function downloadResume() {
//     if (!user.resumeUrl) return;
//     const a = document.createElement("a");
//     a.href = user.resumeUrl;
//     a.download = user.resumeName || "resume.pdf";
//     a.click();
//   }

//   function removeResume() {
//     setUser((p) => ({ ...p, resumeName: null, resumeUrl: null }));
//   }

//   return (
//     <div className="up-wrapper">
//       <main className="up-main">
//         <section className="profile-card">
//           <div className="profile-head">
//             <div className="avatar" aria-hidden>
//               {(user.fullName || "U")
//                 .split(" ")
//                 .map((n) => n[0])
//                 .slice(0, 2)
//                 .join("")
//                 .toUpperCase()}
//             </div>
//             <div className="profile-meta">
//               {editing ? (
//                 <input
//                   name="fullName"
//                   value={user.fullName}
//                   onChange={handleChange}
//                   className="input-inline name"
//                 />
//               ) : (
//                 <h2>{user.fullName}</h2>
//               )}

//               {editing ? (
//                 <input
//                   name="title"
//                   value={user.title}
//                   onChange={handleChange}
//                   className="input-inline sub"
//                 />
//               ) : (
//                 <div className="muted">{user.title}</div>
//               )}
//             </div>

//             <div className="profile-actions">
//               {editing ? (
//                 <>
//                   <button className="btn btn-ghost" onClick={cancelEdit}>
//                     Cancel
//                   </button>
//                   <button className="btn btn-primary" onClick={saveProfile}>
//                     {saving ? "Saving..." : "Save"}
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button className="btn btn-ghost" onClick={startEdit}>
//                     Edit
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>

//           <div className="profile-body">
//             <div className="left">
//               <div className="info-row">
//                 <label>Email</label>
//                 {editing ? (
//                   <input
//                     name="email"
//                     value={user.email}
//                     onChange={handleChange}
//                   />
//                 ) : (
//                   <div>{user.email}</div>
//                 )}
//               </div>

//               <div className="info-row">
//                 <label>Phone</label>
//                 {editing ? (
//                   <input
//                     name="phone"
//                     value={user.phone}
//                     onChange={handleChange}
//                   />
//                 ) : (
//                   <div>{user.phone}</div>
//                 )}
//               </div>

//               <div className="info-row">
//                 <label>Location</label>
//                 {editing ? (
//                   <input
//                     name="location"
//                     value={user.location}
//                     onChange={handleChange}
//                   />
//                 ) : (
//                   <div>{user.location}</div>
//                 )}
//               </div>

//               <div className="info-row">
//                 <label>About</label>
//                 {editing ? (
//                   <textarea
//                     name="about"
//                     value={user.about}
//                     onChange={handleChange}
//                     rows={4}
//                   />
//                 ) : (
//                   <div className="muted">{user.about}</div>
//                 )}
//               </div>

//               <div className="info-row skills">
//                 <label>Skills</label>
//                 <div className="skill-list">
//                   {/* {user.skills.map((s, i) => (
//                     <div className="skill" key={s + i}>
//                       <span>{s}</span>
//                       {editing ? (
//                         <button className="x" onClick={() => removeSkill(i)}>
//                           ✕
//                         </button>
//                       ) : null}
//                     </div>
//                   ))}
//                   {editing && (
//                     <button className="add-skill" onClick={addSkill}>
//                       + Add
//                     </button>
//                   )} */}
//                   {user.skills.map((s, i) => (
//                     <div className="skill" key={s + i}>
//                       <span>{s}</span>
//                       {editing && (
//                         <button className="x" onClick={() => removeSkill(i)}>
//                           ✕
//                         </button>
//                       )}
//                     </div>
//                   ))}

//                   {editing && !addingSkill && (
//                     <button className="add-skill" onClick={addSkill}>
//                       + Add Skill
//                     </button>
//                   )}

//                   {editing && addingSkill && (
//                     <div className="skill-input-row">
//                       <input
//                         type="text"
//                         placeholder="Enter new skill"
//                         value={newSkill}
//                         onChange={(e) => setNewSkill(e.target.value)}
//                         onKeyDown={(e) => e.key === "Enter" && saveNewSkill()}
//                         className="input-inline"
//                       />
//                       <button
//                         className="btn btn-primary small"
//                         onClick={saveNewSkill}
//                       >
//                         Save
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <aside className="right">
//               <div className="resume-box">
//                 <div
//                   className="upload-area"
//                   onClick={() => fileRef.current?.click()}
//                   role="button"
//                   tabIndex={0}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") fileRef.current?.click();
//                   }}
//                 >
//                   <div className="dz-icon">📄</div>
//                   <div className="dz-text">
//                     {user.resumeName
//                       ? user.resumeName
//                       : "Click to choose a resume (.pdf, .doc, .docx)"}
//                   </div>
//                   <input
//                     ref={fileRef}
//                     type="file"
//                     accept=".pdf,.doc,.docx"
//                     id="resumeFile"
//                     style={{ display: "none" }}
//                     onChange={handleFilePick}
//                   />
//                 </div>

//                 <div className="resume-info">
//                   {uploading ? (
//                     <div className="uploading">Uploading {uploadProgress}%</div>
//                   ) : user.resumeName ? (
//                     <>
//                       <div className="resume-meta">
//                         <div className="rname">{user.resumeName}</div>
//                         <div className="rcontrols">
//                           <button
//                             className="btn btn-ghost small"
//                             onClick={downloadResume}
//                           >
//                             Download
//                           </button>
//                           <button
//                             className="btn btn-ghost small"
//                             onClick={removeResume}
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                       <div className="muted small">
//                         Last updated: {new Date().toLocaleString()}
//                       </div>
//                     </>
//                   ) : (
//                     <div className="muted small">No resume uploaded</div>
//                   )}
//                 </div>
//               </div>

//               <div className="preview-card">
//                 <h4>Profile preview</h4>
//                 <div className="pv-row">
//                   <strong>{user.fullName}</strong>
//                 </div>
//                 <div className="pv-row muted">{user.title}</div>
//                 <div className="pv-row small muted">
//                   {user.location} • {user.email}
//                 </div>
//                 <div className="pv-divider" />
//                 <div className="pv-about muted small">{user.about}</div>
//                 {/* <div style={{ marginTop: 12 }}>
//                   <img src={ASSET} alt="example" style={{ width: 120, borderRadius: 8 }} />
//                 </div> */}
//               </div>
//             </aside>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

import React, { useEffect, useState, useRef } from "react";
import "../styles/profile.css";
import { useGetProfileQuery, useSaveProfileMutation } from "../api/profileslice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser as setUserAction } from "../store/userslice";

export default function Profile() {
  const [user, setUser] = useState({
    id: "",
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    about: "",
    skills: [],
    resumeName: null,
    resumeUrl: null,
  });

  const { id } = useParams();
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileRef = useRef(null);

  const { data: profileData } = useGetProfileQuery(id);
  const [saveProfileApi] = useSaveProfileMutation();

  const [newSkill, setNewSkill] = useState("");
  const [addingSkill, setAddingSkill] = useState(false);

  useEffect(() => {
    const saved = (() => {
      try {
        return JSON.parse(localStorage.getItem("qh_user")) || null;
      } catch {
        return null;
      }
    })();
    if (saved) setUser(saved);
  }, []);

  useEffect(() => {
    if (profileData) {
      setUser((prev) => ({ ...prev, ...profileData }));
      localStorage.setItem("qh_user", JSON.stringify(profileData));
    }
  }, [profileData, dispatch]);

  useEffect(() => {
    localStorage.setItem("qh_user", JSON.stringify(user));
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  function addSkill() {
    setAddingSkill(true);
    setNewSkill("");
  }

  function saveNewSkill() {
    if (newSkill.trim()) {
      setUser((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
    }
    setAddingSkill(false);
  }

  function removeSkill(i) {
    setUser((p) => ({
      ...p,
      skills: p.skills.filter((_, idx) => idx !== i),
    }));
  }

  function startEdit() {
    setEditing(true);
  }

  function cancelEdit() {
    setEditing(false);
    const saved = (() => {
      try {
        return JSON.parse(localStorage.getItem("qh_user")) || null;
      } catch {
        return null;
      }
    })();
    if (saved) setUser(saved);
  }

  async function saveProfile(e) {
    e?.preventDefault?.();
    setSaving(true);
    try {
      const res = await saveProfileApi(user).unwrap();
      setUser(res);
      dispatch(setUserAction(res));
      localStorage.setItem("qh_user", JSON.stringify(res));
      setEditing(false);
    } catch (err) {
      console.error("Save profile error:", err);
    } finally {
      setSaving(false);
    }
  }

  function handleFilePick(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    uploadResume(f);
  }

  function simulateUpload(file) {
    return new Promise((resolve) => {
      setUploading(true);
      setUploadProgress(6);
      const t = setInterval(() => {
        setUploadProgress((p) => {
          const next = Math.min(100, Math.floor(p + Math.random() * 18));
          if (next >= 100) {
            clearInterval(t);
            setTimeout(() => {
              setUploading(false);
              setUploadProgress(0);
              resolve(true);
            }, 300);
          }
          return next;
        });
      }, 220);
    });
  }

  async function uploadResume(file) {
    await simulateUpload(file);
    const url = URL.createObjectURL(file);
    setUser((p) => ({ ...p, resumeName: file.name, resumeUrl: url }));
  }

  function downloadResume() {
    if (!user.resumeUrl) return;
    const a = document.createElement("a");
    a.href = user.resumeUrl;
    a.download = user.resumeName || "resume.pdf";
    a.click();
  }

  function removeResume() {
    setUser((p) => ({ ...p, resumeName: null, resumeUrl: null }));
  }

  return (
    <div className="up-wrapper">
      <main className="up-main">
        <section className="profile-card">
          <div className="profile-head">
            <div className="avatar">
              {(user.fullName || "U")
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>

            <div className="profile-meta">
              {editing ? (
                <input
                  name="fullName"
                  value={user.fullName}
                  onChange={handleChange}
                  className="input-inline name"
                />
              ) : (
                <h2>{user.fullName}</h2>
              )}

              {editing ? (
                <input
                  name="title"
                  value={user.title}
                  onChange={handleChange}
                  className="input-inline sub"
                />
              ) : (
                <div className="muted">{user.title}</div>
              )}
            </div>

            <div className="profile-actions">
              {editing ? (
                <>
                  <button className="btn btn-ghost" onClick={cancelEdit}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={saveProfile}>
                    {saving ? "Saving..." : "Save"}
                  </button>
                </>
              ) : (
                <button className="btn btn-ghost" onClick={startEdit}>
                  Edit
                </button>
              )}
            </div>
          </div>

          <div className="profile-body">
            <div className="left">
              <div className="info-row">
                <label>Email</label>
                {editing ? (
                  <input
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                ) : (
                  <div>{user.email}</div>
                )}
              </div>

              <div className="info-row">
                <label>Phone</label>
                {editing ? (
                  <input
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                  />
                ) : (
                  <div>{user.phone}</div>
                )}
              </div>

              <div className="info-row">
                <label>Location</label>
                {editing ? (
                  <input
                    name="location"
                    value={user.location}
                    onChange={handleChange}
                  />
                ) : (
                  <div>{user.location}</div>
                )}
              </div>

              <div className="info-row">
                <label>About</label>
                {editing ? (
                  <textarea
                    name="about"
                    value={user.about}
                    onChange={handleChange}
                    rows={4}
                  />
                ) : (
                  <div className="muted">{user.about}</div>
                )}
              </div>

              <div className="info-row skills">
                <label>Skills</label>
                <div className="skill-list">
                  {user.skills.map((s, i) => (
                    <div className="skill" key={s + i}>
                      <span>{s}</span>
                      {editing && (
                        <button className="x" onClick={() => removeSkill(i)}>
                          ✕
                        </button>
                      )}
                    </div>
                  ))}

                  {editing && !addingSkill && (
                    <button className="add-skill" onClick={addSkill}>
                      + Add Skill
                    </button>
                  )}

                  {editing && addingSkill && (
                    <div className="skill-input-row">
                      <input
                        type="text"
                        placeholder="Enter new skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveNewSkill()}
                        className="input-inline"
                      />
                      <button className="btn btn-primary small" onClick={saveNewSkill}>
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <aside className="right">
              <div className="resume-box">
                <div
                  className="upload-area"
                  onClick={() => fileRef.current?.click()}
                  role="button"
                >
                  <div className="dz-icon">📄</div>
                  <div className="dz-text">
                    {user.resumeName
                      ? user.resumeName
                      : "Click to choose a resume (.pdf, .doc, .docx)"}
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    style={{ display: "none" }}
                    onChange={handleFilePick}
                  />
                </div>

                <div className="resume-info">
                  {uploading ? (
                    <div className="uploading">Uploading {uploadProgress}%</div>
                  ) : user.resumeName ? (
                    <>
                      <div className="resume-meta">
                        <div className="rname">{user.resumeName}</div>
                        <div className="rcontrols">
                          <button className="btn btn-ghost small" onClick={downloadResume}>
                            Download
                          </button>
                          <button className="btn btn-ghost small" onClick={removeResume}>
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="muted small">
                        Last updated: {new Date().toLocaleString()}
                      </div>
                    </>
                  ) : (
                    <div className="muted small">No resume uploaded</div>
                  )}
                </div>
              </div>

              <div className="preview-card">
                <h4>Profile preview</h4>
                <div className="pv-row">
                  <strong>{user.fullName}</strong>
                </div>
                <div className="pv-row muted">{user.title}</div>
                <div className="pv-row small muted">
                  {user.location} • {user.email}
                </div>
                <div className="pv-divider" />
                <div className="pv-about muted small">{user.about}</div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
