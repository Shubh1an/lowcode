import React, { useState } from 'react';
import Task from './Task';
import { AiFillEdit } from 'react-icons/ai';
import CustomInput from '../../Components/inputs/CustomInput';
const Column = ({
  columnfeilds,
  tasks,
  setTasks,
  color,
  setcolumnfeilds,
  onChange,
}) => {
  const [isEdit, setisEdit] = useState(false);

  const onDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const isEditable = (isEdit) => {
    setisEdit(!isEdit);
    setcolumnfeilds(columnfeilds);
  };

  const onDrop = (e, column) => {
    const id = e.dataTransfer.getData('id');
    const task = tasks.find((task) => task.id === parseInt(id));
    if (task) {
      const newTasks = tasks.filter((task) => task.id !== parseInt(id));
      setTasks([...newTasks, { ...task, status: column }]);
    }
  };
  return (
    <div
      className="flex flex-col p-4"
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, columnfeilds)}
    >
      {isEdit ? (
        <CustomInput
          inputs={{
            title: columnfeilds,
            type: 'text',
            id: 'title',
          }}
          onChange={onChange}
        />
      ) : (
        <h2
          className={`bg-[${color}] p-2 text-lg font-semibold mb-4 flex gap-1  items-center justify-center`}
        >
          {columnfeilds} <AiFillEdit onClick={() => isEditable(isEdit)} />{' '}
        </h2>
      )}

      <div className="bg-gray-200 p-4 rounded-md w-80">
        {tasks
          .filter((task) => task.status === columnfeilds)
          .map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => onDragStart(e, task.id)}
            >
              <Task task={task} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Column;
