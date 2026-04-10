import React from 'react';
import { useState, useEffect } from 'react';
const API_BASE_URL = "http://localhost:5000/api/tasks"; // Ensure this is set in your .env file

// TODO: Import any API functions you need from '../../api/client'
// Example: import { get, post } from '../../api/client';

function QuestionComponent() {
  // TODO: Define state variables needed for your question set
  const[tasks, setTasks] = useState([]);
  const[loading, setLoading] = useState(true);
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);  

  const handleDelete = async(id) => {
    try {
      setTasks((preTasks) => preTasks.filter((task) => task.id !== id));

      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      }); 

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error deleting task:", error);
      fetchTasks();
    }
  };  
  return (
    <div>
      <h1>Task List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title}
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );



  // TODO: Implement data fetching inside a useEffect hook
  

  // TODO: Implement any event handlers required by your question set
  

  return (
    <div>
      {/* TODO: Replace this placeholder with your question set UI */}
      <p>QuestionComponent placeholder — implement your assigned question set here.</p>

      {/* TODO: Render fetched data or form elements as required */}
    </div>
  );
}

export default QuestionComponent;
