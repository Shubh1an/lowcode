import React, { useEffect, useState } from 'react';
import TopBar from './Components/TopBar';
import { getModules, saveModule } from '../Requests/module';
import TableView from './Components/MiniComponents/Grid';
import Toast from './Components/Toaster';
const Modules = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: '',
    description: '',
  });
  const [headers, setHeaders] = useState([]);
  const handleSearch = (value) => {};
  const [view, setView] = useState(true);
  const [cells, setCells] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // const handleSubmit = () => {
  //   console.log(modalForm);
  //   saveModule(modalForm)
  // };

  const handleSubmit = async () => {
    console.log(modalForm);
    try {
      await saveModule(modalForm);
      setToastMessage('Module saved successfully.');
      setShowToast(true);
      fetchModules(); // Fetch modules after saving
    } catch (error) {
      console.error('Error saving module:', error);
      setToastMessage('Failed to save module.');
      setShowToast(true);
    }
  };

  const fetchModules = async () => {
    const modules = await getModules();
    let data = modules?.data;
    if (data) {
      let headers_gen = Object.keys(data?.[0] || {});
      headers_gen.forEach((header, index) => {
        if (header === '_id' || header === '__v') {
          headers_gen.splice(index, 1);
        }
      });
      setHeaders(headers_gen);
      setCells(data);
    }
  };
  useEffect(() => {
    fetchModules();
  }, []);

  const resetModalState = () => {
    setModalForm({
      name: '',
      description: '',
    });
    setShowModal(true);
  };

  return (
    <div className="w-full h-full bg-[#FCF9EE] flex flex-col p-4">
      <div className="w-full h-full bg-[#FFF] rounded overflow-auto">
        <TopBar
          label={'Modules'}
          showModal={showModal}
          setShowModal={setShowModal}
          modalForm={modalForm}
          setModalForm={setModalForm}
          resetModalState={resetModalState}
          headers={headers}
          handleSearch={handleSearch}
          searchableHeaders={headers}
          setView={setView}
          view={view}
          handleSubmit={handleSubmit}
          modalComponent={
            <ModalComponent
              closeModal={setShowModal}
              modalForm={modalForm}
              setModalForm={setModalForm}
              handleSubmit={handleSubmit}
            />
          }
        />
        <TableView
          data={{ headers, cells }}
          linkto={'/builder/entity?module_id'}
        />
      </div>
      {/* <ToastContainer
        //  toastClassName="bg-[#F0F9FA] border-2 border-[#3A9EA5] rounded-full"
        toastClassName="bg-green-100 border-2 border-green-500 rounded-lg p-4"
      /> */}

      <Toast
        message={toastMessage}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </div>
  );
};

const ModalComponent = ({
  closeModal,
  modalForm,
  setModalForm,
  handleSubmit,
}) => {
  const [errors, setErrors] = useState({
    name: '',
  });

  const validateForm = () => {
    const newErrors = { name: '' };
    let isValid = true;

    if (!modalForm.name) {
      newErrors.name = 'Module name is required!';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      console.log('handleSave called');
      await handleSubmit();
      console.log('handleSubmit resolved');
      closeModal();
    } catch (error) {
      console.log('handleSubmit error:', error);
      toast.error(`Error: ${error.message}`);
    }
  };

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
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
      <div className="flex justify-start items-center mt-5 space-x-2">
        <button
          className="text-[#000] px-4 py-1 rounded-md border border-[#000] font-bold"
          onClick={() => closeModal()}
        >
          Cancel
        </button>

        <button
          className="bg-[#000] text-[#fff] px-4 py-1 rounded-md mr-4 font-bold"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Modules;
