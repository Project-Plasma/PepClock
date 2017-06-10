'use strict';
const express = require('express');
const router = express.Router();
const EventController = require('../controllers').Events;

router.route('/')
  .post(EventController.create)
  .get(EventController.getAll);

router.route('/users')
  .get(EventController.getEventsByContributor);

// DONT FORGET TO REMOVE THIS!!
router.route('/tester')
  .get(function(req, res) {
    res.send('that is terrible joey!');
  });

router.route('/:id')
  .get(EventController.getById)
  .put(EventController.update);


module.exports = router;
