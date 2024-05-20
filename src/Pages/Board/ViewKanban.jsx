import React, { useEffect, useState, useLayoutEffect } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { IoMdAddCircle } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';
function ViewKanban({
  options,
  entity,
  defaultValue,
  setDefaultValue,
  setDraggedItem,
  draggedItem,
}) {
  const [coulmnindex, setcoulmnindex] = useState(null);
  const [newColumn, setnewColumn] = useState([]);
  const [isEdit, issetEdit] = useState(true);

  useEffect(() => {
    setDefaultValue({
      kanbanname: defaultValue.kanbanname,
      choicename: newColumn,
    });
  }, [coulmnindex, newColumn]);

  const setColumn = (event) => {
    const column = options.filter((elm) => elm.columnname === event);
    setnewColumn(column[0]?.optionset);
  };
  const setEditChoice = (index) => {
    setcoulmnindex(index);
    issetEdit(!isEdit);
  };

  const updateColumnname = (value, key) => {
    console.log('first', value, key);
    console.log('--------', newColumn);
    const column = newColumn.filter((elm, index) => index === key);
    console.log('first', column);
  };
  return (
    <div className="w-1/3 h-full bg-[#fff] rounded-2xl flex flex-col">
      <div className="flex flex-col space-y-1 p-2">
        <label className="block mb-2 mt-2 text-lg font-medium text-gray-900 font-bold">
          Kanban Name
        </label>
        <input
          type="text"
          name="kanbanname"
          placeholder="kanban name"
          value={defaultValue.kanbanname}
          onChange={(e) => {
            setDefaultValue({
              kanbanname: e.target.value,
              choicename: newColumn,
            });
            setDraggedItem([{ title: e.target.value }]);
          }}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="flex flex-col space-y-1 p-2">
        <label className="block mb-2 mt-2 text-lg font-medium text-gray-900 font-bold">
          Entity Name
        </label>
        <select
          id="entityname"
          name="entityname"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {entity.map((option, index) => {
            return (
              <option key={index} value={option.entityname}>
                {option.entityname}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex flex-col space-y-1 p-2">
        <label className="block mb-2 mt-2 text-lg font-medium text-gray-900 font-bold">
          Column Name
        </label>
        <select
          id="columnname"
          name="columnname"
          onChange={(e) => {
            setColumn(e.target.value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {options.map((option, i) => {
            return (
              <option key={i} value={option.columnname}>
                {option.columnname}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex flex-col space-y-1 p-2">
        <label className="flex flex-row space-x-3 p-1 gap-2 block mb-2 mt-2 text-lg font-medium text-gray-900 font-bold">
          Choice{' '}
          <IoMdAddCircle
            onClick={() => {
              setnewColumn((state) => [...state, {}]);
            }}
          />
        </label>
        {newColumn.map((column, j) => (
          <div key={j} className="w-80 flex items-center">
            <input
              className={`bg-[${column.color}] flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px] `}
              type="text"
              value={column.status}
              onChange={(e) => updateColumnname(e.target.value, j)}
            />
            <AiFillEdit
              onClick={() => {
                setEditChoice(j);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default ViewKanban;
