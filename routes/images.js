var express = require('express');
var router = express.Router();
const fs = require('fs');
const ls = require('ls');

/*

################################################
    ROUTINGS
*/
/* POST an image to a category */

router.post('/:category',(req, res , next) => {

  /*Split the received string into data type declaration and
   the actual base64 string*/

  console.log(req.body.type);

  let base64Data = req.body.file;

  //Extract the mimetype from JSON
  let mimeType = req.body.type;

  console.log('Uploading ' + mimeType + ' file');

  /*Extract the wanted category from url params, and write the image
    file to that location */
  fs.writeFile("./public/images/" + req.params.category + "/"
                + Date.now() + "." + mimeType
                , base64Data, 'base64', function(err) {
    if(err) {
      console.log(err);
    }
    res.end();
  });

  res.end('File uploaded !');

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
      images.push(listing.file);
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
