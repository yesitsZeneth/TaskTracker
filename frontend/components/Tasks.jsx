import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([])
  useEffect(()=> {
    fetch('http://localhost:8081/tbl_tasklist')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err))
  }, [])
  return (
    <div class="card">
      <h2 class="card-title">Task Tracking Management</h2>
      <a href="./components/Create.jsx" style={{ float: 'right' }} className="btn btn-primary">Add Task</a>
      <div class="card-body">
        <table>
            <thead>
              <th>Task Title</th>
              <th>Task Description</th>
              <th>Deadline</th>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i}>
                  <td>{d.task_course}</td>
                  <td>{d.task_name}</td>
                  <td>{d.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default App