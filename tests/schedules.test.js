const request = require('supertest');
const app = require('../src/server');
const { resetData } = require('../src/data/seedData');

beforeEach(() => {
  resetData();
});

describe('GET /api/schedules', () => {
  it('should return all schedules', async () => {
    const res = await request(app).get('/api/schedules');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(10);
  });
});

describe('GET /api/schedules/today', () => {
  it('should return today\'s schedules', async () => {
    const res = await request(app).get('/api/schedules/today');
    expect(res.status).toBe(200);
    const today = new Date().toISOString().split('T')[0];
    expect(res.body.data.every(s => s.date === today)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});

describe('GET /api/schedules/train/:trainId', () => {
  it('should return schedules for a specific train', async () => {
    const res = await request(app).get('/api/schedules/train/train-001');
    expect(res.status).toBe(200);
    expect(res.body.data.every(s => s.trainId === 'train-001')).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});

describe('GET /api/schedules/:id', () => {
  it('should return a specific schedule', async () => {
    const res = await request(app).get('/api/schedules/sched-001');
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe('sched-001');
  });

  it('should return 404 for non-existent schedule', async () => {
    const res = await request(app).get('/api/schedules/nonexistent');
    expect(res.status).toBe(404);
  });
});

describe('POST /api/schedules', () => {
  it('should create a new schedule', async () => {
    const newSchedule = {
      trainId: 'train-001',
      routeId: 'route-001',
      departureTime: '08:00',
      arrivalTime: '20:00',
      date: new Date().toISOString().split('T')[0],
      availableSeats: 100
    };
    const res = await request(app).post('/api/schedules').send(newSchedule);
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.status).toBe('on-time');
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app).post('/api/schedules').send({ trainId: 'train-001' });
    expect(res.status).toBe(400);
  });
});

describe('PUT /api/schedules/:id', () => {
  it('should update a schedule (e.g. add delay)', async () => {
    const res = await request(app).put('/api/schedules/sched-001').send({ status: 'delayed', delayMinutes: 30 });
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('delayed');
    expect(res.body.data.delayMinutes).toBe(30);
  });

  it('should return 404 for non-existent schedule', async () => {
    const res = await request(app).put('/api/schedules/nonexistent').send({ status: 'delayed' });
    expect(res.status).toBe(404);
  });
});
