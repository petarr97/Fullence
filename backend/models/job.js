const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  firm: {
    type: String,
    required: true,
  },
  descSubstring: {
    type: String,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  companyInfo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Job", jobSchema);
