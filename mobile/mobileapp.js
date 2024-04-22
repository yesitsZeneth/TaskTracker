import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, Modal, TextInput } from "react-native";

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
        fetchData();
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
      setSelectedTaskDetails(taskData);
      setShowTaskModal(true);
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

  const handleSubmit = async () => {
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
    <View style={styles.container}>
      <Text style={styles.title}>Task Tracker</Text>
      <Button title="Add Task" onPress={() => { setShowEditModal(false); setShowAddModal(true); }} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.task_course}</Text>
            <Text>{item.task_name}</Text>
            <Text>{item.deadline}</Text>
            <View style={styles.buttonContainer}>
              <Button title="VIEW" onPress={() => handleView(item.id)} />
              <Button title="EDIT" onPress={() => handleEditModal(item)} />
              <Button title="DELETE" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />

      {/* Add Task Modal */}
      <Modal visible={showAddModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>ADD TASK</Text>
          <TextInput
            style={styles.input}
            value={taskName}
            onChangeText={setTaskName}
            placeholder="Task Title"
          />
          <TextInput
            style={styles.input}
            value={taskDescription}
            onChangeText={setTaskDescription}
            placeholder="Task Description"
          />
          <TextInput
            style={styles.input}
            value={deadline}
            onChangeText={setDeadline}
            placeholder="Deadline"
          />
          <View style={styles.buttonContainer}>
            <Button title="Create" onPress={handleSubmit} />
            <Button title="Cancel" onPress={() => setShowAddModal(false)} />
          </View>
        </View>
      </Modal>

      {/* Task Details Modal */}
      <Modal visible={showTaskModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Task Name: {selectedTaskDetails.task_name}</Text>
          <Text>Task Description: {selectedTaskDetails.task_description}</Text>
          <Text>Deadline: {selectedTaskDetails.deadline}</Text>
          <Button title="Close" onPress={() => setShowTaskModal(false)} />
        </View>
      </Modal>

      {/* Edit Task Modal */}
      <Modal visible={showEditModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Update Task</Text>
          <TextInput
            style={styles.input}
            value={taskName}
            onChangeText={setTaskName}
            placeholder="Task Name"
          />
          <TextInput
            style={styles.input}
            value={taskDescription}
            onChangeText={setTaskDescription}
            placeholder="Task Description"
          />
          <TextInput
            style={styles.input}
            value={deadline}
            onChangeText={setDeadline}
            placeholder="Deadline"
          />
          <View style={styles.buttonContainer}>
            <Button title="Update" onPress={handleUpdate} />
            <Button title="Cancel" onPress={() => setShowEditModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#011F4B',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default App;
