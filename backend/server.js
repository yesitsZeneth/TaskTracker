const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_tasks'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/', (req, res) => {
    return res.json("From Backend Side");
});

app.get('/tbl_tasklist', (req, res) => {
    const sql = "SELECT * FROM tbl_tasklist";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

// Endpoint to handle task deletion
app.post('/delete_task', (req, res) => {
    const id = req.body.id; // Extract id from request body
    const query = "DELETE FROM `tbl_tasklist` WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting task:', err);
            return res.json({ success: false, error: err.message });
        }
        return res.json({ success: true });
    });
});

app.listen(8081, () => {
    console.log("Server listening on port 8081");
});
