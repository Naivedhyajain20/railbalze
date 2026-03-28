const express = require('express');
const router = express.Router();
const trainModel = require('../models/trainModel');
const scheduleModel = require('../models/scheduleModel');
const bookingModel = require('../models/bookingModel');
const routeModel = require('../models/routeModel');

router.get('/delays', (req, res) => {
  const schedules = scheduleModel.getAll();
  const delayed = schedules.filter(s => s.status === 'delayed');
  const totalDelayMins = delayed.reduce((sum, s) => sum + (s.delayMinutes || 0), 0);
  const avgDelay = delayed.length > 0 ? Math.round(totalDelayMins / delayed.length) : 0;
  res.json({
    success: true,
    data: {
      totalDelayed: delayed.length,
      averageDelayMinutes: avgDelay,
      delayedSchedules: delayed
    }
  });
});

router.get('/', (req, res) => {
  const trains = trainModel.getAll();
  const schedules = scheduleModel.getAll();
  const bookings = bookingModel.getAll();
  const routes = routeModel.getAll();
  const todayStr = new Date().toISOString().split('T')[0];

  const stats = {
    totalTrains: trains.length,
    runningTrains: trains.filter(t => t.status === 'running').length,
    delayedTrains: trains.filter(t => t.status === 'delayed').length,
    totalRoutes: routes.length,
    totalSchedules: schedules.length,
    todaySchedules: schedules.filter(s => s.date === todayStr).length,
    delayedSchedules: schedules.filter(s => s.status === 'delayed').length,
    cancelledSchedules: schedules.filter(s => s.status === 'cancelled').length,
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    cancelledBookings: bookings.filter(b => b.status === 'cancelled').length
  };

  res.json({ success: true, data: stats });
});

module.exports = router;
