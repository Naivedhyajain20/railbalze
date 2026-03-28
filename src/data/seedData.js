const { v4: uuidv4 } = require('uuid');

const today = new Date();
today.setHours(0,0,0,0);
const todayStr = today.toISOString().split('T')[0];
const tomorrowStr = new Date(today.getTime() + 86400000).toISOString().split('T')[0];

function createSeedTrains() {
  return [
    { id: 'train-001', name: 'Rajdhani Express', number: 'RJD-001', type: 'express', capacity: 500, status: 'running', currentLocation: 'Mumbai Central' },
    { id: 'train-002', name: 'Shatabdi Express', number: 'SHT-002', type: 'express', capacity: 400, status: 'scheduled', currentLocation: 'New Delhi' },
    { id: 'train-003', name: 'Duronto Express', number: 'DUR-003', type: 'express', capacity: 450, status: 'delayed', currentLocation: 'Pune Junction' },
    { id: 'train-004', name: 'Jan Shatabdi', number: 'JNS-004', type: 'local', capacity: 300, status: 'running', currentLocation: 'Chennai Central' },
    { id: 'train-005', name: 'Garib Rath', number: 'GRB-005', type: 'local', capacity: 600, status: 'scheduled', currentLocation: 'Kolkata Howrah' },
    { id: 'train-006', name: 'Freight Express 1', number: 'FRT-006', type: 'freight', capacity: 1000, status: 'running', currentLocation: 'Delhi Goods Yard' },
    { id: 'train-007', name: 'Intercity Express', number: 'ITC-007', type: 'express', capacity: 350, status: 'arrived', currentLocation: 'Bangalore City' },
    { id: 'train-008', name: 'Passenger Local', number: 'PSL-008', type: 'local', capacity: 250, status: 'scheduled', currentLocation: 'Hyderabad Deccan' }
  ];
}

function createSeedRoutes() {
  return [
    {
      id: 'route-001', name: 'Mumbai-Delhi Express Route', source: 'Mumbai Central', destination: 'New Delhi',
      distance: 1384, duration: 960,
      stops: [
        { name: 'Mumbai Central', arrivalOffset: 0 },
        { name: 'Surat', arrivalOffset: 120 },
        { name: 'Vadodara', arrivalOffset: 180 },
        { name: 'Ahmedabad', arrivalOffset: 240 },
        { name: 'Jaipur', arrivalOffset: 600 },
        { name: 'New Delhi', arrivalOffset: 960 }
      ]
    },
    {
      id: 'route-002', name: 'Chennai-Bangalore Route', source: 'Chennai Central', destination: 'Bangalore City',
      distance: 350, duration: 300,
      stops: [
        { name: 'Chennai Central', arrivalOffset: 0 },
        { name: 'Katpadi', arrivalOffset: 90 },
        { name: 'Bangalore City', arrivalOffset: 300 }
      ]
    },
    {
      id: 'route-003', name: 'Delhi-Kolkata Route', source: 'New Delhi', destination: 'Kolkata Howrah',
      distance: 1450, duration: 1020,
      stops: [
        { name: 'New Delhi', arrivalOffset: 0 },
        { name: 'Kanpur Central', arrivalOffset: 240 },
        { name: 'Allahabad', arrivalOffset: 360 },
        { name: 'Varanasi', arrivalOffset: 480 },
        { name: 'Gaya', arrivalOffset: 600 },
        { name: 'Kolkata Howrah', arrivalOffset: 1020 }
      ]
    },
    {
      id: 'route-004', name: 'Mumbai-Pune Route', source: 'Mumbai Central', destination: 'Pune Junction',
      distance: 192, duration: 180,
      stops: [
        { name: 'Mumbai Central', arrivalOffset: 0 },
        { name: 'Thane', arrivalOffset: 30 },
        { name: 'Kalyan', arrivalOffset: 60 },
        { name: 'Lonavala', arrivalOffset: 120 },
        { name: 'Pune Junction', arrivalOffset: 180 }
      ]
    },
    {
      id: 'route-005', name: 'Hyderabad-Chennai Route', source: 'Hyderabad Deccan', destination: 'Chennai Central',
      distance: 625, duration: 480,
      stops: [
        { name: 'Hyderabad Deccan', arrivalOffset: 0 },
        { name: 'Nalgonda', arrivalOffset: 90 },
        { name: 'Vijayawada', arrivalOffset: 180 },
        { name: 'Nellore', arrivalOffset: 330 },
        { name: 'Chennai Central', arrivalOffset: 480 }
      ]
    }
  ];
}

