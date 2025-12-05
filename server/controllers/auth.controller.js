// // // // controllers/auth.controller.js
// // const express = require("express");
// // const { createUser, findByEmail } = require("../store/user.store");
// // const bcrypt = require("bcryptjs");

// // // const multer = require("multer");
// // // const path = require("path");
// // // const fs = require("fs");

// // const router = express.Router();

// // // const uploadDir = path.join(__dirname, "..", "..", "uploads");
// // // if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// // // const storage = multer.diskStorage({
// // //   destination: (req, file, cb) => cb(null, uploadDir),
// // //   filename: (req, file, cb) => {
// // //     const ext = path.extname(file.originalname);
// // //     cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`);
// // //   },
// // // });

// // // const upload = multer({ storage });

// // router.post("/signup", async (req, res) => {// upload.single("resume"),
// //   try {
// //     console.log("req.body:", req.body);
// //     // console.log("req.file:", req.file);

// //     const {
// //       fullName = "",
// //       email,
// //       password,
// //       role = "candidate",
// //       phone = "",
// //       location = "",
// //       skills = "",
// //     } = req.body;

// //     // let resumePath = null;
// //     // if (req.file) {
// //     //   resumePath = `/uploads/${req.file.filename}`;
// //     // }

// //     const existing = await findByEmail(email);
// //     if (existing) {
// //       return res.status(400).json({ error: "user already exists" });
// //     }

// //     // try{
// //     const user = await createUser({
// //       fullName,
// //       email,
// //       password,
// //       role,
// //       phone,
// //       location,
// //       skills,
// //       // resumePath,
// //     });

// //     // res.status(200)
// //     // }catch(err){

// //     // }
// //     console.log(user);
// //     // res.json({
// //     //   // ok: true,
// //     //   // user: req.session.user,
// //     //   // resumePath,
// //     //   success:true
// //     // });
// //     res.status(200).json({
// //       ok: true,
// //       // user,
// //     });
// //   } catch (err) {
// //     console.log(err);
// //     res.status(400);
// //   }
// // });

// // router.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await findByEmail(email);
// //     if (!user) return res.status(401).json({ error: "invalid credentials" });

// //     const ok = await bcrypt.compare(password, user.password_hash);
// //     if (!ok) return res.status(401).json({ error: "invalid credentials" });

// //     const {password_hash:_, ...publicUser} = user;

// //     res.status(200).json({
// //       ok: true,
// //       user:publicUser,
// //     });
// //   } catch (err) {
// //     res.status(400).json({ error: "server error" });
// //   }
// // });

// // // router.post("/signup", upload.single("resume"), async (req, res) => {
// // //   console.log("Inside /signup route");

// // //   try {
// // // console.log("req.body:", req.body);
// // // console.log("req.file:", req.file);

// // // const {
// // //   fullName = "",
// // //   email,
// // //   password,
// // //   role = "candidate",
// // //   phone = "",
// // //   location = "",
// // //   skills = "",
// // // } = req.body;

// // //     if (!email || !password) {
// // //       return res.status(400).json({ error: "email and password required" });
// // //     }

// // // const existing = await findByEmail(email);
// // // if (existing) {
// // //   return res.status(400).json({ error: "user already exists" });
// // // }

// // //     // OPTIONAL: Save resume path
// // // let resumePath = null;
// // // if (req.file) {
// // //   resumePath = `/uploads/${req.file.filename}`;
// // // }

// // // const user = await createUser({
// // //   fullName,
// // //   email,
// // //   password,
// // //   role,
// // //   phone,
// // //   location,
// // //   skills,
// // //   resumePath,
// // // });

// // //     console.log(user)

// // //     // Create session
// // //     req.session.user = {
// // //       id: user.id,
// // //       email: user.email,
// // //       role: user.role,
// // //       fullName: user.fullName,
// // //     };

// // // res.json({
// // //   ok: true,
// // //   user: req.session.user,
// // //   resumePath,
// // // });

// // //   } catch (err) {
// // //     console.error("Signup error:", err);
// // //     res.status(500).json({ error: "server error" });
// // //   }
// // // });

// // // // -------------------- LOGIN --------------------
// // // router.post("/login", async (req, res) => {
// // //   try {
// // //     console.log("inside /login",req.body);

// // //     const { email, password } = req.body;

// // //     if (!email || !password)
// // //       return res.status(400).json({ error: "email and password required" });

// // // const user = await findByEmail(email);
// // // if (!user) return res.status(401).json({ error: "invalid credentials" });

// // // const ok = await bcrypt.compare(password, user.password_hash);
// // // if (!ok) return res.status(401).json({ error: "invalid credentials" });

// // //     req.session.user = {
// // //       id: user.id,
// // //       email: user.email,
// // //       role: user.role,
// // //       fullName: user.fullName,
// // //     };

