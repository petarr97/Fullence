const mongoose = require("mongoose");

const jobTypeSchema = mongoose.Schema({
  job_type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("JobType", jobTypeSchema);
