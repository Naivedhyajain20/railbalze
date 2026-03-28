const express = require('express');
const cors = require('cors');
const path = require('path');

const trainRoutes = require('./routes/trains');
const routeRoutes = require('./routes/routes');
const scheduleRoutes = require('./routes/schedules');
const bookingRoutes = require('./routes/bookings');
const insightRoutes = require('./routes/insights');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/trains', trainRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/insights', insightRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`RailBlaze server running on port ${PORT}`);
  });
}

module.exports = app;