// // //     res.json({ ok: true, user: req.session.user });
// // //   } catch (err) {
// // //     console.error("Login error:", err);
// // //     res.status(500).json({ error: "server error" });
// // //   }
// // // });

// // // // -------------------- LOGOUT --------------------
// // // router.post("/logout", (req, res) => {
// // //   req.session.destroy((err) => {
// // //     if (err) return res.status(500).json({ error: "could not log out" });

// // //     res.clearCookie(process.env.SESSION_COOKIE_NAME || "qh.sid");
// // //     res.json({ ok: true });
// // //   });
// // // });

// // // // -------------------- WHOAMI --------------------
// // // router.get("/whoami", (req, res) => {
// // //   if (!req.session || !req.session.user) return res.json({ user: null });

// // //   res.json({ user: req.session.user });
// // // });

// // module.exports = router;

// // controllers/auth.controller.js
// // const express = require("express");
// // const bcrypt = require("bcryptjs");

// // // ⬅️ make sure this path matches where you put user.store.js
// // const { createUser, findByEmail } = require("../store/user.store");

// // const router = express.Router();



// // const express = require("express");
// // const bcrypt = require("bcryptjs");
// // const router = express.Router();
// // const { createUser, findByEmail } = require("../store/user.store");
// // const User = require("../models/user");
// // const Otp = require("../models/otp");
// // const { sendMail } = require("../mail/sendMail");


// // // ---------------------- SEND OTP ----------------------
// // router.post("/forgot/send-otp", async (req, res) => {
// //   try {
// //     const { email } = req.body;

// //     if (!email) return res.status(400).json({ error: "Email required" });

// //     const userExists = await User.findOne({ email });
// //     if (!userExists) return res.status(404).json({ error: "User not found" });

// //     // Create 6-digit OTP
// //     const code = Math.floor(Math.random() * 900000 + 100000).toString();

// //     await Otp.findOneAndUpdate(
// //       { email },
// //       {
// //         code,
// //         verified: false,
// //         expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5min expiry
// //       },
// //       { upsert: true }
// //     );

// //     await sendMail({
// //       to: email,
// //       subject: "QueueHire Password Reset OTP",
// //       text: `Your OTP is: ${code}`,
// //       html: `<p>Your OTP is: <strong>${code}</strong><br/>Valid for 5 minutes.</p>`
// //     });

// //     return res.json({ ok: true, message: "OTP sent" });

// //   } catch (err) {
// //     console.error("OTP Error:", err);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // });


// // // ---------------------- VERIFY OTP ----------------------
// // router.post("/forgot/verify", async (req, res) => {
// //   try {
// //     const { email, code } = req.body;

// //     if (!email || !code)
// //       return res.status(400).json({ error: "Email and OTP required" });

// //     const record = await Otp.findOne({ email });

// //     if (!record) return res.status(400).json({ error: "OTP not found" });

// //     if (record.expiresAt < new Date())
// //       return res.status(400).json({ error: "OTP expired" });

// //     if (record.code !== code)
// //       return res.status(400).json({ error: "Invalid OTP" });

// //     record.verified = true;
// //     await record.save();

// //     return res.json({ ok: true, message: "OTP verified" });

// //   } catch (err) {
// //     console.error("Verify Error:", err);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // });


// // // ---------------------- RESET PASSWORD ----------------------
// // router.post("/forgot/reset", async (req, res) => {
// //   try {
// //     const { email, code, newPassword } = req.body;

// //     if (!email || !code || !newPassword)
// //       return res.status(400).json({ error: "Missing fields" });

// //     const record = await Otp.findOne({ email });

// //     if (!record || record.code !== code)
// //       return res.status(400).json({ error: "Invalid or expired OTP" });

// //     if (!record.verified)
// //       return res.status(400).json({ error: "OTP not verified yet" });

// //     const hashed = await bcrypt.hash(newPassword, 10);

// //     await User.findOneAndUpdate({ email }, { password_hash: hashed });

// //     await Otp.deleteOne({ email }); // cleanup

// //     return res.json({ ok: true, message: "Password updated successfully" });

// //   } catch (err) {
// //     console.error("Reset Error:", err);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // });

// // module.exports = router;

// // const express = require("express");
// // const bcrypt = require("bcryptjs");
// // const { sendMail } = require("../mail/sendMail");
// // const Otp = require("../models/otp");

// // const router = express.Router();


// // // auth code 

// // const express = require("express");
// // const bcrypt = require("bcryptjs");
// // const router = express.Router();

// // const { createUser, findByEmail } = require("../store/user.store");
// // const Otp = require("../models/otp");
// // const { sendMail } = require("../mail/sendMail");


// // // ---------------------- SEND OTP ----------------------
// // router.post("/forgot/send-otp", async (req, res) => {
// //   try {
// //     const { email } = req.body;

// //     if (!email) return res.status(400).json({ error: "Email required" });

// //     const userExists = await findByEmail(email);
// //     if (!userExists) return res.status(404).json({ error: "User not found" });

