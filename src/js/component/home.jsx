import React, { useState, useEffect } from 'react';

const Home = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);


  const handleFetchTasks = async () => {
    try {
      const textResponse = await fetch("https://playground.4geeks.com/todo/users/rebelo7");
      const jsonResponse = await textResponse.json();
      setTasks(jsonResponse.todos); 
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    handleFetchTasks(); 
  }, []);


  async function createTask() {
    const newTask = { label: task, done: false };
    try {
      const response = await fetch("https://playground.4geeks.com/todo/todos/rebelo7", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask), 
      });
      if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
      handleFetchTasks(); 
    } catch (error) {
      console.error('Error creating task:', error);
    }
    setTask(''); 
  }

  const addTask = () => {
    if (task.trim() === '') return; 
    createTask();
  }

  const handleKeyDown = (event) => {
    if(event.key === 'Enter' && task.trim()!== ''){
      addTask();
    }
  }


  async function deleteTask(taskId) {
    try {
      
      const response = await fetch(`https://playground.4geeks.com/todo/todos/rebelo7/${taskId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: taskId }) 
      });
  
      if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
  
      
      handleFetchTasks(); 
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }
  
  const handleDelete = (taskId) => {
  
    const selectTaksDelect = tasks.filter(task => task.id!== taskId);
    deleteTask(selectTaksDelect); 
  };
  

  {tasks.map((task, index) => (
    <li key={index}>
      {task.label}
      <i className="fa-solid fa-trash" onClick={() => handleDelete(task.id)}></i>
    </li>
  ))}
  
  return (
    <div>
      <div className='todo-list'>
        <h3>Be Productive!</h3>
        <input 
          className='taskInput'
          type="text" 
          onChange={e => setTask(e.target.value)} 
          value={task} 
          placeholder="Task for today"
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTask}>Add Task</button>
        <ul>
         {tasks.map((task, index) => (
           <li key={index}>
             {task.label}
             <i className="fa-solid fa-trash" onClick={() => handleDelete(task.id)}></i>
           </li>
         ))}
        </ul>
      </div>
      <div className='tasksRemaining'>{tasks.length} Tasks Remaining</div>
    </div>
  )
}

export default Home;