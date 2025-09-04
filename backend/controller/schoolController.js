const pool = require('../db');
const path = require('path');
const db = require('../db');

const createSchool = async (req, res) => {
  try {
    // form-data fields
    const { name, address, city, state, contact, email_id } = req.body;

    // uploaded file info (multer)
    let imageFilename = null;
    if (req.file) {
      imageFilename = req.file.filename; // stored filename
    }

    // Basic incoming validation
    if (!name || !email_id) {
      return res.status(400).json({ success: false, message: 'Name and email are required.' });
    }

    // Insert into DB using prepared statements
    const sql = `INSERT INTO schools (name, address, city, state, contact, image, email_id)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [name, address || null, city || null, state || null, contact || null, imageFilename, email_id];

    const [result] = await pool.execute(sql, params);

    return res.status(201).json({ success: true, message: 'School added', id: result.insertId });
  } catch (error) {
    console.error('createSchool error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getSchools = async (req, res) => {
  try {
   const [rows] = await db.execute(
      'SELECT id, name, address, city, state, contact, image, email_id FROM schools'
    );

    // Make image URLs absolute (served statically from /uploads)
    const host = req.get('host');
    const protocol = req.protocol;
    const mapped = rows.map(row => {
      return {
        ...row,
        image_url: row.image ? `${protocol}://${host}/uploads/schoolImages/${row.image}` : null
      };
    });

    return res.json({ success: true, data: mapped });
  } catch (error) {
    console.error('getSchools error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};



module.exports = {
  createSchool,
  getSchools
};
