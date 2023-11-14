import React, { useState } from 'react';

const Home = () => {
 const [task, setTask] = useState('');
 const [tasks, setTasks] = useState([]);

 const addTask = () => {
   setTasks([...tasks, task]);
   setTask('');
 }

 const handleKeyDown = (event) => {
  if(event.key === 'Enter'){
    addTask();
  }
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
       {tasks.map((task, index) => <li key={index}>{task}<i class="fa-solid fa-trash" onClick={() => setTasks(tasks.filter((task, currenTask) => index !== currenTask))} ></i></li>)}
      </ul>
    </div>
     <div className='tasksRemaining'>{tasks.length}Tasks Remaining</div>
  </div>
 );
}

export default Home;


