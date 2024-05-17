import React, { useEffect, useState } from 'react';
import Column from './Column';
function Board({ defaultValue }) {
  const [tasks, setTasks] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [column, setcolumn] = useState([]);
  const [columnfeilds, setcolumnfeilds] = useState();

  useEffect(() => {
    setTasks(defaultValue.choicename);
    setToggle(!toggle);
  }, [tasks]);

  console.log('tasks', tasks);
  return (
    <>
      <div className="w-full h-full flex flex-row px-6 pb-6 gap-5">
        <div className="w-1/1 h-full bg-[#fff] rounded-2xl flex flex-col overflow-auto">
          <div className="flex">
            {tasks &&
              tasks.length > 0 &&
              tasks.map((data, index) => (
                <Column
                  key={index}
                  columnfeilds={data.status}
                  color={data.color}
                />
              ))}

            {/* <Column
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
            /> */}
          </div>
        </div>
        {/* <div className="w-1/3 h-full bg-[#fff] rounded-2xl flex flex-col overflow-auto">
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
        </div> */}
      </div>
    </>
  );
}

export default Board;
