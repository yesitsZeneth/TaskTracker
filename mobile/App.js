import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';


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
      const response = await fetch('http://192.168.1.24:8081/tbl_tasklist'); // Replace 192.168.1.24 with your actual backend server's IP address
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };  

  const handleDelete = async (id) => {
    try {
      const response = await fetch('http://192.168.1.24:8081/delete_task', { // Replace 192.168.1.24 with your actual backend server's IP address
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
      const response = await fetch(`http://192.168.1.24:8081/tbl_tasklist/${id}`); // Replace 192.168.1.24 with your actual backend server's IP address
      const taskData = await response.json();
      console.log("Retrieved task data:", taskData); // Log the retrieved data
      if (taskData && taskData.length > 0) {
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
      const response = await fetch('http://192.168.1.24:8081/update_task', { // Replace 192.168.1.24 with your actual backend server's IP address
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
      const response = await fetch('http://192.168.1.24:8081/add_task', { // Replace 192.168.1.24 with your actual backend server's IP address
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task_course: taskName, task_name: taskDescription, deadline: new Date(deadline).toISOString() }),
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

  const formatDate = (dateString) => {
    if (!dateString) return ''; // Handle null or undefined values
    const date = new Date(dateString);
    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}-${date.getFullYear()}`;
    return formattedDate;
  };

  const styles = StyleSheet.create({
    columnHeader: {
      flex: 1,
      color: '#FFFFFF',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 12,
    },
  });

  const textStyles = StyleSheet.create({
    text: {
      color: '#FFFFFF', // White font color
      textAlign: 'center', // Horizontal alignment
      alignSelf: 'center', // Vertical alignment
    },
  });  
  
  const buttonStyles = StyleSheet.create({
    button: {
      backgroundColor: '#6497B1',
      paddingVertical: 0,
      paddingHorizontal: 5,
      borderRadius: 5,
      marginRight: 5,
    },
    buttonText: {
      color: '#FFFFFF',
    },
  });
  
  return (
    <View style={{ flex: 1, backgroundColor: '#011F4B'}}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 20, color: '#FFFFFF'}}>Task Track Management</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 20, marginTop: 20 }}>
        <Button title="Add Task" onPress={() => { setShowEditModal(false); setShowTaskModal(false); setShowAddModal(true); }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <Text style={styles.columnHeader}>Task Title</Text>
        <Text style={styles.columnHeader}>Task Description</Text>
        <Text style={styles.columnHeader}>Deadline</Text>
        <Text style={styles.columnHeader}>Action</Text>
      </View>
      <View style={{ margin: 20 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{borderBottomWidth: 1, borderBottomColor: '#FFFFFF', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <Text style={textStyles.text}>{item.task_course}</Text>
              <Text style={textStyles.text}>{item.task_name}</Text>
              <Text style={textStyles.text}>{formatDate(item.deadline)}</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => handleView(item.id)} style={buttonStyles.button}>
                  <Text style={buttonStyles.buttonText}>VIEW</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEditModal(item)} style={buttonStyles.button}>
                  <Text style={buttonStyles.buttonText}>EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={buttonStyles.button}>
                  <Text style={buttonStyles.buttonText}>DELETE</Text>
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
            onChangeText={(date) => setDeadline(date)}
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
          <Text>Deadline: {formatDate(selectedTaskDetails.deadline)}</Text>
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
