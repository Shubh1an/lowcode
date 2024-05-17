import React, { useState } from 'react';
import KanbanCard from '../../Components/Builder/KanbanCard';
import Footer from '../../Components/inputs/Footer';
import Column from './Column';
function Board(props) {
  const [tasks, setTasks] = useState([
    { id: 1, content: 'Task 1', status: 'Todo' },
    { id: 2, content: 'Task 2', status: 'Todo' },
    { id: 3, content: 'Task 3', status: 'Inprogress' },
    { id: 4, content: 'Task 4', status: 'Done' },
  ]);

  const [column, setcolumn] = useState([]);
  const [columnfeilds, setcolumnfeilds] = useState();
  const kanbanprop = [
    {
      title: 'Title',
      type: 'text',
      id: 'title',
    },
    {
      title: 'Status',
      type: 'text',
      id: 'status',
    },
    {
      title: 'Task',
      type: 'mutliselect',
      id: 'description',
    },
  ];

  const handleFormSubmit = async () => {
    console.log('columnfeilds', columnfeilds);
    setcolumnfeilds(columnfeilds);
  };

  return (
    <>
      <div className="w-full h-full flex flex-row px-6 pb-6 gap-5">
        <div className="w-1/1 h-full bg-[#fff] rounded-2xl flex flex-col overflow-auto">
          <div className="flex">
            {column && (
              <Column
                columnfeilds={columnfeilds}
                setcolumnfeilds={setcolumnfeilds}
                tasks={tasks}
                setTasks={setTasks}
                color={'yellow'}
                onChange={(event) => setcolumnfeilds(event.target.value)}
              />
            )}

            <Column
              columnfeilds="Todo"
              tasks={tasks}
              setTasks={setTasks}
              color={'yellow'}
              setcolumnfeilds={setcolumnfeilds}
              onChange={(event) => setcolumnfeilds(event.target.value)}
            />
            <Column
              columnfeilds="Inprogress"
              tasks={tasks}
              setTasks={setTasks}
              color={'blue'}
              setcolumnfeilds={setcolumnfeilds}
              onChange={(event) => setcolumnfeilds(event.target.value)}
            />
            <Column
              columnfeilds="Done"
              tasks={tasks}
              setTasks={setTasks}
              color={'red'}
              setcolumnfeilds={setcolumnfeilds}
              onChange={(event) => setcolumnfeilds(event.target.value)}
            />
          </div>
          <Footer handleFormSubmit={handleFormSubmit} />
        </div>
        <div className="w-1/3 h-full bg-[#fff] rounded-2xl flex flex-col overflow-auto">
          {kanbanprop.map((field, index) => (
            <KanbanCard
              key={index}
              field={field}
              onChange={(event) =>
                setcolumnfeilds(
                  event.target.value ? event.target.value : columnfeilds,
                )
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Board;
