import React, { useState } from 'react';
import Task from './Task';
import { useDrop } from 'react-dnd';
const ItemTypes = {
  TASK: 'task',
};
const Column = ({ status, tasks, onDropTask, color }) => {
  const [, ref] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => onDropTask(item, status),
  });

  return (
    <div className="flex flex-col p-4">
      <h2
        className={`bg-[${color}] p-2 text-lg font-semibold mb-4 flex gap-1  items-center justify-center`}
      >
        {status}
      </h2>
      <div className="bg-gray-200 p-4 rounded-md w-80" ref={ref}>
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <div key={task.id}>
              <Task task={task} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Column;
