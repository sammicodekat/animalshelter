const express = require('express');
const router = express.Router();

const Animal = require('../models/Animal')

router.route('/')
.get((req,res) => {
  Animal.findAll()
  .then(animals => {
    res.send(animals)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})
.post((req,res) => {
  Animal.create(req.body)
  .then(Animal.findAll)
  .then(animals => {
    res.send(animals)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})


router.route('/lonely')
.get((req,res) => {
  Animal.findLonely()
  .then(animals => {
    res.send(animals)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

router.route('/update/:id')
.put((req,res) => {
  Animal.update(req.params.id,req.body)
  .then(Animal.findAll)
  .then(animals => {
    res.send(animals)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})
.delete((req,res) => {
  Animal.del(req.params.id)
  .then(Animal.findLonely)
  .then(animals => {
    res.send(animals)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

router.route('/unadopt/:id')
.put((req,res) => {
  Animal.unadopt(req.params.id)
  .then(Animal.findAll)
  .then(animals => {
    console.log("animals",animals)
    res.send(animals)
  })
  .catch(err => {
    console.log("error")
    res.status(400).send(err)
  })
})

router.route('/adopt/:id/:owner')
.put((req,res) => {
  Animal.adopt(req.params.id,req.params.owner)
  .then(Animal.findAll)
  .then(animals => {
    res.send(animals)
  })
  .catch(err => {
    console.log("error")
    res.status(400).send(err)
  })
})



module.exports = router;
