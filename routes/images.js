var express = require('express');
var router = express.Router();

/*
#################################################
    MULTER CONFIGURATIONS
*/
const multer = require('multer');

//Configure multer to store all images to static directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/' + req.params.category)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.' + file.mimetype.split('/')[1]);
    }
  });

  const upload =
    multer({
      storage: storage
    }).single('file');

/*
################################################
    ROUTINGS
*/
/* POST an image to a category */
router.post('/:category', upload, (req, res, next) => {

  upload(req, res, err => {
    if (err) {
      return res.end('Error uploading file');
    }
  const host = req.hostname;
  const filePath = req.protocol + "://" + host + ':3000' + '/'
                + req.file.path.split('public/')[1];

  const response = {
    "message":"File Uploaded !",
    "url": filePath
  };

  res.json(response);

  }, err => {
    console.log(err);
  })
});

module.exports = router;
