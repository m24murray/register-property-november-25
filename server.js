const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const nunjucks = require('nunjucks');
const path = require('path');

const app = express();

// Basic middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Session (demo only - MemoryStore)
const SESSION_SECRET = process.env.SESSION_SECRET || 'devlocalsecret';
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', secure: false }
}));

// Static (optional placeholder)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Nunjucks setup
nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app,
  noCache: true
});
app.set('view engine', 'njk');

// Health endpoint (Iteration 1)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', msg: 'hello world' });
});

// Start route (Iteration 2)
const startRoutes = require('./routes/start');
app.use('/', startRoutes);

// Contact routes (Iteration 3)
const contactRoutes = require('./routes/contact');
app.use('/', contactRoutes);

// Address routes (Iteration 4)
const addressRoutes = require('./routes/address');
app.use('/', addressRoutes);

// Summary route (Iteration 5)
const summaryRoutes = require('./routes/summary');
app.use('/', summaryRoutes);

// Submit routes (Iteration 6)
const submitRoutes = require('./routes/submit');
app.use('/', submitRoutes);

// 404 handler (kept minimal for iteration 1)
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Basic log
  console.error('Unhandled error:', err); // demo logging
  res.status(500).json({ error: 'Internal Server Error' });
});

const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`); // demo startup log
  });
}

module.exports = app;
