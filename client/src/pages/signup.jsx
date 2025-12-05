// import React, { useState } from "react";
// import axios from "axios";
// import "../styles/signup.css";
// import loginimg from "../assets/login-img.svg";
// import { useNavigate } from "react-router-dom";

// export default function SignUp() {
//   const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:4000";
//   console.log("API_URL ->", API_URL);

//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirm: "",
//     role: "candidate",
//     phone: "",
//     location: "",
//     skills: "",
//   });

//   // const [resumeFile, setResumeFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   function handleChange(e) {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   }

//   function handleFile(e) {
//     setResumeFile(e.target.files?.[0] || null);
//   }

//   function validate() {
//     if (!form.fullName) return "Enter your full name.";
//     if (!form.email) return "Enter your email.";
//     if (!form.password) return "Enter your password.";
//     if (form.password.length < 8)
//       return "Password must be at least 8 characters.";
//     if (form.password !== form.confirm) return "Passwords do not match.";
//     return "";
//   }

//   async function handleSubmit(e) {
//     console.log("inside handlesubmit signupp");
//     e.preventDefault();
//     setError("");

//     const err = validate();
//     if (err) {
//       setError(err);
//       return;
//     }

//     setLoading(true);

//     try {
//       console.log("inside handlesubmit signupp try");
//       // const data = new FormData();
//       // data.append("fullName", form.fullName);
//       // data.append("email", form.email);
//       // data.append("password", form.password);
//       // data.append("role", "candidate");
//       // data.append("phone", form.phone);
//       // data.append("location", form.location);
//       // data.append("skills", form.skills);
//       // if (resumeFile) data.append("resume", resumeFile);

//       // const data = JSON.stringify(form)

//       // console.log()
//       console.log(
//         "inside handlesubmit signupp try 2",
//         `${API_URL}/auth/signup`
//       );

//       const {confirm:_,...data} = form;
//       console.log(data)

//       const res = await axios.post(`${API_URL}/auth/signup`, data, {
//         // headers: { "Content-Type": "multipart/form-data" }, //`${process.env.REACT_APP_API_URL}/auth/signup`
//         withCredentials: true,
//       });
//       console.log(res.data.user);
//       navigate('/login')
//       // localStorage.setItem("user", JSON.stringify(res.data.user))
//       // navigate("/dashboard", { replace: true });
//     } catch (err) {
//       const msg = err?.response?.data?.error || "Signup failed.";
//       setError(msg);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="signup-wrapper">
//       <div className="signup-card">
//         <aside className="signup-left">
//           <div className="illustration">
//             <img src={loginimg} alt="" height={600} />
//           </div>
//           <div className="left-footer">
//             © {new Date().getFullYear()} QueueHire
//           </div>
//         </aside>

//         <main className="signup-right">
//           <div className="form-box">
//             <h1>Create Account</h1>
//             <p className="small">
//               Already have an account? <a href="/login">Sign in</a>
//             </p>

//             <label className="label">
//               <span className="label-text">Role</span>
//               <select
//                 name="role"
//                 value={form.role}
//                 onChange={handleChange}
//                 className="input"
//               >
//                 <option value="candidate">Candidate</option>
//                 <option value="admin">Admin</option>
//               </select>
//             </label>

//             {form.role === "admin" ? (
//               <div className="admin-block">
//                 <p>
//                   Admins cannot sign up here. Use the company admin login
//                   credentials.
//                 </p>
//                 <button
//                   type="button"
//                   className="primary"
//                   onClick={() => navigate("/login", { replace: true })}
//                 >
//                   Go to Login
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <form
//                   className="signup-form"
//                   onSubmit={handleSubmit}
//                   encType="multipart/form-data"
//                 >
//                   {error && <div className="form-error">{error}</div>}

//                   <label className="label">
//                     <span className="label-text">Full Name</span>
//                     <input
//                       name="fullName"
//                       value={form.fullName}
//                       onChange={handleChange}
//                       className="input"
//                     />
//                   </label>

