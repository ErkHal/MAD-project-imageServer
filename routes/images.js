var express = require('express');
var router = express.Router();
const fs = require('fs');
const ls = require('ls');

/*
<<<<<<< HEAD
#################################################
    MULTER CONFIGURATIONS

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
=======
>>>>>>> 3101f3499c54f019b92950d49b4cb5e135851160
################################################
    ROUTINGS
*/
/* POST an image to a category */
<<<<<<< HEAD
router.post('/:category', function (req, res, next){
  var tmp = new Buffer.from(req.body.file,'base64').toString()
  console.log
  var str = tmp.split(",")[1]
  var ext = tmp.split("/",1)[1].split(";")[0]
  var raw = new Buffer.from(str, 'base64')

  fs.writeFile('./public/images/'+req.params.category+'/'+Date.now()+"."+ext,raw, function(err) {
    if(err) console.log("error from writefile idk why")
  })
  
 console.log("after assingment")

  const host = req.hostname;

  const response = {
    "message":"File Uploaded !",
    "url": "test"
  };

  res.json(response)

  }, err => {
    console.log("encountered an error somwhere somehow idk lol")
  });
=======
router.post('/:category',(req, res , next) => {

  /*Split the received string into data type declaration and
   the actual base64 string*/
  let base64DataArr = req.body.file.split(',');

  //Extract the mimetype from the data declaration string
  let mimeType = base64DataArr[0].split('data:image/')
                [1].split(';')[0];
  console.log('Uploading ' + mimeType + ' file');

  /*Extract the wanted category from url params, and write the image
    file to that location */
  fs.writeFile("./public/images/" + req.params.category + "/"
                + Date.now() + "." + mimeType
                , base64DataArr[1], 'base64', function(err) {
    console.log(err);
    res.end();
  });

  res.end('File uploaded !');

});
>>>>>>> 3101f3499c54f019b92950d49b4cb5e135851160

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
