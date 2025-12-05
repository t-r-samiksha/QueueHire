// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/login.css";
// import loginimg from "../assets/login-img.svg";
// import { Navigate, replace, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { setUser } from "../store/userslice.js";

// function LoginPage() {
//   const user = useSelector((state) => state.user);
//   const nav = useNavigate();

//   useEffect(() => {
//     // const nav = useNavigate()
//     try {
//       console.log("bruh youre already logeed in ");
//       // console.log(user);

//       if (!user || !user.role) return;

//       // console.log('in');
//       nav(`${user.role === "admin" ? "admin/dashboard" : "user/dashboard"}`,{replace:true,});
//       // nav(`${user.role==='admin'?'admin/dashboard':'user/dashboard'}`)
//     } catch (err) {
//       console.error(err);
//     }
//   }, [user,nav]);

//   // const user = useSelector((state) => state.user);
//   // const nav = useNavigate();

//   // useEffect(() => {
//   //   console.log("hook");
//   //   console.log("user from redux:", user);

//   //   if (!user || !user.role) return;

//   //   nav(user.role === "admin" ? "/admin/dashboard" : "/user/dashboard", {
//   //     replace: true,
//   //   });
//   // }, [user, nav]);

//   const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:4000";
//   console.log("API_URL ->", API_URL);

//   const dispatch = useDispatch();

//   // const nav = useNavigate();
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");

//     if (!form.email || !form.password) {
//       setError("Please enter email and password.");
//       return;
//     }

//     setLoading(true);

//     console.log({
//       email: form.email,
//       password: form.password,
//     });

//     try {
//       const res = await axios.post(
//         `${API_URL}/auth/login`,
//         {
//           email: form.email,
//           password: form.password,
//         },
//         { withCredentials: true }
//       );
//       // console.log(res.data.user);
//       // localStorage.setItem("user", JSON.stringify(res.data.user))
//       dispatch(setUser(res.data.user));

//       // nav(res.data.user.role==="admin"?"/admin/dashboard":'/signup');/user/dashboard
//       nav(
//         res.data.user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
//       );
//       // console.log(res.data.role==="admin"?"/admin/dashboard":"/user/dashboard")
//     } catch (err) {
//       setError("Invalid email or password.");
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
//             <h1>Sign In</h1>
//             <p>Welcome back — sign in to continue.</p>
//           </div>

//           <form className="qh-form" onSubmit={handleSubmit}>
//             {error && <p className="qh-error">{error}</p>}

//             <label className="qh-label">
//               <span>Email</span>
//               <input
//                 className="qh-input"
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="you@company.com"
//               />
//             </label>

//             <label className="qh-label">
//               <div className="qh-password-row">
//                 <span className="qh-label-text">Password</span>
//                 <a className="qh-forgot" href="/forget">
//                   Forgot?
//                 </a>
//               </div>
//               <input
//                 className="qh-input"
//                 name="password"
//                 type="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//                 required
//               />
//             </label>

//             <a className="qh-link" href="/signup">
//               No account? <span style={{ color: "#4f6cf5" }}>Sign up</span>{" "}
//             </a>

//             <button className="qh-btn" disabled={loading}>
//               {loading ? "Signing in..." : "Sign in →"}
//             </button>
//           </form>

//           <p className="qh-legal">
//             By signing in you agree to our <a href="/terms">Terms</a> and{" "}
//             <a href="/privacy">Privacy Policy</a>.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/login.css";
import loginimg from "../assets/login-img.svg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/userslice.js";

function LoginPage() {
  const user = useSelector((state) => state.user);
  const nav = useNavigate();

  useEffect(() => {
    try {
      if (!user || !user.role) return;

      nav(
        `${user.role === "admin" ? "admin/dashboard" : "user/dashboard"}`,
        { replace: true }
      );
    } catch (err) {
      console.error(err);
    }
  }, [user, nav]);

  const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:4000";

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/auth/login`,
        {
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      );

      dispatch(setUser(res.data.user));

      nav(
        res.data.user.role === "admin"
          ? "/admin/dashboard"
          : "/user/dashboard"
      );
    } catch (err) {
      setError("Invalid email or password.");
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
            <h1>Sign In</h1>
            <p>Welcome back — sign in to continue.</p>
          </div>

          <form className="qh-form" onSubmit={handleSubmit}>
            {error && <p className="qh-error">{error}</p>}

            <label className="qh-label">
              <span>Email</span>
              <input
                className="qh-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
              />
            </label>

            <label className="qh-label">
              <div className="qh-password-row">
                <span className="qh-label-text">Password</span>
                <a className="qh-forgot" href="/forget">
                  Forgot?
                </a>
              </div>
              <input
                className="qh-input"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </label>

            <a className="qh-link" href="/signup">
              No account? <span style={{ color: "#4f6cf5" }}>Sign up</span>
            </a>

            <button className="qh-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign in →"}
            </button>
          </form>

          <p className="qh-legal">
            By signing in you agree to our <a href="/terms">Terms</a> and{" "}
            <a href="/privacy">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