//                   <label className="label">
//                     <span className="label-text">Email</span>
//                     <input
//                       name="email"
//                       type="email"
//                       value={form.email}
//                       onChange={handleChange}
//                       className="input"
//                     />
//                   </label>

//                   <div className="row">
//                     <label className="label half">
//                       <span className="label-text">Password</span>
//                       <input
//                         name="password"
//                         type="password"
//                         value={form.password}
//                         onChange={handleChange}
//                         className="input"
//                       />
//                     </label>

//                     <label className="label half">
//                       <span className="label-text">Confirm Password</span>
//                       <input
//                         name="confirm"
//                         type="password"
//                         value={form.confirm}
//                         onChange={handleChange}
//                         className="input"
//                       />
//                     </label>
//                   </div>

//                   <div className="row">
//                     <label className="label half">
//                       <span className="label-text">Phone</span>
//                       <input
//                         name="phone"
//                         value={form.phone}
//                         onChange={handleChange}
//                         className="input"
//                       />
//                     </label>

//                     <label className="label half">
//                       <span className="label-text">Location</span>
//                       <input
//                         name="location"
//                         value={form.location}
//                         onChange={handleChange}
//                         className="input"
//                       />
//                     </label>
//                   </div>

//                   <label className="label">
//                     <span className="label-text">Skills (comma separated)</span>
//                     <input
//                       name="skills"
//                       value={form.skills}
//                       onChange={handleChange}
//                       className="input"
//                     />
//                   </label>

//                   {/*<label className="label file-label">
//                     <span className="label-text">Upload Resume</span>
//                     <input
//                       type="file"
//                       accept=".pdf,.doc,.docx"
//                       onChange={handleFile}
//                       className="file-input"
//                     />
//                     <div className="file-name">
//                       {resumeFile ? resumeFile.name : "No file selected"}
//                     </div>
//                   </label>*/}

