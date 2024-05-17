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

app.get('/tasklist', (req, res) => {
    const sql = "SELECT tbl_tasklist.*, tbl_users.firstname, tbl_users.lastname FROM tbl_tasklist INNER JOIN tbl_users ON tbl_tasklist.student_id = tbl_users.student_id";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});



app.get('/tbl_tasklist/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT tbl_tasklist.*, tbl_users.firstname, tbl_users.lastname FROM tbl_tasklist INNER JOIN tbl_users ON tbl_tasklist.student_id = tbl_users.student_id WHERE tbl_tasklist.id = ?";
    db.query(sql, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});
    


app.post('/add_task', (req, res) => {
    const { task_course, task_name, deadline } = req.body;
    const query = "INSERT INTO `tbl_tasklist`(`task_course`, `task_name`, `deadline`) VALUES (?, ?, ?)";
    db.query(query, [task_course, task_name, deadline], (err, result) => {
      if (err) {
        console.error('Error adding task:', err);
        return res.json({ success: false, error: err.message });
      }
      return res.json({ success: true });
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

// Endpoint to handle task update
app.post('/update_task', (req, res) => {
    const { id, task_course, task_name, deadline } = req.body;
    const query = "UPDATE `tbl_tasklist` SET `task_course`=?, `task_name`=?, `deadline`=? WHERE `id`=?";
    db.query(query, [task_course, task_name, deadline, id], (err, result) => {
        if (err) {
            console.error('Error updating task:', err);
            return res.json({ success: false, error: err.message });
        }
        return res.json({ success: true }   );
    });
});


app.listen(8081, () => {
    console.log("Server listening on port 8081");
});
