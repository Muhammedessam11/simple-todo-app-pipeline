const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'todo_db',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
    db.query('CREATE TABLE IF NOT EXISTS tasks (id INT AUTO_INCREMENT PRIMARY KEY, task VARCHAR(255))');
});

// API routes
app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/tasks', (req, res) => {
    const { task } = req.body;
    db.query('INSERT INTO tasks (task) VALUES (?)', [task], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, task });
    });
});

app.listen(4000, () => {
    console.log('Backend running on port 4000');
});

