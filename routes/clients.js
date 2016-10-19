const express = require('express');
const router = express.Router();

const Client = require('../models/Client')

router.route('/')
.get((req,res) => {
  Client.findAll()
  .then(clients => {
    res.send(clients)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})
.post((req,res) => {
  Client.create(req.body)
  .then(Client.findAll)
  .then(clients => {
    res.send(clients)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

router.route('/lonely')
.get((req,res) => {
  Client.findLonely()
  .then(clients => {
    res.send(clients)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

router.route('/update/:id')
.put((req,res) => {
  Client.update(req.params.id,req.body)
  .then(Client.findAll)
  .then(clients => {
    res.send(clients)
  })
  .catch(err => {
    console.log("error")
    res.status(400).send(err)
  })
})
.delete((req,res) => {
  Client.del(req.params.id,req.body)
  .then(Client.findLonely)
  .then(clients => {
    res.send(clients)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

router.route('/unadopt/:id')
.put((req,res) => {
  Client.unadopt(req.params.id)
  .then(Client.findAll)
  .then(clients => {
    res.send(clients)
  })
  .catch(err => {
    console.log("error")
    res.status(400).send(err)
  })
})

router.route('/adopt/:id')
.put((req,res) => {
  Client.adopt(req.params.id)
  .then(Client.findAll)
  .then(clients => {
    res.send(clients)
  })
  .catch(err => {
    console.log("error")
    res.status(400).send(err)
  })
})

module.exports = router;
