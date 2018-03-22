var express = require('express');
var router = express.Router();
const fs = require('fs');
const ls = require('ls');

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

/* DELETE an image */
var findRemoveSync = require('find-remove')

router.delete('/:filename',(req, res, next)=>{
  var result = findRemoveSync('./public/images/',{files: req.params.filename, limit: 1})
  Object.keys(result).length == 0? res.sendStatus(400) : res.sendStatus(200)
  res.end()
})

/* GET ALL IMAGES from CATEGORY */
router.get('/:category', (req, res, next) => {

  try {
    let listedImages = ls('./public/images/'+req.params.category+'/*');
    let images = [];
    console.log(req.param.category)

    listedImages.forEach( listing => {
      images.push(listing.name);
    });

    let reply = {
      "files":  images
    };

    res.json(reply);

  } catch(err) {
    console.log(err);
    res.end(400);
  }
});

module.exports = router;
