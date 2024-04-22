import React, { useEffect, useState, Image, ImageBackground  } from "react";
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
  const [modalBodyStyles, setModalBodyStyles] = useState({});

  useEffect(() => {
    fetchData();
    updateModalBodyStyles(); // Update styles initially
    window.addEventListener("resize", updateModalBodyStyles); // Add event listener for window resize
    return () => window.removeEventListener("resize", updateModalBodyStyles); // Cleanup event listener
  }, []);

  const updateModalBodyStyles = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (windowWidth >= 1080 && windowHeight >= 2400) {
      setModalBodyStyles({
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: "#011F4B",
        minHeight: "100vh",
        alignItems: "center",
        padding: "20px", // Adjust styles as needed
        fontSize: "18px" // Adjust styles as needed
      });
    } else {
      setModalBodyStyles({
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: "#011F4B",
        minHeight: "100vh",
        alignItems: "center",
        padding: "10px", // Adjust styles as needed
        fontSize: "16px" // Adjust styles as needed
      });
    }
  };

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
<div className="card" style={{ 
  backgroundColor: '#011F4B', 
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
  borderRadius: '8px', 
  padding: '20px', 
  marginBottom: '20px',
  marginTop: '100px',
  // display: "flex", 
  // justifyContent: "center",
  // alignItems: "center",
  
}}><br/>
<h2 style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5%", color: '#fff', fontSize: '50px', fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase' }}>Task Tracker</h2>
      <div>
      <Button onClick={() => { setShowEditModal(false); setShowAddModal(true); }} style={{ float: 'right' }} className="btn btn-primary">
      Add Task
    </Button>
      </div>
      <div className="card-body" style={{ marginLeft: '20%', display: 'flex-column', justifyContent: 'center', alignItems: 'top', marginTop: '20px' }}>
        <table>
          <thead classname="theadbody" style={{ margin: "auto", color: '#fff', fontSize: '15px', fontWeight: 'bold', textAlign: 'center', padding: '10px' }}>
            <tr className="trlist" style={{ margin: "auto", color: '#fff', fontSize: '15px', fontWeight: 'bold', textAlign: 'center', padding: '10px' }}>
  <th style={{ margin: "auto", color: '#fff', fontSize: '15px', fontWeight: 'bold', textAlign: 'center', padding: '10px' }}>Task Title</th>
  <th style={{ margin: "auto", color: '#fff', fontSize: '15px', fontWeight: 'bold', textAlign: 'center', padding: '10px' }}>Description</th>
  <th style={{ margin: "auto", color: '#fff', fontSize: '15px', fontWeight: 'bold', textAlign: 'center', padding: '10px' }}>Deadline</th>
  <th style={{ margin: "auto", color: '#fff', fontSize: '15px', fontWeight: 'bold', textAlign: 'center', padding: '10px' }}>Action</th>
</tr>

          </thead>
          <tbody style={{ margin: "auto", color: '#fff', fontSize: '15px', textAlign: 'center', padding: '10px' }}>
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
      <Modal.Body style={{
  display: 'flex', 
  flexDirection: 'column', 
  justifyContent: 'flex-start', 
  backgroundColor: "#011F4B", 
  minHeight: "100vh", 
  alignItems: 'center',
}}>
    <form onSubmit={handleSubmit}>
    <div className="form-group" style={{ display: 'flex-column', justifyContent: 'center', alignItems: 'top', marginTop: '20px' }}>
    <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', fontSize: "75px", color: '#fff', marginTop: '100px', marginBottom: '100px' }}>ADD TASK</label><br />
    <label htmlFor="taskName" style={{ display: 'flex-column', justifyContent: 'center',marginTop: '150px', fontSize: "30px", color: "white" }}>TASK TITLE</label><br />
      <input
      type="text"
      className="form-control"
      id="taskName"
      value={taskName}
      onChange={(e) => setTaskName(e.target.value)}
      required
      style={{ width: '100%', height: '50px', marginBottom: '20px', marginTop: '10px', resize: "none", backgroundColor: '#C7D6DE' }}
    />

    
      </div>
      <div className="form-group" style={{ marginTop: '75px',display: 'flex-column', justifyContent: 'center', alignItems: 'top', }}>
      <label htmlFor="taskDescription" style={{ marginTop: '50px', fontSize: "30px", color: "white", textAlign: "center" }}>TASK DESCRIPTION</label><br />
        <textarea
          className="form-control"
          id="taskDescription"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          required
          style={{ width: '100%', height: '75px',marginBottom: '20px', marginTop: '10px', resize: "none", backgroundColor: '#C7D6DE' }}
        ></textarea>
      </div>
      <div className="form-group" style={{ marginTop: '75px',display: 'flex-column', justifyContent: 'center', alignItems: 'top', }}>
        <label htmlFor="deadline"style={{ marginTop: '50px', fontSize: "30px", color: "white" }}>DEADLINE</label><br />
        <input
          type="date"
          className="form-control"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
          style={{ fontSize: "30px",width: '100%', height: '50px', marginBottom: '20px', marginTop: '10px', resize: "none", backgroundColor: '#C7D6DE'  }}
        />
      </div>
      <div style={{ marginTop: '10%', display: 'flex-column', justifyContent: 'center' }}>
      <div>
      <Button type="submit" className="btn btn-outline-danger" style={{ marginTop: '20px', padding: '30px 60px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', fontSize: '25px' }}>
     Create
    </Button></div>
    <div>
    <Button Button type="submit" className="btn btn-outline-danger" style={{ marginTop: '20px', padding: '30px 60px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', fontSize: '25px' }}>
     Cancel
    </Button>
    </div>
    </div>

    </form>
  </Modal.Body>
    <Modal.Footer>
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