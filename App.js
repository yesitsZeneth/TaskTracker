import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity, Modal } from 'react-native';

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
      console.log("Retrieved task data:", taskData); // Log the retrieved data
      if (taskData) {
        setSelectedTaskDetails(taskData[0]); // Select the first item as task details
        setShowTaskModal(true); // Show the modal
        setShowAddModal(false); // Hide other modals
        setShowEditModal(false); // Hide other modals
      } else {
        console.error('No task data retrieved');
        // Optionally, you can show an error message to the user or handle this case differently
      }
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
    setShowTaskModal(false);
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
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 20 }}>Task Track MMMMMManagement</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 20, marginTop: 20 }}>
        <Button title="Add Task" onPress={() => { setShowEditModal(false); setShowTaskModal(false); setShowAddModal(true); }} />
      </View>
      <View style={{ margin: 20 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text>{item.task_course}</Text>
              <Text>{item.task_name}</Text>
              <Text>{item.deadline}</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => handleView(item.id)}>
                  <Text style={{ color: 'red', marginRight: 10 }}>VIEW</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEditModal(item)}>
                  <Text style={{ color: 'red', marginRight: 10 }}>EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Text style={{ color: 'red' }}>DELETE</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <Modal visible={showAddModal} animationType="slide">
        <View style={{ margin: 20 }}>
          <Text>Add Task</Text>
          <TextInput
            placeholder="Task Name"
            value={taskName}
            onChangeText={(text) => setTaskName(text)}
          />
          <TextInput
            placeholder="Course"
            value={taskDescription}
            onChangeText={(text) => setTaskDescription(text)}
          />
          <TextInput
            placeholder="Deadline"
            value={deadline}
            onChangeText={(text) => setDeadline(text)}
          />
          <Button title="Create" onPress={handleSubmit} />
          <Button title="Cancel" onPress={handleCloseAddModal} />
        </View>
      </Modal>
      <Modal visible={showTaskModal} animationType="slide">
        <View style={{ margin: 20 }}>
          <Text>Task Details</Text>
          <Text>Task Name: {selectedTaskDetails.task_name}</Text>
          <Text>Course: {selectedTaskDetails.task_course}</Text>
          <Text>Deadline: {selectedTaskDetails.deadline}</Text>
          <Button title="Close" onPress={() => setShowTaskModal(false)} />
        </View>
      </Modal>
      <Modal visible={showEditModal} animationType="slide">
        <View style={{ margin: 20 }}>
          <Text>Update Task</Text>
          <TextInput
            placeholder="Task Name"
            value={taskName}
            onChangeText={(text) => setTaskName(text)}
          />
          <TextInput
            placeholder="Course"
            value={taskDescription}
            onChangeText={(text) => setTaskDescription(text)}
          />
          <TextInput
            placeholder="Deadline"
            value={deadline}
            onChangeText={(text) => setDeadline(text)}
          />
          <Button title="Update" onPress={handleUpdate} />
          <Button title="Cancel" onPress={handleCloseEditModal} />
        </View>
      </Modal>
    </View>
  );
}

export default App;
