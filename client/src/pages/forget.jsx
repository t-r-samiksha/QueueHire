// // import React, { useState } from "react";
// // import axios from "axios";
// // import "../styles/login.css";
// // import loginimg from "../assets/login-img.svg";
// // import { useNavigate } from "react-router-dom";
// // import { useSelector, useDispatch } from "react-redux";
// // import { setUser } from "../store/userslice.js";

// // function Forget() {
// //   const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:4000";
// //   console.log("API_URL ->", API_URL);

// //   const dispatch = useDispatch();

// //   const nav = useNavigate();
// //   const [form, setForm] = useState({
// //     email: "",
// //     password: "",
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   function handleChange(e) {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   }

// //   async function handleSubmit(e) {
// //     e.preventDefault();
// //     setError("");

// //     if (!form.email || !form.password) {
// //       setError("Please enter email and password.");
// //       return;
// //     }

// //     setLoading(true);

// //     console.log({
// //       email: form.email,
// //       password: form.password,
// //     });

// //     try {
// //       const res = await axios.post(
// //         `${API_URL}/auth/login`,
// //         {
// //           email: form.email,
// //           password: form.password,
// //         },
// //         { withCredentials: true }
// //       );
// //       // console.log(res.data.user);
// //       // localStorage.setItem("user", JSON.stringify(res.data.user))
// //       dispatch(setUser(res.data.user));

// //       // nav(res.data.user.role==="admin"?"/admin/dashboard":'/signup');/user/dashboard
// //       nav(
// //         res.data.user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
// //       );
// //       // console.log(res.data.role==="admin"?"/admin/dashboard":"/user/dashboard")
// //     } catch (err) {
// //       setError("Invalid email or password.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   return (
// //     <div className="login-wrapper">
// //       <div className="qhleft">
// //         <img src={loginimg} alt="login" height={580} />
// //         <footer className="qh-left-footer">
// //           © {new Date().getFullYear()} QueueHire
// //         </footer>
// //       </div>

// //       <div className="qhright">
// //         <div className="qhrightdata">
// //           <div className="qh-header">
// //             <h1>Forgot password</h1>
// //             <p>Welcome back — Set a new password to continue.</p>
// //           </div>

// //           <form className="qh-form" onSubmit={handleSubmit}>
// //             {error && <p className="qh-error">{error}</p>}

// //             <label className="qh-label">
// //               <span>Email</span>
// //               <input
// //                 className="qh-input"
// //                 type="email"
// //                 name="email"
// //                 value={form.email}
// //                 onChange={handleChange}
// //                 placeholder="you@company.com"
// //               />
// //             </label>

// //             <label className="qh-label">
// //               <div className="qh-password-row">
// //                 <span className="qh-label-text">Password</span>
// //                 <a className="qh-forgot" href="/forget">
// //                   Forgot?
// //                 </a>
// //               </div>
// //               <input
// //                 className="qh-input"
// //                 name="password"
// //                 type="password"
// //                 value={form.password}
// //                 onChange={handleChange}
// //                 placeholder="Enter your password"
// //                 required
// //               />
// //             </label>

// //             <a className="qh-link" href="/signup">
// //               No account? <span style={{ color: "#4f6cf5" }}>Sign up</span>{" "}
// //             </a>

// //             <button className="qh-btn" disabled={loading}>
// //               {loading ? "Signing in..." : "Sign in →"}
// //             </button>
// //           </form>

// //           <p className="qh-legal">
// //             By signing in you agree to our <a href="/terms">Terms</a> and{" "}
// //             <a href="/privacy">Privacy Policy</a>.
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Forget;

// import React, { useState } from "react";
// import axios from "axios";
// import "../styles/forget.css";
// import loginimg from "../assets/login-img.svg";
// import { useNavigate } from "react-router-dom";

// function Forget() {
//   const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:4000";
//   console.log("API_URL ->", API_URL);

//   const nav = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     otp: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [info, setInfo] = useState("");

//   const [step, setStep] = useState(1); // 1 = email+otp, 2 = new password

//   function handleChange(e) {
//     const { name, value } = e.target;

//     if (name === "email") {
//       setError("");
//       setInfo("");
//       setStep(1);

//       setForm((prev) => ({
//         ...prev,
//         email: value,
//         otp: "",
//         newPassword: "",
//         confirmPassword: "",
//       }));
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));
//     }
//   }