// //     const code = Math.floor(Math.random() * 900000 + 100000).toString();

// //     await Otp.findOneAndUpdate(
// //       { email },
// //       {
// //         code,
// //         verified: false,
// //         expiresAt: new Date(Date.now() + 5 * 60 * 1000),
// //       },
// //       { upsert: true }
// //     );

// //     await sendMail({
// //       to: email,
// //       subject: "QueueHire Password Reset OTP",
// //       text: `Your OTP is: ${code}`,
// //       html: `<p>Your OTP is: <strong>${code}</strong><br/>Valid for 5 minutes.</p>`
// //     });

// //     return res.json({ ok: true, message: "OTP sent" });

// //   } catch (err) {
// //     console.error("OTP Error:", err);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // });


// // // ---------------------- VERIFY OTP ----------------------
// // router.post("/forgot/verify", async (req, res) => {
// //   try {
// //     const { email, code } = req.body;

// //     if (!email || !code)
// //       return res.status(400).json({ error: "Email and OTP required" });

// //     const record = await Otp.findOne({ email });

// //     if (!record) return res.status(400).json({ error: "OTP not found" });

// //     if (record.expiresAt < new Date())
// //       return res.status(400).json({ error: "OTP expired" });

// //     if (record.code !== code)
// //       return res.status(400).json({ error: "Invalid OTP" });

// //     record.verified = true;
// //     await record.save();

// //     return res.json({ ok: true, message: "OTP verified" });

// //   } catch (err) {
// //     console.error("Verify Error:", err);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // });


// // // ---------------------- RESET PASSWORD ----------------------
// // router.post("/forgot/reset", async (req, res) => {
// //   try {
// //     const { email, code, newPassword } = req.body;

// //     if (!email || !code || !newPassword)
// //       return res.status(400).json({ error: "Missing fields" });

// //     const record = await Otp.findOne({ email });

// //     if (!record || record.code !== code)
// //       return res.status(400).json({ error: "Invalid or expired OTP" });

// //     if (!record.verified)
// //       return res.status(400).json({ error: "OTP not verified yet" });

// //     // ---- UPDATE PASSWORD USING findByEmail ----
// //     const userDoc = await findByEmail(email);

// //     if (!userDoc)
// //       return res.status(404).json({ error: "User no longer exists" });

// //     userDoc.password_hash = await bcrypt.hash(newPassword, 10);
// //     await userDoc.save();

// //     await Otp.deleteOne({ email });

// //     return res.json({ ok: true, message: "Password updated successfully" });

// //   } catch (err) {
// //     console.error("Reset Error:", err);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // });

// // // module.exports = router;


// // function generateOtpString() {
// //   // random 6-digit numeric or alphanumeric; pick what you like
// //   return Math.floor(100000 + Math.random() * 900000).toString();
// //   // or:
// //   // return [...Array(8)].map(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random()*36)]).join("");
// // }


// // router.post("/send-otp", async (req, res) => {
// //   try {
// //     const { email } = req.body;

// //     if (!email) {
// //       return res.status(400).json({ error: "email is required" });
// //     }

// //     const emailLower = email.toLowerCase();

// //     // if user already exists, don't allow signup OTP
// //     const existing = await findByEmail(emailLower);
// //     if (existing) {
// //       return res.status(400).json({ error: "user already exists" });
// //     }

// //     const code = generateOtpString();
// //     const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

// //     // optional: remove old OTPs for this email
// //     await Otp.deleteMany({ email: emailLower });

// //     await Otp.create({
// //       email: emailLower,
// //       code,
// //       expiresAt,
// //       verified: false,
// //     });

// //     await sendMail({
// //       to: emailLower,
// //       subject: "Your QueueHire verification code",
// //       text: `Your verification code is: ${code}\n\nThis code is valid for 10 minutes.`,
// //       html: `
// //         <p>Your verification code is:</p>
// //         <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${code}</p>
// //         <p>This code is valid for <strong>10 minutes</strong>.</p>
// //       `,
// //     });

// //     return res.json({ ok: true, message: "OTP sent to email" });
// //   } catch (err) {
// //     console.error("send-otp error:", err);
// //     return res.status(500).json({ error: "server error" });
// //   }
// // });

// // router.post("/verify-otp", async (req, res) => {
// //   try {
// //     const { email, otp } = req.body;

// //     if (!email || !otp) {
// //       return res
// //         .status(400)
// //         .json({ error: "email and otp are required" });
// //     }

// //     const emailLower = email.toLowerCase();
// //     const now = new Date();

// //     const otpDoc = await Otp.findOne({
// //       email: emailLower,
// //       code: otp,
// //       expiresAt: { $gt: now },
// //     }).sort({ createdAt: -1 });

// //     if (!otpDoc) {
// //       return res.status(400).json({
// //         error: "Invalid or expired OTP. Please check your email.",
// //       });
// //     }

