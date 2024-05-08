import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ViewFormData = () => {
  const location = useLocation();
  // get location state
  const id = location.search.split("=")[1];
  const [formData, setFormData] = useState([]);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (editingRowIndex !== null) {
      let defaultData = formData[editingRowIndex];
      setEditData(defaultData);
      console.log(defaultData);
    }
  }, [editingRowIndex]);

  const editHandle = (data) => {
    axios
      .put(`http://localhost:3000/fillform`, data)
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const deleteHandle = (index) => {
    let id = formData[index]._id
    axios
      .delete(`http://localhost:3000/fillform?id=${id}`)
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const fetchData = () => {
    axios
    .get("http://localhost:3000/fillform?id=" + id)
    .then((res) => {
      setFormData(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="p-4">
      <DynamicTable
        data={formData}
        editingRowIndex={editingRowIndex}
        setEditingRowIndex={setEditingRowIndex}
        editHandle={editHandle}
        setEditData={setEditData}
        editData={editData}
        deleteHandle={deleteHandle}
      />
    </div>
  );
};

const DynamicTable = ({
  data,
  editingRowIndex,
  setEditingRowIndex,
  editHandle,
  setEditData,
  editData,
  deleteHandle
}) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  // Extracting keys from the first item assuming all items have the same structure
  const headings = Object.keys(data[0].fields);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            {/* Dynamically generate table headings */}
            {headings.map((heading, index) => (
              <th key={index} className="border px-4 py-2">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Dynamically generate table rows */}
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {headings.map((key, colIndex) =>
                //   <td key={colIndex} className="border px-4 py-2">{item.fields[key]}</td>
                editingRowIndex === rowIndex ? (
                  <td key={colIndex} className="border px-4 py-2">
                    <input
                      type="text"
                      value={editData.fields?.[key]}
                      onChange={(e) => {
                        setEditData({
                          ...editData,
                          fields: {
                            ...editData.fields,
                            [key]: e.target.value,
                          },
                        });
                      }}
                    />
                  </td>
                ) : (
                  <td key={colIndex} className="border px-4 py-2">
                    {item.fields[key]}
                  </td>
                )
              )}
              <td className="border px-4 py-2">
                {editingRowIndex !== rowIndex ? (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      setEditingRowIndex(rowIndex);
                    }}
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      editHandle(editData);
                      setEditingRowIndex(null);
                      setEditData({});
                    }}
                  >
                    Save
                  </button>
                )}
              </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      deleteHandle(rowIndex);
                    }}
                  >
                    Delete
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewFormData;
