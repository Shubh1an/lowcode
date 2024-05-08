import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ViewFormData = () => {
  const location = useLocation();
  // get location state
  const id = location.search.split("=")[1];
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/fillform?id=" + id)
      .then((res) => {
        setFormData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])
  return <div className="p-4">
    <DynamicTable data={formData} />
  </div>;
};

const DynamicTable = ({ data }) => {
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
                <th key={index} className="border px-4 py-2">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Dynamically generate table rows */}
            {data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {headings.map((key, colIndex) => (
                  <td key={colIndex} className="border px-4 py-2">{item.fields[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default ViewFormData;
