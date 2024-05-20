import React from 'react';
import { useDrag } from 'react-dnd';
const ItemTypes = {
  TASK: 'task',
};
function Task({ task }) {
  const [, ref] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task.id, status: task.status },
  });
  return (
    <div className="bg-white p-2 rounded-md mb-2 " ref={ref}>
      {task.content}
    </div>
  );
}

export default Task;
