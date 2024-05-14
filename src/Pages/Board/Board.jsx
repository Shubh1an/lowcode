import React, { useState } from 'react';
import Column from './Column';


function Board(props) {
    const [tasks, setTasks] = useState([
        { id: 1, content: 'Task 1', status: 'Todo'},
        { id: 2, content: 'Task 2', status: 'Todo'},
        { id: 3, content: 'Task 3', status: 'Inprogress'},
        { id: 4, content: 'Task 4', status: 'Done'}
    ]);
    return (
        <div className="container mx-auto">
            <div className="flex">
            <Column title="Todo" tasks={tasks} setTasks={setTasks}  color={'yellow'}/>
            <Column title="Inprogress" tasks={tasks} setTasks={setTasks} color={'blue'}/>
            <Column title="Done" tasks={tasks} setTasks={setTasks} color={'red'}/>
                
            </div>
        </div>

        
    );
}

export default Board;