import React, { useState } from 'react';

const Input = () => {
 const [task, setTask] = useState('');

 const addTask = () => {
   setTask('');
 }

 return (
   <div className='todo-list'>
     <input 
       className='taskInput'
       type="text" 
       value={task} 
       onChange={e => setTask(e.target.value)} 
       placeholder="Task for today!" 
     />
     <button onKeyPrees={addTask}>Add Task</button>
   </div>
 );
}

export  {Input};