function createSeedSchedules() {
  return [
    { id: 'sched-001', trainId: 'train-001', routeId: 'route-001', departureTime: '06:00', arrivalTime: '22:00', date: todayStr, status: 'on-time', delayMinutes: 0, availableSeats: 120 },
    { id: 'sched-002', trainId: 'train-002', routeId: 'route-002', departureTime: '07:30', arrivalTime: '12:30', date: todayStr, status: 'on-time', delayMinutes: 0, availableSeats: 85 },
    { id: 'sched-003', trainId: 'train-003', routeId: 'route-004', departureTime: '08:00', arrivalTime: '11:00', date: todayStr, status: 'delayed', delayMinutes: 45, availableSeats: 60 },
    { id: 'sched-004', trainId: 'train-004', routeId: 'route-005', departureTime: '09:15', arrivalTime: '17:15', date: todayStr, status: 'on-time', delayMinutes: 0, availableSeats: 200 },
    { id: 'sched-005', trainId: 'train-005', routeId: 'route-003', departureTime: '10:00', arrivalTime: '27:00', date: todayStr, status: 'on-time', delayMinutes: 0, availableSeats: 350 },
    { id: 'sched-006', trainId: 'train-007', routeId: 'route-002', departureTime: '14:00', arrivalTime: '19:00', date: todayStr, status: 'on-time', delayMinutes: 0, availableSeats: 175 },
    { id: 'sched-007', trainId: 'train-008', routeId: 'route-004', departureTime: '16:30', arrivalTime: '19:30', date: todayStr, status: 'on-time', delayMinutes: 0, availableSeats: 140 },
    { id: 'sched-008', trainId: 'train-001', routeId: 'route-003', departureTime: '18:00', arrivalTime: '35:00', date: todayStr, status: 'delayed', delayMinutes: 20, availableSeats: 95 },
    { id: 'sched-009', trainId: 'train-002', routeId: 'route-001', departureTime: '20:00', arrivalTime: '36:00', date: todayStr, status: 'on-time', delayMinutes: 0, availableSeats: 210 },
    { id: 'sched-010', trainId: 'train-003', routeId: 'route-005', departureTime: '22:30', arrivalTime: '06:30', date: todayStr, status: 'cancelled', delayMinutes: 0, availableSeats: 0 },
    { id: 'sched-011', trainId: 'train-004', routeId: 'route-001', departureTime: '06:00', arrivalTime: '22:00', date: tomorrowStr, status: 'on-time', delayMinutes: 0, availableSeats: 300 },
    { id: 'sched-012', trainId: 'train-005', routeId: 'route-002', departureTime: '08:00', arrivalTime: '13:00', date: tomorrowStr, status: 'on-time', delayMinutes: 0, availableSeats: 400 },
    { id: 'sched-013', trainId: 'train-006', routeId: 'route-003', departureTime: '10:00', arrivalTime: '27:00', date: tomorrowStr, status: 'on-time', delayMinutes: 0, availableSeats: 800 },
    { id: 'sched-014', trainId: 'train-007', routeId: 'route-004', departureTime: '12:00', arrivalTime: '15:00', date: tomorrowStr, status: 'on-time', delayMinutes: 0, availableSeats: 250 },
    { id: 'sched-015', trainId: 'train-008', routeId: 'route-005', departureTime: '15:00', arrivalTime: '23:00', date: tomorrowStr, status: 'on-time', delayMinutes: 0, availableSeats: 180 }
  ];
}

