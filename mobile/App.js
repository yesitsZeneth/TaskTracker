  import React, { useEffect, useState } from 'react';
  import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';

  function App() {
    const [data, setData] = useState([]);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [selectedTaskDetails, setSelectedTaskDetails] = useState({});

    useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
      try {
          const response = await fetch('http://192.168.137.1:8081/tasklist');
          const jsonData = await response.json();
          setData(jsonData);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };


  const handleView = async (id) => {
    try {
        const response = await fetch(`http://192.168.137.1:8081/tbl_tasklist/${id}`);
        const taskData = await response.json();
        console.log("Retrieved task data:", taskData);
        if (taskData && taskData.length > 0) {
            setSelectedTaskDetails(taskData[0]);
            setShowTaskModal(true);
        } else {
            console.error('No task data retrieved');
        }
    } catch (error) {
        console.error('Error fetching task data:', error);
    }
};


    const formatDate = (dateString) => {
      if (!dateString) return '';
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
      button: {
        backgroundColor: '#6497B1',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
      },
    });

    return (
      <View style={{ flex: 1, backgroundColor: '#011F4B' }}>
        <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 20, color: '#FFFFFF' }}>Task Track Management</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={styles.columnHeader}>Task Title</Text>
          <Text style={styles.columnHeader}>Task Descriptions</Text>
          <Text style={styles.columnHeader}>Deadline</Text>
          <Text style={styles.columnHeader}>Action</Text>
        </View>
        <View style={{ margin: 20 }}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#FFFFFF', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <Text style={{ color: '#FFFFFF', ...styles.text, flex: 1 }}>{item.task_course}</Text>
                <Text style={{ color: '#FFFFFF', ...styles.text, flex: 1 }}>{item.task_name}</Text>
                <Text style={{ color: '#FFFFFF', ...styles.text, flex: 1 }}>{formatDate(item.deadline)}</Text>
                <TouchableOpacity onPress={() => handleView(item.id)} style={styles.button}>
                  <Text style={styles.buttonText}>VIEW</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
<Modal visible={showTaskModal} animationType="slide">
    <View style={{ margin: 20 }}>
        <Text>Task Details</Text>
        <Text>Task Name: {selectedTaskDetails.task_name}</Text>
        <Text>Course: {selectedTaskDetails.task_course}</Text>
        <Text>Deadline: {formatDate(selectedTaskDetails.deadline)}</Text>
        <Text>Added By: {selectedTaskDetails.firstname} {selectedTaskDetails.lastname}</Text>
        <TouchableOpacity onPress={() => setShowTaskModal(false)} style={styles.button}>
            <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
    </View>
</Modal>

      </View>
    );
  }

  export default App;
