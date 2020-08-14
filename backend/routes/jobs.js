const express = require("express");
const router = express.Router();
const multer = require("multer");
const Job = require("../models/job");

const checkAuth = require("../middleware/check-auth");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");       // only images of specified format may be uploaded
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

// create new job advert advert
router.post(
  "",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;

    if (req.file) {
      const url = req.protocol + '://' + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }

    const url = req.protocol + "://" + req.get("host");

    const post = new Job({
      title: req.body.title,
      description: req.body.description,
      imagePath: imagePath,
      location: req.body.location,
      jobType: req.body.jobType,
      firm: req.body.firm,
      creator: req.userData.userId,
      companyInfo: req.body.companyInfo,
    });

    post.save()
      .then((result) => {
        res.status(201).json({
          message: "Job advert added succesfully!",
          post: {
            ...result,
            id: result._id,
          },
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Creating a job advert failed!",
        });
      });
  }
);

// get all job adverts 
router.get("", (req, res, next) => {
  Job.find()
    .then((documents) => {
      res.status(200).json({
        message: "Job adverts fetched succesfully!",
        jobs: documents,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching job adverts failed!",
      });
    });
});

// update existing job advert
router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;

    // image path definition
    if (req.file) {
      const url = req.protocol + '://' + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }

    const post = new Job({
      _id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      imagePath: imagePath,
      location: req.body.location,
      jobType: req.body.jobType,
      firm: req.body.firm,
      creator: req.userData.userId,
      companyInfo: req.body.companyInfo
    });

    Job.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then(result => {
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(402).json({
          message: "No changes have been made!"
        });
      }
    })
      .catch(error => {
        res.status(500).json({
          message: "Cannot update job advert!"
        });
      });

    Job.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
      .then((result) => {
        if (result.nModified > 0) {
          res.status(200).json({ message: "Update successful!" });
        } else {
          res.status(401).json({ message: "You are not authorized for this action!" });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: "Cannot update job advert!",
        });
      });
  }
);

// get job advert by respective id
router.get("/:id", (req, res, next) => {
  Job.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "Job advert not found!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching job adverts failed!",
      });
    });
});

// deletion of job advert
router.delete("/:id", checkAuth, (req, res, next) => {
  console.log(req.params.id);
  Job.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Job advert deleted!" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deleting job advert failed!",
      });
    });
});

module.exports = router;
