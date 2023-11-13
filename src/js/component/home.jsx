import React, { useState } from 'react';

const Home = () => {
 const [task, setTask] = useState('');
 const [tasks, setTasks] = useState([]);

 const addTask = () => {
   setTasks([...tasks, task]);
   setTask('');
 }

 return (
	<div className='todo-list'>
		<h3>Be Productive !</h3>
     <input 
	  className='taskInput'
       type="text" 
       value={task} 
       onChange={e => setTask(e.target.value)} 
       placeholder="Task for today" 
     />
     <button onClick={addTask}>Add Task</button>
     <ul>
       {tasks.map((task, index) => <li key={index}>{task}<i class="fa-solid fa-trash"></i></li>)}
     </ul>
   </div>
 );
}

export default Home;


