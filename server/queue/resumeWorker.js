
require("dotenv").config();

const { Worker } = require("bullmq");
const fs = require("fs");
const pdfParse = require("pdf-parse-fixed");

const { redis } = require("./redis");
const { connectDB } = require("../db");

const { sendMail } = require("../mail/sendMail");

const Job = require("../models/job");
const Application = require("../models/application");
const CandidateProfile = require("../models/candidates");
const File = require("../models/File");

const EDUCATION_KEYWORDS = [
  "btech",
  "b.tech",
  "bachelor",
  "be ",
  "b.e",
  "computer science",
  "cs ",
  "mca",
  "engineering",
];

async function processResumeJob(job) {
  const {
    jobId,
    userId,
    name,
    email,
    phone,
    resumePath,
    originalName,
    mimeType,
    sizeBytes,
  } = job.data;

  console.log("⚙️ [Worker] Processing resume job:", job.id);
  const jobDoc = await Job.findById(jobId).lean();
  if (!jobDoc) {
    throw new Error(`Job not found for jobId=${jobId}`);
  }

  const pdfBuffer = fs.readFileSync(resumePath);
  const parsed = await pdfParse(pdfBuffer);
  const resumeTextRaw = parsed.text || "";
  const resumeText = resumeTextRaw.toLowerCase();

  console.log("\n========= EXTRACTED PDF TEXT =========");
  console.log(resumeTextRaw.slice(0, 1000));
  console.log("======================================\n");

  const matchedSkills = [];
  let skillScore = 0;

  (jobDoc.skills || []).forEach((s) => {
    const skillNameLower = (s.name || "").toLowerCase();
    if (resumeText.includes(skillNameLower)) {
      matchedSkills.push(s.name);
      skillScore += s.freq || 0;
    }
  });

  let experienceYears = 0;
  const expMatch = resumeText.match(/(\d+)\s*(years?|yrs?)/);
  if (expMatch) {
    experienceYears = parseInt(expMatch[1], 10);
  }

  let requiredYears = 0;
  (jobDoc.qualifications || []).forEach((q) => {
    const m = (q || "").match(/(\d+)\s*\+?\s*years?/i);
    if (m) {
      const yrs = parseInt(m[1], 10);
      if (yrs > requiredYears) requiredYears = yrs;
    }
  });

  let experienceScore = 0;
  if (requiredYears > 0 && experienceYears >= requiredYears) {
    experienceScore = 30;
  } else if (experienceYears > 0) {
    experienceScore = 15;
  }

  const hasEducation = EDUCATION_KEYWORDS.some((k) => resumeText.includes(k));

  const qualificationScore = hasEducation ? 20 : 0;

  const maxSkillScore = (jobDoc.skills || []).reduce(
    (sum, s) => sum + (s.freq || 0),
    0
  );
  const finalScore = skillScore + experienceScore + qualificationScore;
  const PASS_THRESHOLD = maxSkillScore * 0.4;

  const passed = finalScore >= PASS_THRESHOLD && matchedSkills.length >= 2;

  const status = passed ? "PASSED_RESUME_SCREEN" : "FAILED_RESUME_SCREEN";

  console.log("\n========= RESUME SCORING =========");
  console.log("Job:", jobDoc.title);
  console.log("Matched Skills:", matchedSkills);
  console.log("Skill Score:", skillScore, "/", maxSkillScore);
  console.log("Experience (yrs):", experienceYears, "Required:", requiredYears);
  console.log("Experience Score:", experienceScore);
  console.log("Has Education:", hasEducation);
  console.log("Qualification Score:", qualificationScore);
  console.log("Final Score:", finalScore);
  console.log("Pass Threshold:", PASS_THRESHOLD);
  console.log("Result:", status);
  console.log("===================================\n");

  let candidateProfile = await CandidateProfile.findOne({ userId });
  console.log("candidate");

  if (!candidateProfile) {
    candidateProfile = await CandidateProfile.create({
      userId,
      name,
      email,
      phone,
      resumeText: resumeTextRaw,
      matchedSkills,
      totalSkillsMatched: matchedSkills.length,
      experienceYears,
      hasEducation,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log(
      "✨ CandidateProfile created:",
      candidateProfile._id.toString()
    );
  } else {
    await CandidateProfile.findByIdAndUpdate(candidateProfile._id, {
      resumeText: resumeTextRaw,
      matchedSkills,
      totalSkillsMatched: matchedSkills.length,
      experienceYears,
      hasEducation,
      updatedAt: new Date(),
    });
  }

  const now = new Date();
  const resumeStageStatus = passed ? "passed" : "failed";

  const levels =
    Array.isArray(jobDoc.levels) && jobDoc.levels.length
      ? jobDoc.levels
      : ["Resume Screen"];

  const stages = levels.map((levelName, idx) => {
    const lower = (levelName || "").toLowerCase();
    let type = "screen";
    if (lower.includes("coding") || lower.includes("online")) type = "coding";
    else if (lower.includes("interview")) type = "interview";
    else if (
      lower.includes("case") ||
      lower.includes("assignment") ||
      lower.includes("gd")
    )
      type = "assignment";

    if (idx === 0) {
      return {
        name: levelName,
        type,
        status: resumeStageStatus,
        date: now,
        score: finalScore,
        notes: `Matched skills: ${matchedSkills.join(", ")}`,
      };
    }

    return {
      name: levelName,
      type,
      status: "pending",
      date: null,
      score: null,
      notes: "",
    };
  });

  let overallStatus;
  let currentStage;

  if (passed) {
    overallStatus = "in_progress";
    currentStage = levels[1] || levels[0] || "Resume Screen";
  } else {
    overallStatus = "rejected";
    currentStage = "Application closed";
  }



  const appDoc = await Application.create({
    jobId: jobDoc._id,
    candidateId: candidateProfile ? candidateProfile._id : null,

    candidateName: name,
    candidateEmail: email,
    candidatePhone: phone,

    appliedOn: now,
    jobTitle: jobDoc.title,

    overallStatus,
    currentStage,
    privateNote: "",

    stages,

    activity: [
      { title: "Application submitted (queued)", time: now },
      { title: "Resume uploaded", time: now },
      {
        title: passed
          ? "Resume shortlisted automatically"
          : "Rejected at resume screen",
        time: now,
      },
    ],
  });


  const textBody = `Hi ${name},

Thank you for applying for the position of ${jobDoc.title}. We truly appreciate the time and effort you invested in preparing and submitting your application.

Your resume has been successfully received and reviewed by our automated screening system.

Application status: ${
  passed ? "Shortlisted for the next stage" : "Not shortlisted at the resume screening stage"
}
Evaluation score: ${finalScore}

${
  passed
    ? "Great news — your profile aligns well with the key requirements for this role. Our hiring team will reach out to you shortly with details on the next steps in the selection process."
    : "At this stage, we will not be moving forward with your application based on the initial screening. This decision is specific to the current opening and does not reflect your overall potential. We encourage you to explore and apply for other opportunities with us in the future."
}

Thank you once again for considering an opportunity with us.

Warm regards,
HR Team
`;


  console.log("emial", email);
  try {
    await sendMail({
      to: email,
      subject: `We received your application for ${jobDoc.title}`,
      text: textBody,

      html: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Application update – ${jobDoc.title}</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f3f4f6;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f3f4f6; padding:24px 0;">
      <tr>
        <td align="center">
          <table cellpadding="0" cellspacing="0" width="640" style="max-width:640px; background-color:#ffffff; border-radius:18px; overflow:hidden; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; color:#111827;">
            
            <!-- Brand header with logo + gradient -->
            <tr>
              <td style="background:linear-gradient(157deg, #2563eb, #06b6d4); padding:16px 24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="color:#ffffff; font-size:18px; font-weight:600;">
                      QueueHire
                    </td>
                    <td align="right" style="color:#e5e7eb; font-size:12px;">
                      Application update
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Card title -->
            <tr>
              <td style="padding:18px 24px 0 24px; border-bottom:1px solid #e5e7eb;">
                <h1 style="margin:0 0 12px 0; font-size:18px; color:#111827;">
                  We received your application for ${jobDoc.title}
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:20px 24px 8px 24px; font-size:14px; line-height:1.7;">
                <p style="margin:0 0 12px 0;">Hi ${name},</p>

                <p style="margin:0 0 12px 0;">
                  Thank you for applying for the position of 
                  <strong>${jobDoc.title}</strong>. We appreciate the time and effort you invested in your application.
                </p>

                <p style="margin:0 0 16px 0;">
                  Your resume has been successfully received and reviewed by our automated screening system.
                </p>

                <!-- Status highlight box -->
                <table cellpadding="0" cellspacing="0" style="margin:8px 0 20px 0; background-color:#f5f3ff; border-left:4px solid #4f46e5; border-radius:8px; width:100%;">
                  <tr>
                    <td style="padding:12px 16px; font-size:14px;">
                      <div style="margin-bottom:4px;">
                        <strong>Application status:</strong>
                        <span style="margin-left:4px;">
                          ${
                            passed
                              ? "Shortlisted for the next stage ✅"
                              : "Not shortlisted at resume screening"
                          }
                        </span>
                      </div>
                      <div>
                        <strong>Evaluation score:</strong>
                        <span style="margin-left:4px;">${finalScore}</span>
                      </div>
                    </td>
                  </tr>
                </table>

                ${
                  passed
                    ? `
                <p style="margin:0 0 12px 0;">
                  Great news — your profile aligns well with the requirements of this role. 
                  Our recruitment team will reach out to you shortly with details about the upcoming stage in the selection process.
                </p>
                `
                    : `
                <p style="margin:0 0 12px 0;">
                  At this stage, we will not be proceeding further with your application based on the resume screening results. 
                  This decision is specific to the current opening and does not reflect your overall skills or potential.
                </p>
                <p style="margin:0 0 12px 0;">
                  We truly appreciate your interest and encourage you to explore other roles on QueueHire that may be a closer match to your profile.
                </p>
                `
                }

                <!-- CTA -->
                <p style="margin:18px 0 12px 0;">
                  <a href="https://your-career-portal-url.com"
                     style="display:inline-block; padding:12px 24px; background-color:#4f46e5; color:#ffffff; text-decoration:none; border-radius:999px; font-weight:600; font-size:14px;">
                    View application status
                  </a>
                </p>

                <p style="margin:16px 0 6px 0;">
                  Thank you once again for considering an opportunity with us.
                </p>

                <p style="margin:0;">
                  Warm regards,<br/>
                  <strong>HR Team</strong><br/>
                  <span style="font-size:12px; color:#6b7280;">QueueHire · Powered by SPRITLE</span>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:12px 24px 18px 24px; font-size:11px; color:#9ca3af; border-top:1px solid #e5e7eb;">
                You are receiving this email because you applied for a position via QueueHire.
                If this was not you, you can safely ignore this message.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    });
  } catch (err) {
    console.error("❌ Failed to send application received email:", err);
  }

  await File.create({
    ownerUserId: userId || null,
    candidateId: candidateProfile ? candidateProfile._id : null,
    applicationId: appDoc._id,
    type: "resume",
    originalName,
    path: resumePath,
    mimeType,
    sizeBytes,
    uploadedAt: now,
  });

  const jobInc = { applied: 1 };
  if (passed) {
    jobInc.shortlisted = 1;
  }
  await Job.findByIdAndUpdate(jobDoc._id, { $inc: jobInc });

  return {
    applicationId: appDoc._id.toString(),
    status,
    finalScore,
  };
}

(async () => {
  try {
    await connectDB();
    console.log(
      "🧵 Resume worker connected to Mongo, starting BullMQ worker..."
    );

    const worker = new Worker(
      "resume-processing",
      async (job) => {
        return await processResumeJob(job);
      },
      {
        connection: redis,
        concurrency: 1,
      }
    );

    worker.on("completed", (job, result) => {
      console.log(`✅ Resume job ${job.id} completed:`, result);
    });

    worker.on("failed", (job, err) => {
      console.error(`❌ Resume job ${job?.id} failed:`, err);
    });
  } catch (err) {
    console.error("❌ Failed to start resume worker:", err);
    process.exit(1);
  }
})();