// //     otpDoc.verified = true;
// //     await otpDoc.save();

// //     return res.json({ ok: true, message: "OTP verified" });
// //   } catch (err) {
// //     console.error("verify-otp error:", err);
// //     return res.status(500).json({ error: "server error" });
// //   }
// // });


// // /**
// //  * SIGNUP
// //  */
// // // router.post("/signup", async (req, res) => {
// // //   try {
// // //     console.log("req.body:", req.body);

// // //     const {
// // //       fullName = "",
// // //       email,
// // //       password,
// // //       role = "candidate",
// // //       phone = "",
// // //       location = "",
// // //       skills = "",
// // //     } = req.body;

// // //     if (!email || !password) {
// // //       return res.status(400).json({ error: "email and password required" });
// // //     }

// // //     // optional: this check; createUser also checks internally in our Mongo version
// // //     const existing = await findByEmail(email);
// // //     if (existing) {
// // //       return res.status(400).json({ error: "user already exists" });
// // //     }

// // //     const user = await createUser({
// // //       fullName,
// // //       email,
// // //       password,
// // //       role,
// // //       phone,
// // //       location,
// // //       skills,
// // //     });

// // //     console.log("created user:", user);

// // //     // send public user (no password_hash)
// // //     return res.status(200).json({
// // //       ok: true,
// // //       user,
// // //     });
// // //   } catch (err) {
// // //     console.error("Signup error:", err);
// // //     return res.status(500).json({ error: "server error" });
// // //   }
// // // });

// // router.post("/signup", async (req, res) => {
// //   try {
// //     console.log("req.body:", req.body);

// //     const {
// //       fullName = "",
// //       email,
// //       password,
// //       role = "candidate",
// //       phone = "",
// //       location = "",
// //       skills = "",
// //     } = req.body;

// //     if (!email || !password) {
// //       return res.status(400).json({ error: "email and password required" });
// //     }

// //     const emailLower = email.toLowerCase();

// //     const existing = await findByEmail(emailLower);
// //     if (existing) {
// //       return res.status(400).json({ error: "user already exists" });
// //     }

// //     // ✅ check OTP verification
// //     const now = new Date();
// //     const otpDoc = await Otp.findOne({
// //       email: emailLower,
// //       verified: true,
// //       expiresAt: { $gt: now },
// //     }).sort({ createdAt: -1 });

// //     if (!otpDoc) {
// //       return res.status(400).json({
// //         error: "Please verify the OTP sent to your email before signing up.",
// //       });
// //     }

// //     const user = await createUser({
// //       fullName,
// //       email: emailLower,
// //       password,
// //       role,
// //       phone,
// //       location,
// //       skills,
// //     });

// //     console.log("created user:", user);

// //     // optional: clean up OTP docs for this email
// //     await Otp.deleteMany({ email: emailLower });

// //     return res.status(200).json({
// //       ok: true,
// //       user,
// //     });
// //   } catch (err) {
// //     console.error("Signup error:", err);
// //     return res.status(500).json({ error: "server error" });
// //   }
// // });


// // /**
// //  * LOGIN
// //  */
// // router.post("/login", async (req, res) => {
// //   console.log('indie')
// //   try {
// //     const { email, password } = req.body;
// //     console.log(email,password)

// //     if (!email || !password) {
// //       return res.status(400).json({ error: "email and password required" });
// //     }

// //     const userDoc = await findByEmail(email);
// //     console.log(userDoc)
// //     if (!userDoc) {
// //       return res.status(401).json({ error: "invalid credentials" });
// //     }

// //     // findByEmail now returns a Mongoose document with password_hash
// //     const ok = await bcrypt.compare(password, userDoc.password_hash);
// //     console.log(ok,await bcrypt.hash(password,10))
// //     if (!ok) {
// //       return res.status(401).json({ error: "invalid credentials" });
// //     }

// //     // convert doc -> plain object before stripping password_hash
// //     const obj = userDoc.toObject();
// //     const { password_hash, __v, ...publicUser } = obj;

// //     // optional: expose id as string for frontend convenience
// //     publicUser.id = userDoc._id.toString();
// // console.log(publicUser)
// //     return res.status(200).json({
// //       ok: true,
// //       user: publicUser,
// //     });
// //   } catch (err) {
// //     console.error("Login error:", err);
// //     return res.status(500).json({ error: "server error" });
// //   }
// // });

// // module.exports = router;

// const express = require("express");
// const bcrypt = require("bcryptjs");
// const router = express.Router();

// const { createUser, findByEmail } = require("../store/user.store");
// const Otp = require("../models/otp");
// const { sendMail } = require("../mail/sendMail");

// //
// // --------- SHARED HELPER ---------
// //
// function generateOtpString() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// //
// // --------- FORGOT PASSWORD FLOW ---------
// //

