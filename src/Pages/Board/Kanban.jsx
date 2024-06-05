import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { BiText } from 'react-icons/bi';
import ViewKanban from './ViewKanban';
import BoardTitle from './BoardTitle';
import Board from './Board';
import BoardInput from './BoardInput';
import { v4 as uuidv4 } from 'uuid';
import Footer from '../../Components/inputs/Footer';
function Kanban() {
  const [draggedItem, setDraggedItem] = useState([]);
  const [defaultValue, setDefaultValue] = useState([]);
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
    // @ts-ignore
    setDefaultValue({ kanbanname: field.title });
  };

  const [, drop] = useDrop({
    accept: 'FIELD',
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const [entity, setentity] = useState([
    {
      entityname: 'project',
    },

    {
      entityname: 'leave',
    },
  ]);

  const [options, setoption] = useState([
    {
      columnname: 'status',
      optionset: [
        {
          status: 'open',
          color: 'red',
          id: uuidv4(),
        },
        {
          status: 'pending',
          color: 'yellow',
          id: uuidv4(),
        },
        {
          status: 'inprogress',
          color: '#FB923C',
          id: uuidv4(),
        },
        {
          status: 'close',
          color: '#000',
          id: uuidv4(),
        },
      ],
    },
    {
      columnname: 'gender',
      optionset: [
        {
          status: 'male',
          color: 'blue',
          id: uuidv4(),
        },
        {
          status: 'female',
          color: 'pink',
          id: uuidv4(),
        },
      ],
    },
  ]);

  useEffect(() => {}, [draggedItem]);

  const handleFormSubmit = () => {};

  return (
    <div className="w-full h-full flex flex-row px-7 py-5 pb-6 gap-5">
      <div className="w-1/4 h-full bg-[#fff] rounded-2xl flex flex-col p-4">
        <BoardInput
          AdvancecFields={AdvancecFields}
          extraClass="w-full text-[#4D4D4D] hover:text-[#FFFFFF] hover:bg-[#000] text-center text-sm border border-[#E9E9E9] rounded-lg py-2"
        />
      </div>
      <div
        className="w-1/2 h-full bg-[#fff] rounded-2xl flex flex-col"
        ref={drop}
      >
        {draggedItem.map((data, index) => (
          <BoardTitle title={data.title} key={index} />
        ))}
        <Board defaultValue={defaultValue} />
        <Footer handleFormSubmit={handleFormSubmit} />
      </div>
      <ViewKanban
        options={options}
        entity={entity}
        defaultValue={defaultValue}
        setDefaultValue={setDefaultValue}
        setDraggedItem={setDraggedItem}
      />
    </div>
  );
}
export default Kanban;
