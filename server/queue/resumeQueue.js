const { Queue } = require("bullmq");
const { redis } = require("./redis");

const resumeQueue = new Queue("resume-processing", {
  connection: redis,
});

module.exports = { resumeQueue };