// // 1) SEND OTP - FORGOT PASSWORD
// // POST /auth/forgot/send-otp
// router.post("/forgot/send-otp", async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ error: "Email required" });

//     const emailLower = email.toLowerCase();

//     const userExists = await findByEmail(emailLower);
//     if (!userExists) return res.status(404).json({ error: "User not found" });

//     const code = generateOtpString();

//     await Otp.findOneAndUpdate(
//       { email: emailLower },
//       {
//         code,
//         verified: false,
//         expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
//       },
//       { upsert: true }
//     );


//     const textBody = `Your QueueHire password reset code is: ${code}

// This code is valid for the next 5 minutes.

// If you did not request a password reset, please ignore this message.

// — QueueHire Support Team`;


// const htmlBody = `
// <!DOCTYPE html>
// <html>
//   <body style="margin:0; padding:0; background:#f3f4f6; font-family:'Segoe UI',Arial,sans-serif;">
//     <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
//       <tr>
//         <td align="center">
//           <table width="520" cellpadding="0" cellspacing="0" 
//             style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.05);">

//             <!-- Header -->
//             <tr>
//               <td style="background:linear-gradient(157deg,#2563eb,#06b6d4); padding:16px 24px; color:white; font-size:18px; font-weight:600;">
//                 Password Reset Verification
//               </td>
//             </tr>

//             <!-- Body -->
//             <tr>
//               <td style="padding:24px; color:#1f2937; font-size:15px; line-height:1.7;">
//                 <p>Hi,</p>
//                 <p>You requested to reset your QueueHire account password.</p>

//                 <!-- OTP Box -->
//                 <div style="margin:24px auto; text-align:center;">
//                   <div style="display:inline-block; padding:16px 28px; font-size:28px; font-weight:700; 
//                     color:#2563eb; background:#eef6ff; border:2px solid #2563eb; border-radius:12px;">
//                     ${code}
//                   </div>
//                   <p style="margin-top:8px; font-size:13px; color:#6b7280;">
//                     This code is valid for <strong>5 minutes</strong>.
//                   </p>
//                 </div>

//                 <p>If you did not request this, you can safely ignore this email.</p>

//                 <p style="margin-top:22px;">
//                   Best regards,<br/>
//                   <strong>QueueHire Support Team</strong>
//                 </p>
//               </td>
//             </tr>

//             <!-- Footer -->
//             <tr>
//               <td style="padding:14px 24px; background:#fafafa; color:#6b7280; font-size:11px; text-align:center;">
//                 This email was sent by QueueHire automated security system.
//               </td>
//             </tr>

//           </table>
//         </td>
//       </tr>
//     </table>
//   </body>
// </html>
// `;


//     await sendMail({
//       to: emailLower,
//       subject: "QueueHire Password Reset OTP",
//       text: textBody,
//       html: htmlBody
//     });

//     return res.json({ ok: true, message: "OTP sent" });
//   } catch (err) {
//     console.error("OTP Error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // 2) VERIFY OTP - FORGOT PASSWORD
// // POST /auth/forgot/verify
// router.post("/forgot/verify-otp", async (req, res) => {
//   try {
//     const { email, code } = req.body;

//     if (!email || !code)
//       return res.status(400).json({ error: "Email and OTP required" });

//     const emailLower = email.toLowerCase();
//     const record = await Otp.findOne({ email: emailLower });

//     console.log(record)

//     if (!record) return res.status(400).json({ error: "OTP not found" });
//     if (record.expiresAt < new Date())
//       return res.status(400).json({ error: "OTP expired" });
//     if (record.code !== code)
//       return res.status(400).json({ error: "Invalid OTP" });

//     record.verified = true;
//     await record.save();

//     return res.json({ ok: true, message: "OTP verified" });
//   } catch (err) {
//     console.error("Verify Error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // 3) RESET PASSWORD
// // POST /auth/forgot/reset
// router.post("/forgot/reset", async (req, res) => {
//   try {
//     const { email, code, newPassword } = req.body;

//     if (!email || !code || !newPassword)
//       return res.status(400).json({ error: "Missing fields" });

//     const emailLower = email.toLowerCase();
//     const record = await Otp.findOne({ email: emailLower });

//     if (!record || record.code !== code)
//       return res.status(400).json({ error: "Invalid or expired OTP" });
//     if (!record.verified)
//       return res.status(400).json({ error: "OTP not verified yet" });

//     const userDoc = await findByEmail(emailLower);
//     if (!userDoc)
//       return res.status(404).json({ error: "User no longer exists" });

//     userDoc.password_hash = await bcrypt.hash(newPassword, 10);
//     await userDoc.save();

//     await Otp.deleteMany({ email: emailLower });

//     return res.json({ ok: true, message: "Password updated successfully" });
//   } catch (err) {
//     console.error("Reset Error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// //
// // --------- SIGNUP OTP FLOW ---------
// //

