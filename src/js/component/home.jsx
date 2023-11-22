import React, { useState, useEffect } from 'react';

const Home = () => {
 const [task, setTask] = useState('');
 const [tasks, setTasks] = useState([]);
 const DOMAIN = "https://playground.4geeks.com/apis/fake/todos/user/Rebelo7";

 const handleFetchTasks = async () => {
  try {
    const textResponse = await fetch(DOMAIN);
    const jsonResponse = await textResponse.json();
    setTasks(jsonResponse);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
 }



 useEffect(() => {
 handleFetchTasks(); 
}, []);

 async function updateTask(updatedList) {
 
    await fetch(DOMAIN, {
     method: 'PUT',
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify(updatedList), 
   });
     handleFetchTasks(); 
 }
    

 const addTask = () => {
  const newTask = { label: task, done: false };
  const updatedList = [...tasks, newTask ]; 
  setTasks(updatedList);
  setTask('');
  updateTask(updatedList)
 }

 const handleKeyDown = (event) => {
 if(event.key === 'Enter'){
   addTask();
 }
 }

 const handleDelete = (index) => {
  const updatedList = tasks.filter((task, currenTask) => index !== currenTask);
  setTasks(updatedList);
  updateTask(updatedList);
  
 }
 

 return (
 <div>
	 <div className='todo-list'>
		 <h3>Be Productive !</h3>
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
      {tasks.map((task, index) => <li key={index}>{task.label}<i class="fa-solid fa-trash" onClick={() => handleDelete(index)} ></i></li>)}
     </ul>
   </div>
    <div className='tasksRemaining'>{tasks.length} Tasks Remaining</div>
 </div>
 );
}

export default Home;