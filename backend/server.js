const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const mysql = require('mysql2/promise');

app.use(express.json());


let db;

async function initDB() {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT
    });

    console.log('MySQL connected successfully!');
  } catch (err) {
    console.error('MySQL connection failed:', err);
  }
}



// const schoolRoutes = require('./routes/schoolRoutes');
const schoolRoutes = require('./routes/schoolRouter.js')

// CORS
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173"; // 👈 vite port

app.use(cors({
  origin: FRONTEND_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Body parsers (note: multer handles multipart/form-data)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder statically so frontend can display images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api', schoolRoutes);

// Root
app.get('/', (req, res) => {
  res.send('School backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));



// Call it immediately
initDB();

module.exports = db;