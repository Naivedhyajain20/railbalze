const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bookingModel = require('../models/bookingModel');
const scheduleModel = require('../models/scheduleModel');

// IMPORTANT: specific routes before /:id
router.get('/user/:userId', (req, res) => {
  const bookings = bookingModel.getByUserId(req.params.userId);
  res.json({ success: true, data: bookings, count: bookings.length });
});

router.get('/', (req, res) => {
  const bookings = bookingModel.getAll();
  res.json({ success: true, data: bookings, count: bookings.length });
});

router.get('/:id', (req, res) => {
  const booking = bookingModel.getById(req.params.id);
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
  res.json({ success: true, data: booking });
});

router.post('/', (req, res) => {
  const { scheduleId, userId, passengerName, seatNumber, class: seatClass, price } = req.body;
  if (!scheduleId || !userId || !passengerName || !seatNumber || !seatClass || price === undefined) {
    return res.status(400).json({ success: false, message: 'scheduleId, userId, passengerName, seatNumber, class, and price are required' });
  }
  const schedule = scheduleModel.getById(scheduleId);
  if (!schedule) return res.status(404).json({ success: false, message: 'Schedule not found' });
  if (schedule.status === 'cancelled') return res.status(400).json({ success: false, message: 'Cannot book a cancelled schedule' });
  if (schedule.availableSeats <= 0) return res.status(400).json({ success: false, message: 'No seats available' });

  const booking = {
    id: uuidv4(),
    scheduleId,
    userId,
    passengerName,
    seatNumber,
    class: seatClass,
    price: parseFloat(price),
    status: 'confirmed',
    bookedAt: new Date().toISOString()
  };
  scheduleModel.update(scheduleId, { availableSeats: schedule.availableSeats - 1 });
  const created = bookingModel.create(booking);
  res.status(201).json({ success: true, data: created });
});

router.put('/:id/cancel', (req, res) => {
  const booking = bookingModel.getById(req.params.id);
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
  if (booking.status === 'cancelled') return res.status(400).json({ success: false, message: 'Booking is already cancelled' });

  const cancelled = bookingModel.cancel(req.params.id);
  const schedule = scheduleModel.getById(booking.scheduleId);
  if (schedule) scheduleModel.update(booking.scheduleId, { availableSeats: schedule.availableSeats + 1 });
  res.json({ success: true, data: cancelled });
});

module.exports = router;
