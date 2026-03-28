const request = require('supertest');
const app = require('../src/server');
const { resetData } = require('../src/data/seedData');

beforeEach(() => {
  resetData();
});

describe('GET /api/bookings', () => {
  it('should return all bookings', async () => {
    const res = await request(app).get('/api/bookings');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(15);
  });
});

describe('GET /api/bookings/:id', () => {
  it('should return a specific booking', async () => {
    const res = await request(app).get('/api/bookings/book-001');
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe('book-001');
  });

  it('should return 404 for non-existent booking', async () => {
    const res = await request(app).get('/api/bookings/nonexistent');
    expect(res.status).toBe(404);
  });
});

describe('GET /api/bookings/user/:userId', () => {
  it('should return bookings for a specific user', async () => {
    const res = await request(app).get('/api/bookings/user/user-001');
    expect(res.status).toBe(200);
    expect(res.body.data.every(b => b.userId === 'user-001')).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});

describe('POST /api/bookings', () => {
  it('should create a new booking', async () => {
    const newBooking = {
      scheduleId: 'sched-001',
      userId: 'user-new',
      passengerName: 'Test Passenger',
      seatNumber: 'Z99',
      class: 'second',
      price: 500
    };
    const res = await request(app).post('/api/bookings').send(newBooking);
    expect(res.status).toBe(201);
    expect(res.body.data.status).toBe('confirmed');
    expect(res.body.data.id).toBeDefined();
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app).post('/api/bookings').send({ scheduleId: 'sched-001' });
    expect(res.status).toBe(400);
  });

  it('should return 404 if schedule does not exist', async () => {
    const res = await request(app).post('/api/bookings').send({
      scheduleId: 'nonexistent',
      userId: 'user-new',
      passengerName: 'Test',
      seatNumber: 'Z1',
      class: 'second',
      price: 100
    });
    expect(res.status).toBe(404);
  });

  it('should return 400 if schedule is cancelled', async () => {
    const res = await request(app).post('/api/bookings').send({
      scheduleId: 'sched-010',
      userId: 'user-new',
      passengerName: 'Test',
      seatNumber: 'Z1',
      class: 'second',
      price: 100
    });
    expect(res.status).toBe(400);
  });
});

describe('PUT /api/bookings/:id/cancel', () => {
  it('should cancel a booking', async () => {
    const res = await request(app).put('/api/bookings/book-001/cancel');
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('cancelled');
  });

  it('should return 400 if booking is already cancelled', async () => {
    const res = await request(app).put('/api/bookings/book-006/cancel');
    expect(res.status).toBe(400);
  });

  it('should return 404 for non-existent booking', async () => {
    const res = await request(app).put('/api/bookings/nonexistent/cancel');
    expect(res.status).toBe(404);
  });
});
