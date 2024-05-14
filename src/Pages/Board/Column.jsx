import React from 'react';
import Task from './Task';
    const Column = ({ title, tasks, setTasks,color}) => {
        const onDragStart = (e, id) => {
            e.dataTransfer.setData('id', id);
        };
    
        const onDragOver = (e) => {
            e.preventDefault();
        };
    
        const onDrop = (e, column) => {
            const id = e.dataTransfer.getData('id');
            const task = tasks.find(task => task.id === parseInt(id));
            if (task) {
                const newTasks = tasks.filter(task => task.id !== parseInt(id));
                setTasks([...newTasks, { ...task, status: column }]);
            }
        };
    return (
        <div className="flex flex-col p-4"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, title)}>
       <h2 className={`bg-[${color}] p-2 text-lg font-semibold mb-4 `}>{title}</h2>
       <div className="bg-gray-200 p-4 rounded-md w-80">
           {tasks.filter(task => task.status === title).map(task => (
               <div key={task.id} draggable onDragStart={(e) => onDragStart(e, task.id)}>
                   <Task task={task} />
                   
               </div>
           ))}
       </div>
   </div>
    );
}

export default Column;
