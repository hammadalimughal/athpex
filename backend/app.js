const express = require('express');
const app = express();
require('./db');
const cors = require('cors');
const path = require('path')
const cookieParser = require('cookie-parser');
const { PORT } = require('./config');

// 1. CORS Setup
app.use(cors({
  origin: true, // Allow all origins (safe for local dev; React Native has no fixed origin)
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// 2. Body Parsing (Using built-in Express methods)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'views')));

app.use(cookieParser());


// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  // If this still shows undefined, check the "Important Checklist" below
  console.log('Body:', req.body);
  next();
});

app.use('/api', require('./controller/apiHandler'));


app.use((req, res) => {
  // res.send(`Hello World`)
  res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
})



module.exports = app;

// Only listen if not running on Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
}