import React, { useEffect, useState } from "react";

function ViewTask() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTaskList();
  }, []);

  const fetchTaskList = async () => {
    try {
      const response = await fetch('http://localhost:8081/tbl_tasklist');
      if (response.ok) {
        const taskList = await response.json();
        setData(taskList);
      } else {
        console.error('Failed to fetch task list:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching task list:', error);
    }
  };

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

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await fetch('http://localhost:8081/update_task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, updatedData }),
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setData(data.map(item => item.id === id ? updatedTask : item));
      } else {
        console.error('Failed to update:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  return (
    <div>
      <h2>View All Tasks</h2>
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
              <td>
                <button onClick={() => handleUpdate(d.id)} className="btn btn-outline-danger">UPDATE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewTask;
