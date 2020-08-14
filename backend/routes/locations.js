const express = require("express");
const router = express.Router();
const multer = require('multer');
const Location = require('../models/location');

// create new location
router.post("/", (req, res, next) => {
  const loc = new Location({
    location: req.body.location
  });

  loc.save()
    .then(result => {
      res.status(201).json({
        message: "Job location added succesfully!",
        location: {
          ...result,
          id: result._id
        }
      });
    });
});

// get all locations
router.get('/', (req, res, next) => {
  Location.find()
    .then(documents => {
      res.status(200).json({
        message: "Job locations fetched succesfully!",
        location: documents
      });
    });
});

module.exports = router;
