require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const calculateRouter = require('./routes/calculate');
const locationRouter = require('./routes/location');
const statesRouter = require('./routes/states');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet({ crossOriginResourcePolicy: false }));

const allowedOrigins = [
  'http://localhost:3000',
  'https://homecostcal.com',
  'https://www.homecostcal.com',
  /\.vercel\.app$/,
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json({ limit: '10kb' }));

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests. Please wait a moment.' },
});
app.use('/api', apiLimiter);

app.use('/api/calculate', calculateRouter);
app.use('/api/location', locationRouter);
app.use('/api/states', statesRouter);

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'HomeCostCal API', version: '1.0.0' }));

app.use((req, res) => res.status(404).json({ success: false, error: 'Not found' }));

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`HomeCostCal API running on port ${PORT}`);
});

module.exports = app;
