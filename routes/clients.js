const express = require('express');
const router = express.Router();

const Client = require('../models/Client')

router.route('/')
   .get((req,res) => {
     Client.findAll()
     .then(Clients => {
       res.send(Clients)
     })
     .catch(err => {
       res.status(400).send(err)
     })
   })
   .post((req,res) => {
     Client.create(req.body)
     .then(Client.findAll)
     .then(Clients => {
       res.send(Clients)
     })
     .catch(err => {
       res.status(400).send(err)
     })
   })

   router.route('/lonely')
      .get((req,res) => {
        Client.findLonely()
        .then(Clients => {
          res.send(Clients)
        })
        .catch(err => {
          res.status(400).send(err)
        })
      })

module.exports = router;
