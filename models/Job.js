const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: String,
  role: String,
  status: {
    type: String,
    enum: ["Applied", "Interview", "Rejected", "Offer"],
    default: "Applied"
  },
  link: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Job", jobSchema);