//                   <button type="submit" className="primary" disabled={loading}>
//                     {loading ? "Creating..." : "Create Account"}
//                   </button>
//                 </form>
//               </>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import "../styles/signup.css";
import loginimg from "../assets/login-img.svg";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:4000";
  console.log("API_URL ->", API_URL);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm: "",
    role: "candidate",
    phone: "",
    location: "",
    skills: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setOtpSent(false);
      setOtpVerified(false);
      setOtpError("");
      setForm((prev) => ({ ...prev, otp: "" }));
    }
  }

  function validate() {
    if (!form.fullName) return "Enter your full name.";
    if (!form.email) return "Enter your email.";
    if (!form.password) return "Enter your password.";
    if (form.password.length < 8)
      return "Password must be at least 8 characters.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    if (!otpVerified) return "Please verify your email with OTP.";
    return "";
  }

  async function handleSendOtp() {
    setError("");
    setOtpError("");

    if (!form.email) {
      setError("Enter your email to receive OTP.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/auth/send-otp`, { email: form.email });
      setOtpSent(true);
    } catch (err) {
      const msg = err?.response?.data?.error || "Failed to send OTP.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp() {
    setError("");
    setOtpError("");

    if (!form.email || !form.otp) {
      setOtpError("Enter the OTP sent to your email.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/auth/verify-otp`, {
        email: form.email,
        otp: form.otp,
      });
      if (res.data.ok) {
        setOtpVerified(true);
        setOtpError("");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        "Invalid OTP. Please check and try again.";
      setOtpVerified(false);
      setOtpError(msg);
    } finally {
      setLoading(false);
    }
  }
  async function handleSubmit(e) {
    console.log("inside handlesubmit signupp");
    e.preventDefault();
    setError("");

    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setLoading(true);

    try {
      console.log("inside handlesubmit signupp try");

      const { confirm: _, ...data } = form;
      console.log(data);

      const res = await axios.post(`${API_URL}/auth/signup`, data, {
        withCredentials: true,
      });
      console.log(res.data.user);
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.error || "Signup failed.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <aside className="signup-left">
          <div className="illustration">
            <img src={loginimg} alt="" height={600} />
          </div>
          <div className="left-footer">
            © {new Date().getFullYear()} QueueHire
          </div>
        </aside>

        <main className="signup-right">
          <div className="form-box">
            <h1>Create Account</h1>
            <p className="small">
              Already have an account? <a href="/">Sign in</a>
            </p>

            <label className="label">
              <span className="label-text">Role</span>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="input"
              >
                <option value="candidate">Candidate</option>
                <option value="admin">Admin</option>
              </select>
            </label>

            {form.role === "admin" ? (
              <div className="admin-block">
                <p>
                  Admins cannot sign up here. Use the company admin login
                  credentials.
                </p>
                <button
                  type="button"
                  className="primary"
                  onClick={() => navigate("/", { replace: true })}
                >
                  Go to Login
                </button>
              </div>
            ) : (
              <>
                <form
                  className="signup-form"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  {error && <div className="form-error">{error}</div>}

                  <label className="label">
                    <span className="label-text">Full Name</span>
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      className="input"
                    />
                  </label>

                  <label className="label">
                    <span className="label-text">Email</span>
                    <div className="row">
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="input"
                        disabled={otpVerified}
                        placeholder="you@example.com"
                        style={{ height: 45 }}
                      />
                      <button
                        type="button"
                        className="primary"
                        style={{
                          marginLeft: "8px",
                          whiteSpace: "nowrap",
                          margin: 0,
                        }}
                        onClick={handleSendOtp}
                        disabled={loading || !form.email || otpVerified}
                      >
                        {otpVerified
                          ? "Verified"
                          : otpSent
                          ? "Resend OTP"
                          : "Send OTP"}
                      </button>
                    </div>
                    {otpSent && !otpVerified && (
                      <p className="small muted">
                        We’ve sent an OTP to <strong>{form.email}</strong>.
                        Please enter it below.
                      </p>
                    )}
                  </label>

                  {otpSent && (
                    <label className="label">
                      <span className="label-text">OTP</span>
                      <div className="row">
                        <input
                          name="otp"
                          value={form.otp}
                          onChange={handleChange}
                          className="input"
                          placeholder="Enter the code from your email"
                          disabled={otpVerified}
                        />
                        <button
                          type="button"
                          className="secondary"
                          style={{
                            marginLeft: "8px",
                            whiteSpace: "nowrap",
                          }}
                          onClick={handleVerifyOtp}
                          disabled={loading || otpVerified}
                        >
                          Verify OTP
                        </button>
                      </div>

                      {otpVerified && (
                        <div className="otp-status success">
                          Email verified successfully.
                        </div>
                      )}

                      {!otpVerified && otpError && (
                        <div className="otp-status error">{otpError}</div>
                      )}
                    </label>
                  )}

                  <div className="row">
                    <label className="label half">
                      <span className="label-text">Password</span>
                      <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        className="input"
                      />
                    </label>

                    <label className="label half">
                      <span className="label-text">Confirm Password</span>
                      <input
                        name="confirm"
                        type="password"
                        value={form.confirm}
                        onChange={handleChange}
                        className="input"
                      />
                    </label>
                  </div>

                  <div className="row">
                    <label className="label half">
                      <span className="label-text">Phone</span>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="input"
                      />
                    </label>

                    <label className="label half">
                      <span className="label-text">Location</span>
                      <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="input"
                      />
                    </label>
                  </div>

                  <label className="label">
                    <span className="label-text">Skills (comma separated)</span>
                    <input
                      name="skills"
                      value={form.skills}
                      onChange={handleChange}
                      className="input"
                    />
                  </label>

                  <button type="submit" className="primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Account"}
                  </button>
                </form>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