// // 4) SEND OTP - SIGNUP
// // POST /auth/send-otp
// router.post("/send-otp", async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ error: "email is required" });
//     }

//     const emailLower = email.toLowerCase();

//     const existing = await findByEmail(emailLower);
//     if (existing) {
//       return res.status(400).json({ error: "user already exists" });
//     }

//     const code = generateOtpString();
//     const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

//     await Otp.deleteMany({ email: emailLower });

//     await Otp.create({
//       email: emailLower,
//       code,
//       expiresAt,
//       verified: false,
//     });

//     const textBody = `Your QueueHire verification code is: ${code}

// This code is valid for the next 10 minutes.

// If you did not request this verification, please ignore this message.

// — QueueHire Team`;

// const htmlBody = `
// <!DOCTYPE html>
// <html>
//   <body style="margin:0; padding:0; background:#f3f4f6; font-family:'Segoe UI',Arial,sans-serif;">
//     <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
//       <tr>
//         <td align="center">

//           <table width="520" cellpadding="0" cellspacing="0" 
//             style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.05);">

//             <!-- Header -->
//             <tr>
//               <td style="background:linear-gradient(157deg,#2563eb,#06b6d4); padding:16px 24px; 
//               color:white; font-size:18px; font-weight:600;">
//                 Verify Your Email
//               </td>
//             </tr>

//             <!-- Body -->
//             <tr>
//               <td style="padding:24px; color:#1f2937; font-size:15px; line-height:1.7;">
                
//                 <p>Hello,</p>

//                 <p>To complete your sign-up, please use the verification code below:</p>

//                 <!-- OTP Box -->
//                 <div style="margin:24px 0; text-align:center;">
//                   <div style="
//                     display:inline-block; 
//                     padding:16px 32px; 
//                     font-size:28px; 
//                     font-weight:700; 
//                     letter-spacing:8px;
//                     background:#eef6ff; 
//                     border:2px solid #2563eb; 
//                     color:#2563eb; 
//                     border-radius:12px;">
//                     ${code}
//                   </div>
//                   <p style="margin-top:8px; font-size:13px; color:#6b7280;">
//                     This code is valid for <strong>10 minutes</strong>.
//                   </p>
//                 </div>

//                 <p>If you didn’t request this verification, please ignore this email.</p>

//                 <p style="margin-top:22px;">
//                   Best regards,<br/>
//                   <strong>QueueHire Team</strong>
//                 </p>
//               </td>
//             </tr>

//             <!-- Footer -->
//             <tr>
//               <td style="padding:14px 24px; background:#fafafa; 
//               color:#6b7280; font-size:11px; text-align:center;">
//                 This is an automated message. Please do not reply.
//               </td>
//             </tr>

//           </table>

//         </td>
//       </tr>
//     </table>
//   </body>
// </html>
// `;


//     await sendMail({
//       to: emailLower,
//       subject: "Your QueueHire verification code",
//       text: textBody,
//       html: htmlBody,
//     });

//     return res.json({ ok: true, message: "OTP sent to email" });
//   } catch (err) {
//     console.error("send-otp error:", err);
//     return res.status(500).json({ error: "server error" });
//   }
// });

// // 5) VERIFY OTP - SIGNUP
// // POST /auth/verify-otp
// router.post("/verify-otp", async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res
//         .status(400)
//         .json({ error: "email and otp are required" });
//     }

//     const emailLower = email.toLowerCase();
//     const now = new Date();

//     const otpDoc = await Otp.findOne({
//       email: emailLower,
//       code: otp,
//       expiresAt: { $gt: now },
//     }).sort({ createdAt: -1 });

//     if (!otpDoc) {
//       return res.status(400).json({
//         error: "Invalid or expired OTP. Please check your email.",
//       });
//     }

//     otpDoc.verified = true;
//     await otpDoc.save();

//     return res.json({ ok: true, message: "OTP verified" });
//   } catch (err) {
//     console.error("verify-otp error:", err);
//     return res.status(500).json({ error: "server error" });
//   }
// });

// //
// // --------- SIGNUP ---------
// //

// router.post("/signup", async (req, res) => {
//   try {
//     console.log("req.body:", req.body);

//     const {
//       fullName = "",
//       email,
//       password,
//       role = "candidate",
//       phone = "",
//       location = "",
//       skills = "",
//     } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ error: "email and password required" });
//     }

//     const emailLower = email.toLowerCase();

//     const existing = await findByEmail(emailLower);
//     if (existing) {
//       return res.status(400).json({ error: "user already exists" });
//     }

//     const now = new Date();
//     const otpDoc = await Otp.findOne({
//       email: emailLower,
//       verified: true,
//       expiresAt: { $gt: now },
//     }).sort({ createdAt: -1 });

//     if (!otpDoc) {
//       return res.status(400).json({
//         error: "Please verify the OTP sent to your email before signing up.",
//       });
//     }