function createSeedBookings() {
  return [
    { id: 'book-001', scheduleId: 'sched-001', userId: 'user-001', passengerName: 'Rahul Sharma', seatNumber: 'A1', class: 'first', price: 2500, status: 'confirmed', bookedAt: new Date().toISOString() },
    { id: 'book-002', scheduleId: 'sched-001', userId: 'user-002', passengerName: 'Priya Singh', seatNumber: 'A2', class: 'first', price: 2500, status: 'confirmed', bookedAt: new Date().toISOString() },
    { id: 'book-003', scheduleId: 'sched-002', userId: 'user-003', passengerName: 'Amit Kumar', seatNumber: 'B5', class: 'second', price: 850, status: 'confirmed', bookedAt: new Date().toISOString() },
    { id: 'book-004', scheduleId: 'sched-002', userId: 'user-001', passengerName: 'Rahul Sharma', seatNumber: 'B6', class: 'second', price: 850, status: 'confirmed', bookedAt: new Date().toISOString() },
    { id: 'book-005', scheduleId: 'sched-003', userId: 'user-004', passengerName: 'Sunita Patel', seatNumber: 'C10', class: 'sleeper', price: 600, status: 'confirmed', bookedAt: new Date().toISOString() },
    { id: 'book-006', scheduleId: 'sched-003', userId: 'user-005', passengerName: 'Vikram Nair', seatNumber: 'C11', class: 'sleeper', price: 600, status: 'cancelled', bookedAt: new Date().toISOString() },
    { id: 'book-007', scheduleId: 'sched-004', userId: 'user-002', passengerName: 'Priya Singh', seatNumber: 'D3', class: 'second', price: 1200, status: 'confirmed', bookedAt: new Date().toISOString() },
    { id: 'book-008', scheduleId: 'sched-005', userId: 'user-006', passengerName: 'Deepak Joshi', seatNumber: 'E7', class: 'sleeper', price: 750, status: 'confirmed', bookedAt: new Date().toISOString() },
    { id: 'book-009', scheduleId: 'sched-005', userId: 'user-007', passengerName: 'Anita Desai', seatNumber: 'E8', class: 'sleeper', price: 750, status: 'confirmed', bookedAt: new Date().toISOString() },
    { id: 'book-010', scheduleId: 'sched-006', userId: 'user-003', passengerName: 'Amit Kumar', seatNumber: 'F2', class: 'first', price: 1800, status: 'confirmed', bookedAt: new Date().toISOString() },
    { id: 'book-011', scheduleId: 'sched-007', userId: 'user-008', passengerName: 'Meera Krishnan', seatNumber: 'G4', class: 'second', price: 450, status: 'confirmed', bookedAt: new Date().toISOString() },
    { id: 'book-012', scheduleId: 'sched-008', userId: 'user-001', passengerName: 'Rahul Sharma', seatNumber: 'H9', class: 'sleeper', price: 980, status: 'confirmed', bookedAt: new Date().toISOString() },
    { id: 'book-013', scheduleId: 'sched-009', userId: 'user-004', passengerName: 'Sunita Patel', seatNumber: 'I1', class: 'first', price: 3200, status: 'cancelled', bookedAt: new Date().toISOString() },
    { id: 'book-014', scheduleId: 'sched-011', userId: 'user-005', passengerName: 'Vikram Nair', seatNumber: 'J3', class: 'second', price: 900, status: 'confirmed', bookedAt: new Date().toISOString() },
    { id: 'book-015', scheduleId: 'sched-012', userId: 'user-006', passengerName: 'Deepak Joshi', seatNumber: 'K6', class: 'sleeper', price: 650, status: 'confirmed', bookedAt: new Date().toISOString() }
  ];
}

const trains = createSeedTrains();
const routes = createSeedRoutes();
const schedules = createSeedSchedules();
const bookings = createSeedBookings();

function resetData() {
  trains.splice(0, trains.length, ...createSeedTrains());
  routes.splice(0, routes.length, ...createSeedRoutes());
  schedules.splice(0, schedules.length, ...createSeedSchedules());
  bookings.splice(0, bookings.length, ...createSeedBookings());
}

module.exports = { trains, routes, schedules, bookings, resetData };
