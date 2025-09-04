const express = require('express');
const router = express.Router();
const db = require('../db'); // Correct import
const multer = require('multer');
const path = require('path');
const { createSchool, getSchools } = require("../controller/schoolController.js");
const fs = require('fs');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'schoolImages');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error('Only images are allowed (jpeg, jpg, png, gif).'));
};


// DELETE all schools
// router.delete('/schools', async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT image FROM schools');

//     // Delete all records
//     await db.query('DELETE FROM schools');

//     // Delete images
//     rows.forEach(row => {
//       const imagePath = path.join(__dirname, '..', 'uploads', 'schoolImages', row.image);
//       if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
//     });

//     res.json({ success: true, message: 'All schools deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });



const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// Routes
router.get('/schools', getSchools);          // Use controller
router.post('/schools', upload.single('image'), createSchool);

module.exports = router;  // ONLY router exported