//     const user = await createUser({
//       fullName,
//       email: emailLower,
//       password,
//       role,
//       phone,
//       location,
//       skills,
//     });

//     console.log("created user:", user);

//     await Otp.deleteMany({ email: emailLower });

//     return res.status(200).json({
//       ok: true,
//       user,
//     });
//   } catch (err) {
//     console.error("Signup error:", err);
//     return res.status(500).json({ error: "server error" });
//   }
// });

// //
// // --------- LOGIN ---------
// //

// router.post("/login", async (req, res) => {
//   console.log("inside /login");
//   try {
//     const { email, password } = req.body;
//     console.log(email, password);

//     if (!email || !password) {
//       return res.status(400).json({ error: "email and password required" });
//     }

//     const emailLower = email.toLowerCase();
//     const userDoc = await findByEmail(emailLower);
//     console.log(userDoc);
//     if (!userDoc) {
//       return res.status(401).json({ error: "invalid credentials" });
//     }

//     const ok = await bcrypt.compare(password, userDoc.password_hash);
//     if (!ok) {
//       return res.status(401).json({ error: "invalid credentials" });
//     }

//     const obj = userDoc.toObject();
//     const { password_hash, __v, ...publicUser } = obj;
//     publicUser.id = userDoc._id.toString();

//     console.log(publicUser);
//     return res.status(200).json({
//       ok: true,
//       user: publicUser,
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     return res.status(500).json({ error: "server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { createUser, findByEmail } = require("../store/user.store");
const Otp = require("../models/otp");
const { sendMail } = require("../mail/sendMail");

function generateOtpString() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post("/forgot/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });

    const emailLower = email.toLowerCase();

    const userExists = await findByEmail(emailLower);
    if (!userExists) return res.status(404).json({ error: "User not found" });

    const code = generateOtpString();

    await Otp.findOneAndUpdate(
      { email: emailLower },
      {
        code,
        verified: false,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
      { upsert: true }
    );

    const textBody = `Your QueueHire password reset code is: ${code}

This code is valid for the next 5 minutes.

If you did not request a password reset, please ignore this message.

— QueueHire Support Team`;

    const htmlBody = `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#f3f4f6; font-family:'Segoe UI',Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
      <tr>
        <td align="center">
          <table width="520" cellpadding="0" cellspacing="0" 
            style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.05);">
            <tr>
              <td style="background:linear-gradient(157deg,#2563eb,#06b6d4); padding:16px 24px; color:white; font-size:18px; font-weight:600;">
                Password Reset Verification
              </td>
            </tr>
            <tr>
              <td style="padding:24px; color:#1f2937; font-size:15px; line-height:1.7;">
                <p>Hi,</p>
                <p>You requested to reset your QueueHire account password.</p>
                <div style="margin:24px auto; text-align:center;">
                  <div style="display:inline-block; padding:16px 28px; font-size:28px; font-weight:700; 
                    color:#2563eb; background:#eef6ff; border:2px solid #2563eb; border-radius:12px;">
                    ${code}
                  </div>
                  <p style="margin-top:8px; font-size:13px; color:#6b7280;">
                    This code is valid for <strong>5 minutes</strong>.
                  </p>
                </div>
                <p>If you did not request this, you can safely ignore this email.</p>
                <p style="margin-top:22px;">
                  Best regards,<br/>
                  <strong>QueueHire Support Team</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 24px; background:#fafafa; color:#6b7280; font-size:11px; text-align:center;">
                This email was sent by QueueHire automated security system.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

    await sendMail({
      to: emailLower,
      subject: "QueueHire Password Reset OTP",
      text: textBody,
      html: htmlBody,
    });

    return res.json({ ok: true, message: "OTP sent" });
  } catch (err) {
    console.error("OTP Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/forgot/verify-otp", async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code)
      return res.status(400).json({ error: "Email and OTP required" });

    const emailLower = email.toLowerCase();
    const record = await Otp.findOne({ email: emailLower });

    console.log(record);

    if (!record) return res.status(400).json({ error: "OTP not found" });
    if (record.expiresAt < new Date())
      return res.status(400).json({ error: "OTP expired" });
    if (record.code !== code)
      return res.status(400).json({ error: "Invalid OTP" });

    record.verified = true;
    await record.save();

    return res.json({ ok: true, message: "OTP verified" });
  } catch (err) {
    console.error("Verify Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/forgot/reset", async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword)
      return res.status(400).json({ error: "Missing fields" });

    const emailLower = email.toLowerCase();
    const record = await Otp.findOne({ email: emailLower });

    if (!record || record.code !== code)
      return res.status(400).json({ error: "Invalid or expired OTP" });
    if (!record.verified)
      return res.status(400).json({ error: "OTP not verified yet" });

    const userDoc = await findByEmail(emailLower);
    if (!userDoc)
      return res.status(404).json({ error: "User no longer exists" });

    userDoc.password_hash = await bcrypt.hash(newPassword, 10);
    await userDoc.save();

    await Otp.deleteMany({ email: emailLower });

    return res.json({ ok: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("Reset Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "email is required" });
    }

    const emailLower = email.toLowerCase();

    const existing = await findByEmail(emailLower);
    if (existing) {
      return res.status(400).json({ error: "user already exists" });
    }

    const code = generateOtpString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await Otp.deleteMany({ email: emailLower });

    await Otp.create({
      email: emailLower,
      code,
      expiresAt,
      verified: false,
    });

    const textBody = `Your QueueHire verification code is: ${code}

This code is valid for the next 10 minutes.

If you did not request this verification, please ignore this message.

— QueueHire Team`;

    const htmlBody = `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#f3f4f6; font-family:'Segoe UI',Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
      <tr>
        <td align="center">
          <table width="520" cellpadding="0" cellspacing="0" 
            style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.05);">
            <tr>
              <td style="background:linear-gradient(157deg,#2563eb,#06b6d4); padding:16px 24px; 
              color:white; font-size:18px; font-weight:600;">
                Verify Your Email
              </td>
            </tr>
            <tr>
              <td style="padding:24px; color:#1f2937; font-size:15px; line-height:1.7;">
                <p>Hello,</p>
                <p>To complete your sign-up, please use the verification code below:</p>
                <div style="margin:24px 0; text-align:center;">
                  <div style="
                    display:inline-block; 
                    padding:16px 32px; 
                    font-size:28px; 
                    font-weight:700; 
                    letter-spacing:8px;
                    background:#eef6ff; 
                    border:2px solid #2563eb; 
                    color:#2563eb; 
                    border-radius:12px;">
                    ${code}
                  </div>
                  <p style="margin-top:8px; font-size:13px; color:#6b7280;">
                    This code is valid for <strong>10 minutes</strong>.
                  </p>
                </div>
                <p>If you didn’t request this verification, please ignore this email.</p>
                <p style="margin-top:22px;">
                  Best regards,<br/>
                  <strong>QueueHire Team</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 24px; background:#fafafa; 
              color:#6b7280; font-size:11px; text-align:center;">
                This is an automated message. Please do not reply.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

    await sendMail({
      to: emailLower,
      subject: "Your QueueHire verification code",
      text: textBody,
      html: htmlBody,
    });

    return res.json({ ok: true, message: "OTP sent to email" });
  } catch (err) {
    console.error("send-otp error:", err);
    return res.status(500).json({ error: "server error" });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: "email and otp are required" });
    }

    const emailLower = email.toLowerCase();
    const now = new Date();

    const otpDoc = await Otp.findOne({
      email: emailLower,
      code: otp,
      expiresAt: { $gt: now },
    }).sort({ createdAt: -1 });

    if (!otpDoc) {
      return res.status(400).json({
        error: "Invalid or expired OTP. Please check your email.",
      });
    }

    otpDoc.verified = true;
    await otpDoc.save();

    return res.json({ ok: true, message: "OTP verified" });
  } catch (err) {
    console.error("verify-otp error:", err);
    return res.status(500).json({ error: "server error" });
  }
});


