const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const routeModel = require('../models/routeModel');

// IMPORTANT: /search must be before /:id
router.get('/search', (req, res) => {
  const { from, to } = req.query;
  if (!from || !to) {
    return res.status(400).json({ success: false, message: 'from and to query params are required' });
  }
  const results = routeModel.search(from, to);
  res.json({ success: true, data: results, count: results.length });
});

router.get('/', (req, res) => {
  const routes = routeModel.getAll();
  res.json({ success: true, data: routes, count: routes.length });
});

router.get('/:id', (req, res) => {
  const route = routeModel.getById(req.params.id);
  if (!route) return res.status(404).json({ success: false, message: 'Route not found' });
  res.json({ success: true, data: route });
});

router.post('/', (req, res) => {
  const { name, source, destination, distance, duration, stops } = req.body;
  if (!name || !source || !destination || !distance || !duration) {
    return res.status(400).json({ success: false, message: 'name, source, destination, distance, and duration are required' });
  }
  const route = {
    id: uuidv4(),
    name,
    source,
    destination,
    distance: parseInt(distance),
    duration: parseInt(duration),
    stops: stops || []
  };
  const created = routeModel.create(route);
  res.status(201).json({ success: true, data: created });
});

module.exports = router;
