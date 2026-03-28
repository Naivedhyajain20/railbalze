const { trains } = require('../data/seedData');

function getAll(filter) {
  if (filter && filter.status) {
    return trains.filter(t => t.status === filter.status);
  }
  return [...trains];
}

function getById(id) {
  return trains.find(t => t.id === id) || null;
}

function create(data) {
  trains.push(data);
  return data;
}

function update(id, updates) {
  const idx = trains.findIndex(t => t.id === id);
  if (idx === -1) return null;
  trains[idx] = { ...trains[idx], ...updates };
  return trains[idx];
}

function remove(id) {
  const idx = trains.findIndex(t => t.id === id);
  if (idx === -1) return false;
  trains.splice(idx, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };
