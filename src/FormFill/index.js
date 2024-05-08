import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Field = ({ field, index, onDataChange }) => {
  const { name, description, type, required } = field;

  const handleChange = (event) => {
    const { name, value } = event.target;
    onDataChange(name, value);
  };

  if (type === "heading") {
    return <h1 className="text-2xl font-bold my-2">{name}</h1>;
  } else if (type === "paragraph") {
    return <p className="my-1">{name}</p>;
  } else {
    return (
      <div className="my-1 flex items-center">
        <label htmlFor={name} className="w-[40%] text-left ml-6 text-lg">
          {name}
          {required && <span className="text-red-500">*</span>}
        </label>
        {type === "select" ? (
          <select
            name={name}
            id={name}
            className="w-[90%] px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mx-6 my-2"
            required={required}
            onChange={handleChange}
          >
            {field?.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            className="w-[90%] px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mx-6 my-2"
            required={required}
            onChange={handleChange}
          />
        )}
      </div>
    );
  }
};
const FillForm = () => {
  const location = useLocation();
  // get location state
  const id = location.search.split("=")[1];
  const [formData, setFormData] = useState([]);
  const [formValues, setFormValues] = useState({});

  const handleDataChange = (fieldName, value) => {
    let trimmedName = fieldName.replace(/ /g, "_");
    trimmedName = trimmedName.replace(/\./g, "_");
    trimmedName = trimmedName.replace(/\(/g, "_");
    trimmedName = trimmedName.toLowerCase();
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [trimmedName]: value,
    }));
  };

  const handleSubmit = () => {
    // Do something with the formValues state, such as sending it to a server
    console.log("Form submitted with data:", formValues);
    let payload = {
      form_id: id,
      data: formValues,
    };
    axios
      .post("http://localhost:3000/fillform", payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/form?id=" + id)
      .then((res) => {
        setFormData(res.data.fields);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="w-screen h-screen bg-gray-300 flex justify-center">
      {/* Grid view for form */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 px-5 pt-5 bg-white rounded mt-10 mb-10 w-3/4">
        {formData.map((card, index) => (
          <Field
            key={index}
            field={card}
            index={index}
            onDataChange={handleDataChange}
          />
        ))}
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-6 h-10 w-40"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FillForm;
