var express = require('express');
var router = express.Router();
const fs = require('fs');
const ls = require('ls');

// POST new category
router.post('/', (req, res, next) => {

    console.log(req.body);

    fs.mkdir('./public/images/' + req.body.category);
    res.end('Category created !');
  });

// GET all categories
router.get('/', (req, res, next) => {

  try {

    //List all created categories and push them to the array
    let listedCategories = ls('./public/images/*');
    let categories = [];
    listedCategories.forEach( listing => {
      categories.push(listing.name);
    });

    //Return JSON with all categories in string[]
    let reply = {
      "categories":  categories
    };

    res.json(reply);

  } catch(err) {
    console.log(err);
    res.end(400);
  }
});

module.exports = router;
