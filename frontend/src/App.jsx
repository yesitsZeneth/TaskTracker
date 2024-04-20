import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:8081/tbl_tasklist')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched data:", data); // Log fetched data
        setData(data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch('http://localhost:8081/delete_task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setData(data.filter(item => item.id !== id));
      } else {
        console.error('Failed to delete:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div className="card">
      <h2>Task Trackingggg Management</h2>
      <div>
        <a href="#" style={{ float: 'right' }} className="btn btn-primary">Add Task</a>
      </div>
      <div className="card-body">
        <table>
          <thead>
            <tr>
              <th>Task Title</th>
              <th>Task Description</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.task_course}</td>
                <td>{d.task_name}</td>
                <td>{d.deadline}</td>
                <td>
                  <button onClick={() => handleDelete(d.id)} className="btn btn-outline-danger">DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
