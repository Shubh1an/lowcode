import React, { useEffect, useState } from 'react';
import AddNewButton from '../../inputs/AddNewButton';
import CustomSearch from '../../CustomSearch/CustomSearch';
import ListHeaderButton from '../../inputs/ListHeaderButton';
import { IoSearch } from 'react-icons/io5';
import ShortModal from '../../ShortModal/ShortModal';
import { ChangeViewBtn } from '../../Buttons/ChangeViewBtn';
import { getModules, saveModule } from '../../../Requests/module';
import { formatValue } from '../../../Utility/utility';
import { Link } from 'react-router-dom';

const Module = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: '',
    description: '',
    ownerId: 'erfgjhw',
  });
  const [headers, setHeaders] = useState([]);
  const [view, setView] = useState(true);

  const [cells, setCells] = useState([]);

  const fetchModules = async () => {
    const modules = await getModules();
    let data = modules?.data;
    console.log(data, 'data');
    if (data) {
      let headers_gen = Object.keys(data?.[0] || {});
      headers_gen.forEach((header, index) => {
        if (header === '_id' || header === '__v') {
          headers_gen.splice(index, 1);
        }
      });
      setHeaders(headers_gen);
      setCells(data);
      console.log('data ----------->', data);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const handleSearch = (value) => {};

  const handleSubmit = () => {
    saveModule(modalForm).then(() => {
      fetchModules();
    });
  };

  // const handleSubmit = async () => {
  //   try {
  //     const response = await saveModule(modalForm);
  //     console.log("save data module---->", response);

  //     // Trigger a reload of the module data
  //     fetchModules();
  //   } catch (error) {
  //     console.error("Error saving module:", error);
  //   }
  // };

  // const handleAddNew = () => {
  //   console.log("Before resetting modalForm:", modalForm);
  //   // Reset modalForm to its initial blank state
  //   setModalForm({
  //     name: '',
  //     description: '',
  //     ownerId: 'erfgjhw', // Assuming this is the default ownerId
  //   });
  //   console.log("After resetting modalForm:", modalForm);
  //   // Show modal
  //   setShowModal(true);
  // };
  return (
    <div className="w-full h-full bg-[#FCF9EE] flex justify-center items-center px-6 py-6 ">
      <div className="w-full h-full bg-[#FFF] rounded-2xl">
        <TopBar
          showModal={showModal}
          setShowModal={setShowModal}
          modalForm={modalForm}
          setModalForm={setModalForm}
          headers={headers}
          handleSearch={handleSearch}
          searchableHeaders={headers}
          setView={setView}
          view={view}
          handleSubmit={handleSubmit}
          // handleAddNew={handleAddNew}
        />
        <TableView data={{ headers, cells }} />
      </div>
    </div>
  );
};

const TopBar = ({
  showModal,
  setShowModal,
  modalForm,
  setModalForm,
  headers,
  handleSearch,
  searchableHeaders,
  setView,
  view,
  handleSubmit,
  handleAddNew,
}) => {
  console.log('setModelForm----->', setModalForm);
  console.log('setShowModal-->', setShowModal);
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="h-[60px] mx-6 border-b justify-center">
      <div className="flex items-center h-full">
        <p className="text-2xl font-bold">Modules</p>
        <AddNewButton
          // onclick={() => setShowModal(!showModal)}

          onclick={onclick}
          isDropDown={false}
        />
        {/* <AddNewButton
         
          onclick={handleAddNew} // Call handleAddNew function here
          isDropDown={false}
        /> */}

        <div className="flex items-center h-full ml-auto">
          <CustomSearch
            initialComponent={
              <ListHeaderButton
                icon={<IoSearch />}
                label="Search"
                onclick={() => {
                  setShowSearch(!showSearch);
                }}
              />
            }
            searchHeaders={searchableHeaders}
            headers={headers}
            searchActive={showSearch}
            setShowSearch={setShowSearch}
            customClass={''}
            handleSearch={handleSearch}
          />
          <ChangeViewBtn
            onclick={() => {
              setView(!view);
            }}
            view={view}
          />
          <ShortModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
            }}
            children={
              <ModalComponent
                closeModal={() => setShowModal(false)}
                modalForm={modalForm}
                setModalForm={setModalForm}
                handleSubmit={handleSubmit}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

const TableView = ({ data }) => {
  const { headers, cells } = data;
  return (
    <div className="w-full h-full flex flex-col overflow-auto px-4">
      <div className="w-full flex flex-row px-[2px] pt-[12px] sticky top-0 bg-[#fff]">
        {headers.map((header, index) => {
          return (
            <div
              className="w-full flex justify-center items-center text-base	font-medium py-2 border border-[#E9E9E9] overflow-hidden"
              key={index + '_heading'}
            >
              {header}
            </div>
          );
        })}
      </div>
      {cells.map((row, index) => {
        return (
          <Link to={`/builder/entity?module_id=${row?._id}`}>
            <div className="w-full flex flex-row px-[2px] hover:bg-[#E9E9E9] cursor-pointer">
              {headers.map((header, index) => {
                return (
                  <div
                    className="w-full flex justify-center items-center text-base font-medium py-2 border border-[#E9E9E9]"
                    key={index + '_cell'}
                  >
                    {formatValue(row[header], header)}
                  </div>
                );
              })}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
const ModalComponent = ({
  closeModal,
  modalForm,
  setModalForm,
  handleSubmit,
}) => {
  console.log('ModalComponent rendered with modalForm:', modalForm);
  return (
    <div className="w-[400px]">
      <div className="text-2xl font-bold text-[#000]">Add Modules</div>
      <div className="w-full h-[1px] bg-[#E9E9E9]" />
      <div className="w-full mt-5">
        <p className="mb-2 text-lg font-bold">Module Name</p>
        <input
          type="text"
          className="border border-[#E9E9E9] rounded-lg w-full py-2 px-4 placeholder-text-[#000] focus:border-[#000] focus:outline-none"
          placeholder="Enter Module Name"
          value={modalForm.name}
          onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
        />
      </div>
      <div className="w-full mt-5">
        <p className="mb-2 text-lg font-bold">Description</p>
        <textarea
          className="border border-[#E9E9E9] rounded-lg w-full py-2 px-4 placeholder-text-[#000] focus:border-[#000] focus:outline-none "
          placeholder="Enter Description"
          rows={3}
          value={modalForm.description}
          onChange={(e) =>
            setModalForm({ ...modalForm, description: e.target.value })
          }
        />
      </div>
      <div className="flex justify-start items-center mt-5">
        <button
          className="text-[#000] px-4 py-1 rounded-md border border-[#000] font-bold"
          onClick={closeModal}
        >
          Cancel
        </button>

        <button
          className="bg-[#000] text-[#fff] px-4 py-1 rounded-md mr-4 font-bold"
          onClick={() => {
            handleSubmit();
            closeModal();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Module;
