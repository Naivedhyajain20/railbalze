const { routes } = require('../data/seedData');

function getAll() {
  return [...routes];
}

function getById(id) {
  return routes.find(r => r.id === id) || null;
}

function create(data) {
  routes.push(data);
  return data;
}

function search(from, to) {
  return routes.filter(r =>
    r.source.toLowerCase().includes(from.toLowerCase()) &&
    r.destination.toLowerCase().includes(to.toLowerCase())
  );
}

module.exports = { getAll, getById, create, search };