//   // STEP 1: send OTP to email
//   async function handleSendOtp() {
//     setError("");
//     setInfo("");

//     if (!form.email) {
//       setError("Please enter your email.");
//       return;
//     }

//     try {
//       setLoading(true);
//       await axios.post(`${API_URL}/auth/forgot/send-otp`, {
//         email: form.email,
//       });

//       setInfo("OTP sent to your email. Please check your inbox (and spam).");
//     } catch (err) {
//       const msg =
//         err?.response?.data?.error || "Failed to send OTP. Try again.";
//       setError(msg);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // STEP 1: verify OTP & go to step 2
//   async function handleVerifyOtpAndNext(e) {
//     e.preventDefault();
//     setError("");
//     setInfo("");

//     if (!form.email || !form.otp) {
//       setError("Please enter email and OTP.");
//       return;
//     }

//     try {
//         console.log(form)
//       setLoading(true);
//       const res = await axios.post(`${API_URL}/auth/forgot/verify-otp`, {
//         email: form.email,
//         code: form.otp,
//       });

//       if (res.data.ok) {
//         setInfo("OTP verified. Please set your new password.");
//         setStep(2);
//       } else {
//         setError("Invalid OTP. Please check and try again.");
//       }
//     } catch (err) {
//       const msg =
//         err?.response?.data?.error ||
//         "Invalid or expired OTP. Please check and try again.";
//       setError(msg);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // STEP 2: reset password
//   async function handleResetPassword(e) {
//     e.preventDefault();
//     setError("");
//     setInfo("");

//     if (!form.newPassword || !form.confirmPassword) {
//       setError("Please enter and confirm your new password.");
//       return;
//     }

//     if (form.newPassword.length < 8) {
//       setError("Password must be at least 8 characters.");
//       return;
//     }

//     if (form.newPassword !== form.confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     try {
//       setLoading(true);
//       await axios.post(`${API_URL}/auth/forgot/reset`, {
//         email: form.email,
//         code: form.otp, // backend can double-check OTP if you want
//         newPassword: form.newPassword,
//       });

//       setInfo("Password reset successful. Redirecting to login...");
//       // small delay optional, or just immediately:
//       setTimeout(() => {
//         nav("/");
//       }, 1000);
//     } catch (err) {
//       const msg = err?.response?.data?.error || "Failed to reset password.";
//       setError(msg);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="login-wrapper">
//       <div className="qhleft">
//         <img src={loginimg} alt="login" height={580} />
//         <footer className="qh-left-footer">
//           © {new Date().getFullYear()} QueueHire
//         </footer>
//       </div>

//       <div className="qhright">
//         <div className="qhrightdata">
//           <div className="qh-header">
//             <h1>Forgot password</h1>
//             <p>Set a new password to continue.</p>
//           </div>

//           <form
//             className="qh-form"
//             onSubmit={step === 1 ? handleVerifyOtpAndNext : handleResetPassword}
//           >
//             {error && <p className="qh-error">{error}</p>}
//             {info && !error && <p className="qh-info">{info}</p>}

//             {/* EMAIL (step 1 & 2 – readonly after OTP verified) */}
//             <label className="qh-label">
//               <span>Email</span>
//               <input
//                 className="qh-input"
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="you@company.com"
//                 disabled={step === 2} // lock email at step 2
//               />
//             </label>

//             {step === 1 && (
//               <>
//                 {/* OTP field */}
//                 <label className="qh-label">
//                   <span>OTP</span>
//                   <div className="qh-password-row">
//                     <input
//                       className="qh-input"
//                       type="text"
//                       name="otp"
//                       value={form.otp}
//                       onChange={handleChange}
//                       placeholder="Enter the OTP sent"
//                     />
//                     <button
//                       type="button"
//                       className="qh-btn-outline"
//                       onClick={handleSendOtp}
//                       disabled={loading || !form.email}
//                     >
//                       Send OTP
//                     </button>
//                   </div>
//                 </label>

//                 <button className="qh-btn" disabled={loading}>
//                   {loading ? "Checking..." : "Next →"}
//                 </button>
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 {/* NEW PASSWORD */}
//                 <label className="qh-label">
//                   <span>New Password</span>
//                   <input
//                     className="qh-input"
//                     type="password"
//                     name="newPassword"
//                     value={form.newPassword}
//                     onChange={handleChange}
//                     placeholder="Enter new password"
//                   />
//                 </label>

