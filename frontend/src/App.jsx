import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

function App() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    fetch('http://localhost:8081/tbl_tasklist')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched data:", data);
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/add_task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task_course: taskName, task_name: taskDescription, deadline }),
      });
      if (response.ok) {
        setShowModal(false);
        // Refresh data after adding a task
        const newData = await fetch('http://localhost:8081/tbl_tasklist').then(res => res.json());
        setData(newData);
      } else {
        console.error('Failed to add task:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="card">
      <h2>Task Track ejManagement</h2>
      <div>
        <Button onClick={() => setShowModal(true)} style={{ float: 'right' }} className="btn btn-primary">
          Add Task
        </Button>
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
      <Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Add Task</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="taskName">Task Name:</label>
        <input
          type="text"
          className="form-control"
          id="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="taskDescription">Task Description:</label>
        <textarea
          className="form-control"
          id="taskDescription"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="date"
          className="form-control"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="btn btn-outline-danger">
        Submit
      </Button>
    </form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="primary" onClick={handleCloseModal}>
      Cancel
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
}

export default App;
