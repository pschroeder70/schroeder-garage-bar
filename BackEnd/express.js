const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'pschroeder',
  password: '14myEvo$omuch!',
  database: 'bar',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Parse JSON requests
app.use(express.json());

// API endpoint to add a supply
app.post('/api/addSupply', (req, res) => {
  const { name, type } = req.body;

  // Insert the data into the MySQL database
  const sql = 'INSERT INTO supplies (name, type) VALUES (?, ?)';
  db.query(sql, [name, type], (err, result) => {
    if (err) {
      console.error('Error adding supply to the database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Supply added successfully' });
    }
  });
});

app.get('/api/getSupplies', (req, res) => {
  // Retrieve supplies from your database (MySQL) here
  // You should perform a SELECT query on your 'supplies' table

  const sql = 'SELECT * FROM supplies'; // Example SQL query to retrieve all supplies

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching supplies:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
