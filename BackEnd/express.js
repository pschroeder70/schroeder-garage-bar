require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../FrontEnd/build')));

// MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'bar',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Socket.IO event when a client connects
io.on("connection", (socket) => {
  console.log("A client connected");

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

// Supply routes
app.delete('/api/deleteSupply/:supply_id', (req, res) => {
  const supplyId = req.params.supply_id;
  console.log(`delete | supply ID : ${supplyId}`)
  const sql = 'DELETE FROM supplies WHERE supply_id = ?';

  db.query(sql, [supplyId], (err, result) => {
    if (err) {
      console.error('Error deleting supply from the database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Supply deleted successfully' });
      io.emit("updateSupplies");
    }
  });
});

app.put('/api/modifySupply/:supply_id', (req, res) => {
  const supplyId = req.params.supply_id;
  const { name, type } = req.body;

  const sql = 'UPDATE supplies SET name = ?, type = ? WHERE supply_id = ?';

  db.query(sql, [name, type, supplyId], (err, result) => {
    if (err) {
      console.error('Error modifying supply in the database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Supply modified successfully' });
      io.emit("updateSupplies");
    }
  });
});

app.post('/api/addSupply', (req, res) => {
  const { name, type } = req.body;
  const sql = 'INSERT INTO supplies (name, type) VALUES (?, ?)';
  db.query(sql, [name, type], (err, result) => {
    if (err) {
      console.error('Error adding supply to the database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Supply added successfully' });
      io.emit("updateSupplies");
    }
  });
});

app.get('/api/getSupplies', (req, res) => {
  const sql = 'SELECT * FROM supplies';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching supplies:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(results); // Specify "Content-Type" as "application/json"
    }
  });
});

app.post('/api/checkSupply', (req, res) => {
  const { name } = req.body;
  const checkDuplicateQuery = 'SELECT * FROM supplies WHERE name = ?';
  db.query(checkDuplicateQuery, [name], (err, results) => {
    if (err) {
      console.error('Error checking for duplicate supply:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        res.status(200).json({ exists: true });
      } else {
        res.status(200).json({ exists: false });
      }
    }
  });
});

// Drink routes
app.post('/api/addDrink', (req, res) => {
  const { name, description, instructions, glass_type, image_url, ingredients } = req.body;

  // Since ingredients is an array, we need to convert it to a JSON string
  const ingredientsJSON = JSON.stringify(ingredients);

  // Insert the drink into the 'Drinks' table
  const drinkInsertQuery =
    'INSERT INTO drinks (name, description, instructions, glass_type, image_url, ingredients) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(
    drinkInsertQuery,
    [name, description, instructions, glass_type, image_url, ingredientsJSON],
    (drinkErr, drinkResult) => {
      if (drinkErr) {
        console.error('Error adding the drink to the database:', drinkErr);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json({ message: 'Drink added successfully' });
      }
    }
  );
});

app.get('/api/displayDrinks', (req, res) => {
  const sql = 'SELECT * FROM drinks';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching drink recipes:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
});


// Add a catch-all route to handle React app routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../FrontEnd/build/index.html'));
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
