import React, { useEffect, useState } from 'react';
import Column from './Column';
function Board({ defaultValue }) {
  const [tasks, setTasks] = useState(defaultValue.choicename);
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
              tasks.map((data, i) => (
                <Column key={i} columnfeilds={data.status} color={data.color} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;
