const { bookings } = require('../data/seedData');

function getAll() {
  return [...bookings];
}

function getById(id) {
  return bookings.find(b => b.id === id) || null;
}

function create(data) {
  bookings.push(data);
  return data;
}

function cancel(id) {
  const idx = bookings.findIndex(b => b.id === id);
  if (idx === -1) return null;
  bookings[idx] = { ...bookings[idx], status: 'cancelled' };
  return bookings[idx];
}

function getByUserId(userId) {
  return bookings.filter(b => b.userId === userId);
}

module.exports = { getAll, getById, create, cancel, getByUserId };
