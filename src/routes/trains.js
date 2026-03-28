const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const trainModel = require('../models/trainModel');

router.get('/', (req, res) => {
  const { status } = req.query;
  const trains = trainModel.getAll(status ? { status } : null);
  res.json({ success: true, data: trains, count: trains.length });
});

router.get('/:id/location', (req, res) => {
  const train = trainModel.getById(req.params.id);
  if (!train) return res.status(404).json({ success: false, message: 'Train not found' });
  res.json({ success: true, data: { trainId: train.id, name: train.name, currentLocation: train.currentLocation, status: train.status } });
});

router.get('/:id', (req, res) => {
  const train = trainModel.getById(req.params.id);
  if (!train) return res.status(404).json({ success: false, message: 'Train not found' });
  res.json({ success: true, data: train });
});

router.post('/', (req, res) => {
  const { name, number, type, capacity, status, currentLocation } = req.body;
  if (!name || !number || !type || !capacity) {
    return res.status(400).json({ success: false, message: 'name, number, type, and capacity are required' });
  }
  const train = {
    id: uuidv4(),
    name,
    number,
    type,
    capacity: parseInt(capacity),
    status: status || 'scheduled',
    currentLocation: currentLocation || 'Depot'
  };
  const created = trainModel.create(train);
  res.status(201).json({ success: true, data: created });
});

router.put('/:id', (req, res) => {
  const updated = trainModel.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, message: 'Train not found' });
  res.json({ success: true, data: updated });
});

router.delete('/:id', (req, res) => {
  const deleted = trainModel.remove(req.params.id);
  if (!deleted) return res.status(404).json({ success: false, message: 'Train not found' });
  res.json({ success: true, message: 'Train deleted' });
});

module.exports = router;
