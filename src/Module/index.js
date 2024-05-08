import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { VscFileSubmodule } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";

import Modal from "../Modal/Modal";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Card = ({ title, description, type, setIsOpen, id, fetchData }) => {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/module/${id}`)
      .then((res) => {
        console.log(res);
        fetchData();
        setIsOpen(false);
      })
      .catch((err) => {
        fetchData();
        console.log(err);
      });
  };

  let loc = useNavigate();

  const handleClick = (id) => {

    console.log(id);
    // navigate
    loc({ pathname: "/entity",search: `?id=${id}` });
  };

  return type === "add" ? (
    <div
      className="max-w-sm w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto mb-4 mt-4 flex cursor-pointer"
      onClick={() => setIsOpen(true)}
    >
      <div className="bg-white shadow-md rounded-lg overflow-hidden min-w-full">
        <IoAddCircleOutline className="w-16 h-16 mx-auto mt-4" />
        <div className="px-4 py-2">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600 mb-3">{description}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="max-w-sm w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto mb-4 mt-4 flex ">
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex items-center flex-col min-w-full">
        <div className="flex w-full justify-center">
          <div className="mt-4 mr-4 w-6 h-6"></div>
          <VscFileSubmodule className="w-16 h-16 mx-auto mt-4" />
          <RxCross2
            color="black"
            className="mt-4 mr-4 w-6 h-6 cursor-pointer"
            onClick={handleDelete}
          />
        </div>
        <div
          className="px-4 py-2 cursor-pointer"
          onClick={() => handleClick(id)}
        >
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

const CardGrid = ({ cards, setIsOpen, fetchData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full px-5 pt-5">
      <Card
        key={"-1"}
        title={"Add Module"}
        description={"Create a new Module"}
        type={"add"}
        setIsOpen={setIsOpen}
      />
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.name}
          description={card.description}
          id={card._id}
          type={""}
          fetchData={fetchData}
        />
      ))}
    </div>
  );
};

const Module = () => {
  const [isOpen, setIsOpen] = useState(false); // Initially, the modal is closed
  const [cardData, setCardData] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:3000/module")
      .then(({ data }) => {
        if (data) {
          setCardData(data);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);


  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div>
        <CardGrid
          cards={cardData}
          setIsOpen={setIsOpen}
          fetchData={fetchData}
        />
      </div>
      <Modal isOpen={isOpen} onClose={toggleModal} children={<AddModule />} />
    </div>
  );
};

const AddModule = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    // Handle form submission here
    if (name && description) {
      setErrorMessage("");
      console.log("Name:", name);
      console.log("Description:", description);
      let payload = {
        name: name,
        description: description,
        ownerId: 1,
      };

      axios
        .post("http://localhost:3000/module", payload)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage("Something went wrong");
        });
    } else {
      setErrorMessage("All fields are required");
    }
  };

  return (
    <div className="max-w-sm w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto mb-4 mt-4 flex cursor-pointer flex-col">
      <p className="text-xl font-bold text-gray-800 w-full text-left">
        Add Module
      </p>
      <p className="text-gray-600 mb-2 w-full text-left mt-2">Name</p>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <p className="text-gray-600 mb-2 w-full text-left mt-2">Description</p>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      {errorMessage && (
        <p className="text-red-500 text-left mt-2">{errorMessage}</p>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );
};

export default Module;
