const { schedules } = require('../data/seedData');

function getAll() {
  return [...schedules];
}

function getById(id) {
  return schedules.find(s => s.id === id) || null;
}

function create(data) {
  schedules.push(data);
  return data;
}

function update(id, updates) {
  const idx = schedules.findIndex(s => s.id === id);
  if (idx === -1) return null;
  schedules[idx] = { ...schedules[idx], ...updates };
  return schedules[idx];
}

function getToday() {
  const today = new Date().toISOString().split('T')[0];
  return schedules.filter(s => s.date === today);
}

function getByTrainId(trainId) {
  return schedules.filter(s => s.trainId === trainId);
}

module.exports = { getAll, getById, create, update, getToday, getByTrainId };