//                 {/* CONFIRM PASSWORD */}
//                 <label className="qh-label">
//                   <span>Confirm Password</span>
//                   <input
//                     className="qh-input"
//                     type="password"
//                     name="confirmPassword"
//                     value={form.confirmPassword}
//                     onChange={handleChange}
//                     placeholder="Re-enter new password"
//                   />
//                 </label>

//                 <button className="qh-btn" disabled={loading}>
//                   {loading ? "Saving..." : "Confirm"}
//                 </button>
//               </>
//             )}
//           </form>

//           <p className="qh-legal">
//             Remembered your password?{" "}
//             <a href="/" style={{ color: "#4f6cf5" }}>
//               Back to login
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Forget;


import React, { useState } from "react";
import axios from "axios";
import "../styles/forget.css";
import loginimg from "../assets/login-img.svg";
import { useNavigate } from "react-router-dom";

function Forget() {
  const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:4000";
  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [step, setStep] = useState(1);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "email") {
      setError("");
      setInfo("");
      setStep(1);

      setForm((prev) => ({
        ...prev,
        email: value,
        otp: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSendOtp() {
    setError("");
    setInfo("");

    if (!form.email) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/auth/forgot/send-otp`, {
        email: form.email,
      });

      setInfo("OTP sent to your email. Please check your inbox (and spam).");
    } catch (err) {
      const msg =
        err?.response?.data?.error || "Failed to send OTP. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtpAndNext(e) {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!form.email || !form.otp) {
      setError("Please enter email and OTP.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/auth/forgot/verify-otp`, {
        email: form.email,
        code: form.otp,
      });

      if (res.data.ok) {
        setInfo("OTP verified. Please set your new password.");
        setStep(2);
      } else {
        setError("Invalid OTP. Please check and try again.");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        "Invalid or expired OTP. Please check and try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!form.newPassword || !form.confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }

    if (form.newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/auth/forgot/reset`, {
        email: form.email,
        code: form.otp,
        newPassword: form.newPassword,
      });

      setInfo("Password reset successful. Redirecting to login...");
      setTimeout(() => {
        nav("/");
      }, 1000);
    } catch (err) {
      const msg = err?.response?.data?.error || "Failed to reset password.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-wrapper">
      <div className="qhleft">
        <img src={loginimg} alt="login" height={580} />
        <footer className="qh-left-footer">
          © {new Date().getFullYear()} QueueHire
        </footer>
      </div>

      <div className="qhright">
        <div className="qhrightdata">
          <div className="qh-header">
            <h1>Forgot password</h1>
            <p>Set a new password to continue.</p>
          </div>

          <form
            className="qh-form"
            onSubmit={step === 1 ? handleVerifyOtpAndNext : handleResetPassword}
          >
            {error && <p className="qh-error">{error}</p>}
            {info && !error && <p className="qh-info">{info}</p>}

            <label className="qh-label">
              <span>Email</span>
              <input
                className="qh-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                disabled={step === 2}
              />
            </label>

            {step === 1 && (
              <>
                <label className="qh-label">
                  <span>OTP</span>
                  <div className="qh-password-row">
                    <input
                      className="qh-input"
                      type="text"
                      name="otp"
                      value={form.otp}
                      onChange={handleChange}
                      placeholder="Enter the OTP sent"
                    />
                    <button
                      type="button"
                      className="qh-btn-outline"
                      onClick={handleSendOtp}
                      disabled={loading || !form.email}
                    >
                      Send OTP
                    </button>
                  </div>
                </label>

                <button className="qh-btn" disabled={loading}>
                  {loading ? "Checking..." : "Next →"}
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <label className="qh-label">
                  <span>New Password</span>
                  <input
                    className="qh-input"
                    type="password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                  />
                </label>

                <label className="qh-label">
                  <span>Confirm Password</span>
                  <input
                    className="qh-input"
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter new password"
                  />
                </label>

                <button className="qh-btn" disabled={loading}>
                  {loading ? "Saving..." : "Confirm"}
                </button>
              </>
            )}
          </form>

          <p className="qh-legal">
            Remembered your password?{" "}
            <a href="/" style={{ color: "#4f6cf5" }}>
              Back to login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Forget;
