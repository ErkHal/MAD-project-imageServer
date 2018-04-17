var express = require('express');
var router = express.Router();
const fs = require('fs');
const ls = require('ls');

// GET all categories
router.get('/', (req, res, next) => {

  try {

    let listedCategories = ls('./public/images/*');
    let categories = [];

    listedCategories.forEach( listing => {
      categories.push(listing.name);
    });

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
