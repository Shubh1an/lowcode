import React from 'react';

function Task({ task }) {
    return (
        <div className="bg-white p-2 rounded-md mb-2 ">
            {task.content}
        </div>
    );
}

export default Task;