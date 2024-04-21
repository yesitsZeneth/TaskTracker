import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

function App() {
  const [data, setData] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTaskDetails, setSelectedTaskDetails] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8081/tbl_tasklist');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const handleView = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/tbl_tasklist/${id}`);
      const taskData = await response.json();
      setSelectedTaskDetails(taskData); // Save the task details in state
      setShowTaskModal(true); // Show the modal
    } catch (error) {
      console.error('Error fetching task data:', error);
    }
  };
  
  

  const handleEditModal = (task) => {
    setSelectedTask(task);
    setTaskName(task.task_course);
    setTaskDescription(task.task_name);
    setDeadline(task.deadline);
    setShowEditModal(true);
    setShowAddModal(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch('http://localhost:8081/update_task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: selectedTask.id, 
          task_course: taskName, 
          task_name: taskDescription, 
          deadline: deadline 
        }),
      });
      if (response.ok) {
        fetchData();
        setShowEditModal(false);
      } else {
        console.error('Failed to update task:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };   

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
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
        setShowAddModal(false);
        setShowEditModal(false);
        fetchData();
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
      <Button onClick={() => { setShowEditModal(false); setShowAddModal(true); }} style={{ float: 'right' }} className="btn btn-primary">
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
            {data.map((task, i) => (
              <tr key={i}>
                <td>{task.task_course}</td>
                <td>{task.task_name}</td>
                <td>{task.deadline}</td>
                <td>
                  <button onClick={() => handleView(task.id)} className="btn btn-outline-danger">VIEW</button>
                  <button onClick={() => handleEditModal(task)} className="btn btn-outline-danger">EDIT</button>
                  <button onClick={() => handleDelete(task.id)} className="btn btn-outline-danger">DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
      <Modal.Title>Add Task</Modal.Title>
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
        Create
      </Button>
    </form>
  </Modal.Body>
    <Modal.Footer>
    <Button variant="primary" onClick={handleCloseAddModal}>
      Cancel
    </Button>
  </Modal.Footer>
      </Modal>

      <Modal show={showTaskModal} onHide={() => setShowTaskModal(false)} centered>
    <Modal.Header closeButton>
        <Modal.Title>Task Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <p>Task Name: {selectedTaskDetails.task_name}</p>
        <p>Task Description: {selectedTaskDetails.task_description}</p>
        <p>Deadline: {selectedTaskDetails.deadline}</p>
        {/* Add more task details as needed */}
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowTaskModal(false)}>Close</Button>
    </Modal.Footer>
</Modal>


      <Modal show={showEditModal} onHide={handleCloseEditModal}>        
  <Modal.Title>Update Task</Modal.Title>
  <Modal.Body>
    <form onSubmit={handleUpdate}>
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
        Update
      </Button>
    </form>
  </Modal.Body>
  <Modal.Footer>
  <Button variant="primary" onClick={handleCloseEditModal}>
    Cancel
  </Button>
</Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;