function UpdateTask({ taskId, handleUpdate }) {
    const [updatedTask, setUpdatedTask] = useState({
      task_course: '',
      task_name: '',
      deadline: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdatedTask(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const onUpdate = () => {
      handleUpdate(taskId, updatedTask);
    };
  
    return (
      <div>
        <input
          type="text"
          name="task_course"
          placeholder="Task Course"
          value={updatedTask.task_course}
          onChange={handleChange}
        />
        <input
          type="text"
          name="task_name"
          placeholder="Task Name"
          value={updatedTask.task_name}
          onChange={handleChange}
        />
        <input
          type="date"
          name="deadline"
          value={updatedTask.deadline}
          onChange={handleChange}
        />
        <button onClick={onUpdate} className="btn btn-outline-danger">Update</button>
      </div>
    );
  }
  