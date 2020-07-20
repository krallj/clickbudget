const router = require('express').Router()
const Category = require('../models/categories')
const axios = require('axios')
const { request } = require('express');

router.post('/categories', (req, res, next) => {

  let category = new Category();

  category.name = req.body.name;

  // if (req.body.sites) {
  //   for (let i = 0; i < req.body.sites.length; i++) {
  //     category.sites.push(req.body.sites[i]);
  //   }
  // }

  category.save((err, cat) => {
    if (err) throw err;
    res.send(cat);
  })

})

router.get('/categories', (req, res, next) => {

  Category
  .find()
  .sort({name: 1})
  .exec((err, categories) => {
    res.send(categories)
  })

}) 


// What I need to do here is decide if we have NULL come back
// for maxClick or for site, to basically route the req to the
// to the correct property to update.
router.put('/categories/:category', (req, res, next) => {

  console.log(req.body)
  let site = req.body.site;
  let maxClicks = req.body.maxClicks;

  console.log(site + " <-- this is site");
  console.log(maxClicks + " <-- this is maxClick");

  if (maxClicks) {
    Category
    .findById(req.params.category, (err, category) => {
      if (err) throw err;

      if (maxClicks === "CLEAR")
        category.maxClicks = "";
      else {
        category.maxClicks = maxClicks;
      }

        category.save(err => {
          if (err) throw err;
          else console.log('maxClicks successfully added!');
        });

        res.send(category);
      });    
  }  else if (site) {


    Category
      .update(
      {"sites": site }, 
      {'$pull': {"sites": site } }, 
      {"multi": true},
      function (err, val) {
        console.log(val)
      });

    console.log("we are updating site because site is not null - or is it?")
    Category
      .findById(req.params.category, (err, category) => {
        if (err) throw err;


      if (category.sites.includes(site)) {        
          res.send("Site already exists in category!")
      }
        else {
          category.sites.push(site);
          category.save(err => {
            if (err) throw err;
            else console.log('Site successfully added!');
          });
          res.send(category);
        }
      });
    }

})

module.exports = router