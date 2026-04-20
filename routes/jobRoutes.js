const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// Create job
router.post("/", async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json(job);
});

// Get all jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// Update job
router.put("/:id", async (req, res) => {
  const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete job
router.delete("/:id", async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;