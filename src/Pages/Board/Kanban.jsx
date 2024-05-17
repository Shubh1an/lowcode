import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { BiText } from 'react-icons/bi';
import ViewKanban from './ViewKanban';
import BoardTitle from './BoardTitle';
import BoardInput from './BoardInput';

function Kanban() {
  const [draggedItem, setDraggedItem] = useState([]);
  const AdvancecFields = [
    {
      title: 'Kanban',
      inputType: 'text',
      icon: <BiText />,
    },
  ];
  const handleDrop = (item) => {
    let { field } = item;
    delete field.icon;
    setDraggedItem([field, ...draggedItem]);
  };

  const [, drop] = useDrop({
    accept: 'FIELD',
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [options, setoption] = useState(['status', 'gender']);
  return (
    <div className="w-full h-full flex flex-row px-7 py-5 pb-6 gap-5">
      <div className="w-1/3 h-full bg-[#fff] rounded-2xl flex flex-col p-4">
        <BoardInput
          AdvancecFields={AdvancecFields}
          extraClass="w-full text-[#4D4D4D] hover:text-[#FFFFFF] hover:bg-[#227A60] text-center text-sm border border-[#E9E9E9] rounded-lg py-2"
        />
      </div>
      <div
        className="w-1/2 h-full bg-[#fff] rounded-2xl flex flex-col"
        ref={drop}
      >
        <BoardTitle draggedItem={draggedItem} />
      </div>
      <ViewKanban options={options} setoption={setoption} />
    </div>
  );
}
export default Kanban;
