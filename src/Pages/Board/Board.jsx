import React, { useEffect, useState } from 'react';
import Column from './Column';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
function Board({ defaultValue }) {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      content: 'Task1',
      status: 'open',
    },
    {
      id: 2,
      content: 'Task2',
      status: 'pending',
    },
    {
      id: 3,
      content: 'Task3',
      status: 'open',
    },
    {
      id: 4,
      content: 'Task4',
      status: 'close',
    },
    {
      id: 5,
      content: 'Task3',
      status: 'male',
    },
    {
      id: 6,
      content: 'Task4',
      status: 'female',
    },
  ]);
  const handleDropTask = (item, status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === item.id ? { ...task, status } : task,
      ),
    );
  };
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="w-full h-full flex flex-row px-6 pb-6 gap-5">
          <div className="w-1/1 h-full bg-[#fff] rounded-2xl flex flex-col overflow-auto">
            <div className="flex">
              {defaultValue.choicename &&
                defaultValue.choicename.length > 0 &&
                defaultValue.choicename.map((data, i) => (
                  <Column
                    key={i}
                    status={data.status}
                    color={data.color}
                    tasks={tasks}
                    onDropTask={handleDropTask}
                  />
                ))}
            </div>
          </div>
        </div>
      </DndProvider>
    </>
  );
}

export default Board;
