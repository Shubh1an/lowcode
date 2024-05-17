import React from 'react';
import { useDrag } from 'react-dnd';

export default function BoardInput({ AdvancecFields, extraClass }) {
  const [, drag] = useDrag({
    type: 'FIELD',
    item: { index: 0, field: AdvancecFields[0] },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div>
      {AdvancecFields.map((field, index) => (
        <button
          key={index}
          type="button"
          className={`rounded-md px-4 py-2 flex space-x-2 shadow-[0_0_14px_0_rgba(34,122,96,0.1)] ${extraClass} h-[40px] items-center`}
          ref={drag}
        >
          {field.icon}
          <span>{field.title}</span>
        </button>
      ))}
    </div>
  );
}
