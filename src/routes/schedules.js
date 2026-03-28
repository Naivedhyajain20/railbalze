const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const scheduleModel = require('../models/scheduleModel');

// IMPORTANT: specific routes before /:id
router.get('/today', (req, res) => {
  const schedules = scheduleModel.getToday();
  res.json({ success: true, data: schedules, count: schedules.length });
});

router.get('/train/:trainId', (req, res) => {
  const schedules = scheduleModel.getByTrainId(req.params.trainId);
  res.json({ success: true, data: schedules, count: schedules.length });
});

router.get('/', (req, res) => {
  const schedules = scheduleModel.getAll();
  res.json({ success: true, data: schedules, count: schedules.length });
});

router.get('/:id', (req, res) => {
  const schedule = scheduleModel.getById(req.params.id);
  if (!schedule) return res.status(404).json({ success: false, message: 'Schedule not found' });
  res.json({ success: true, data: schedule });
});

router.post('/', (req, res) => {
  const { trainId, routeId, departureTime, arrivalTime, date, availableSeats } = req.body;
  if (!trainId || !routeId || !departureTime || !arrivalTime || !date) {
    return res.status(400).json({ success: false, message: 'trainId, routeId, departureTime, arrivalTime, and date are required' });
  }
  const schedule = {
    id: uuidv4(),
    trainId,
    routeId,
    departureTime,
    arrivalTime,
    date,
    status: 'on-time',
    delayMinutes: 0,
    availableSeats: availableSeats || 0
  };
  const created = scheduleModel.create(schedule);
  res.status(201).json({ success: true, data: created });
});

router.put('/:id', (req, res) => {
  const updated = scheduleModel.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, message: 'Schedule not found' });
  res.json({ success: true, data: updated });
});

module.exports = router;
