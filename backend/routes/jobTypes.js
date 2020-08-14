const express = require("express");
const router = express.Router();
const multer = require('multer');
const JobType = require('../models/jobType');

// create new job type
router.post("/", (req, res, next) => {

  const type = new JobType({
    job_type: req.body.job_type
  });

  type.save()
    .then(result => {
      res.status(201).json({
        message: "Job type added succesfully!",
        job_type: {
          ...result,
          id: result._id
        }
      });
    });
});

// get all job types
router.get('/', (req, res, next) => {
  JobType.find()
    .then(documents => {
      res.status(200).json({
        message: "Job types fetched succesfully!",
        job_type: documents
      });
    });
});

module.exports = router;
