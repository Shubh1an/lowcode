import React, { useEffect, useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import update from "immutability-helper";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useLocation } from "react-router-dom";
const FormBuilder = () => {
  const dataTypes = [
    "heading",
    "paragraph",
    "text",
    "number",
    "select",
    "email",
    "date",
  ];
  const [formData, setFormData] = useState([]);
  const [fieldData, setFieldData] = useState({
    name: "",
    description: "",
    type: "heading",
    required: false,
    options: [],
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const location = useLocation();
  // get location state
  const id = location.search.split("=")[1];
  useState(() => {
    axios
      .get("http://localhost:3000/form?id=" + id)
      .then((res) => {
        setFormData(res.data.fields);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);
  const handleSubmit = () => {
    setFormData([...formData, fieldData]);
    setFieldData({
      name: "",
      description: "",
      type: "",
      required: false,
      options: [],
    });
  };
  // get location state
  const handleFormSave = () => {
    console.log(formData);
    let formDataObj = {
      data: formData,
      id: id,
    };
    axios.post("http://localhost:3000/form", formDataObj).then((res) => {
      console.log(res);
    });
  };

  const handleAddOption = () => {
    setFieldData({ ...fieldData, options: [...fieldData.options, ""] });
  };

  const handleRemoveOption = (index) => {
    console.log(index);
    setFormData(
      update(formData, {
        $splice: [[index, 1]],
      })
    );
  };

  const moveField = (dragIndex, hoverIndex) => {
    const dragField = formData[dragIndex];
    setFormData(
      update(formData, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragField],
        ],
      })
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full flex">
        <div className="w-1/3 border h-screen border-gray-300">
          <h1 className="text-2xl font-bold mt-2">Form Builder</h1>
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mt-2 w-full text-left ml-6 text-lg"
            >
              Label
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-[90%] px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mx-6 my-2"
              onChange={(e) =>
                setFieldData({ ...fieldData, name: e.target.value })
              }
              value={fieldData.name}
            />

            <label
              htmlFor="description"
              className="mt-2 w-full text-left ml-6 text-lg"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className="w-[90%] px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mx-6 my-2"
              onChange={(e) =>
                setFieldData({ ...fieldData, description: e.target.value })
              }
              value={fieldData.description}
            />

            <label
              htmlFor="type"
              className="mt-2 w-full text-left ml-6 text-lg"
            >
              Data Type
            </label>
            <select
              name="type"
              id="type"
              className="w-[90%] px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mx-6 my-2"
              onChange={(e) =>
                setFieldData({ ...fieldData, type: e.target.value })
              }
              value={fieldData.type}
            >
              {dataTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {fieldData.type === "select" && (
              <div className="flex flex-col">
                <label
                  htmlFor="options"
                  className="mt-2 w-full text-left ml-6 text-lg"
                >
                  Options
                </label>
                {fieldData?.options?.map((option, index) => (
                  <input
                    type="text"
                    key={index}
                    name="options"
                    id="options"
                    className="w-[90%] px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mx-6 my-2"
                    onChange={(e) => {
                      const newOptions = [...fieldData.options];
                      newOptions[index] = e.target.value;
                      setFieldData({ ...fieldData, options: newOptions });
                    }}
                    value={option}
                  />
                ))}
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mx-6 my-2"
                  onClick={handleAddOption}
                >
                  Add Option
                </button>
              </div>
            )}
            <div className="flex flex-row items-center">
              <label htmlFor="required" className="mt-2 text-left ml-6 text-lg">
                Required:
              </label>
              <input
                type="checkbox"
                name="required"
                id="required"
                className="border rounded focus:outline-none focus:border-blue-500 text-lg h-4 w-4 mt-2 ml-2"
                onChange={(e) =>
                  setFieldData({ ...fieldData, required: e.target.checked })
                }
                checked={fieldData.required}
              />
            </div>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mx-6 my-2"
              onClick={handleSubmit}
            >
              Add
            </button>
            {/* Submit button at the bottom */}
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mx-6"
              onClick={handleFormSave}
            >
              Save
            </button>
          </div>
        </div>
        <div className="w-2/3 h-screen bg-gray-300 ">
          <h1 className="text-2xl font-bold mt-2">Form Preview</h1>
          <div className="mt-8 mx-8  bg-white p-6">
            {formData.map((field, index) => (
              <DraggableField
                key={field.name}
                index={index}
                id={field.name}
                moveField={moveField}
              >
                <Field
                  field={field}
                  index={index}
                  handleRemoveOption={handleRemoveOption}
                />
              </DraggableField>
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

const DraggableField = ({ id, index, moveField, children }) => {
  const [, drag] = useDrag({
    type: "FIELD",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "FIELD",
    hover(item) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveField(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const dropRef = React.useRef(null);
  drag(drop(dropRef));

  return <div ref={dropRef}>{children}</div>;
};

const Field = ({ field, index, handleRemoveOption }) => {
  const { name, description, type, required } = field;
  if (type === "heading") {
    return <h1 className="text-2xl font-bold my-2">{name}</h1>;
  } else if (type === "paragraph") {
    return <p className="my-1">{name}</p>;
  } else if (type === "text") {
    return (
      <div className="my-1 flex items-center">
        <label htmlFor="name" className="w-[40%] text-left ml-6 text-lg">
          {name}
          {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="w-[90%] px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mx-6 my-2"
          required={required}
        />
        <RxCross2
          color="black"
          className="mt-4 mr-4 w-6 h-6 cursor-pointer"
          onClick={() => {
            handleRemoveOption(index);
          }}
        />
      </div>
    );
  } else if (type === "number") {
    return (
      <div className="my-1 flex items-center">
        <label htmlFor="name" className="w-[40%] text-left ml-6 text-lg">
          {name}
          {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="number"
          name="name"
          id="name"
          className="w-[90%] px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mx-6 my-2"
          required={required}
        />
        <RxCross2
          color="black"
          className="mt-4 mr-4 w-6 h-6 cursor-pointer"
          onClick={() => {
            handleRemoveOption(index);
          }}
        />
      </div>
    );
  } else if (type === "select") {
    return (
      <div className="my-1 flex items-center">
        <label htmlFor="name" className="w-[40%] text-left ml-6 text-lg">
          {name}
          {required && <span className="text-red-500">*</span>}
        </label>
        <select
          name="name"
          id="name"
          className="w-[90%] px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mx-6 my-2"
          required={required}
        >
          {field?.options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <RxCross2
          color="black"
          className="mt-4 mr-4 w-6 h-6 cursor-pointer"
          onClick={() => {
            handleRemoveOption(index);
          }}
        />
      </div>
    );
  } else if (type === "email") {
    return (
      <div className="my-1 flex items-center">
        <label htmlFor="name" className="w-[40%] text-left ml-6 text-lg">
          {name}
          {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="email"
          name="name"
          id="name"
          className="w-[90%] px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mx-6 my-2"
          required={required}
        />
        <RxCross2
          color="black"
          className="mt-4 mr-4 w-6 h-6 cursor-pointer"
          onClick={() => {
            handleRemoveOption(index);
          }}
        />
      </div>
    );
  } else if (type === "date") {
    return (
      <div className="my-1 flex items-center">
        <label htmlFor="name" className="w-[40%] text-left ml-6 text-lg">
          {name}
          {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="date"
          name="name"
          id="name"
          className="w-[90%] px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mx-6 my-2"
          required={required}
        />
        <RxCross2
          color="black"
          className="mr-4 cursor-pointer pb-4"
          onClick={() => {
            handleRemoveOption(index);
          }}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default FormBuilder;