router.post("/signup", async (req, res) => {
  try {
    console.log("req.body:", req.body);

    const {
      fullName = "",
      email,
      password,
      role = "candidate",
      phone = "",
      location = "",
      skills = "",
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password required" });
    }

    const emailLower = email.toLowerCase();

    const existing = await findByEmail(emailLower);
    if (existing) {
      return res.status(400).json({ error: "user already exists" });
    }

    const now = new Date();
    const otpDoc = await Otp.findOne({
      email: emailLower,
      verified: true,
      expiresAt: { $gt: now },
    }).sort({ createdAt: -1 });

    if (!otpDoc) {
      return res.status(400).json({
        error: "Please verify the OTP sent to your email before signing up.",
      });
    }

    const user = await createUser({
      fullName,
      email: emailLower,
      password,
      role,
      phone,
      location,
      skills,
    });

    console.log("created user:", user);

    await Otp.deleteMany({ email: emailLower });

    return res.status(200).json({
      ok: true,
      user,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "server error" });
  }
});


router.post("/login", async (req, res) => {
  console.log("inside /login");
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(400).json({ error: "email and password required" });
    }

    const emailLower = email.toLowerCase();
    const userDoc = await findByEmail(emailLower);
    console.log(userDoc);
    if (!userDoc) {
      return res.status(401).json({ error: "invalid credentials" });
    }

    const ok = await bcrypt.compare(password, userDoc.password_hash);
    if (!ok) {
      return res.status(401).json({ error: "invalid credentials" });
    }

    const obj = userDoc.toObject();
    const { password_hash, __v, ...publicUser } = obj;
    publicUser.id = userDoc._id.toString();

    console.log(publicUser);
    return res.status(200).json({
      ok: true,
      user: publicUser,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
