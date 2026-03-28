const request = require('supertest');
const app = require('../src/server');
const { resetData } = require('../src/data/seedData');

beforeEach(() => {
  resetData();
});

describe('GET /api/trains', () => {
  it('should return all trains', async () => {
    const res = await request(app).get('/api/trains');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(8);
  });

  it('should filter trains by status', async () => {
    const res = await request(app).get('/api/trains?status=running');
    expect(res.status).toBe(200);
    expect(res.body.data.every(t => t.status === 'running')).toBe(true);
  });
});

describe('GET /api/trains/:id', () => {
  it('should return a specific train', async () => {
    const res = await request(app).get('/api/trains/train-001');
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe('train-001');
    expect(res.body.data.name).toBe('Rajdhani Express');
  });

  it('should return 404 for non-existent train', async () => {
    const res = await request(app).get('/api/trains/nonexistent');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

describe('GET /api/trains/:id/location', () => {
  it('should return train location', async () => {
    const res = await request(app).get('/api/trains/train-001/location');
    expect(res.status).toBe(200);
    expect(res.body.data.currentLocation).toBeDefined();
  });
});

describe('POST /api/trains', () => {
  it('should create a new train', async () => {
    const newTrain = { name: 'Test Express', number: 'TST-999', type: 'express', capacity: 300 };
    const res = await request(app).post('/api/trains').send(newTrain);
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe('Test Express');
    expect(res.body.data.id).toBeDefined();
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app).post('/api/trains').send({ name: 'Incomplete' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe('PUT /api/trains/:id', () => {
  it('should update a train', async () => {
    const res = await request(app).put('/api/trains/train-001').send({ status: 'arrived' });
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('arrived');
  });

  it('should return 404 for non-existent train', async () => {
    const res = await request(app).put('/api/trains/nonexistent').send({ status: 'arrived' });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /api/trains/:id', () => {
  it('should delete a train', async () => {
    const res = await request(app).delete('/api/trains/train-001');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const check = await request(app).get('/api/trains/train-001');
    expect(check.status).toBe(404);
  });

  it('should return 404 for non-existent train', async () => {
    const res = await request(app).delete('/api/trains/nonexistent');
    expect(res.status).toBe(404);
  });
});
