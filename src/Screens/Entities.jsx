import React, { useEffect, useState } from 'react';
import TopBar from './Components/TopBar';
import { getEntities, saveEntity } from '../Requests/entity.js';
import TableView from './Components/MiniComponents/Grid';
import { createPage } from '../Requests/page';
import { type } from '@testing-library/user-event/dist/type';
import Toast from './Components/Toaster';

const Entities = () => {
  let module_id = location.search.split('module_id=')[1];
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: '',
    description: '',
    module_id: module_id,
  });
  const [headers, setHeaders] = useState([]);
  const handleSearch = (value) => {};
  const [view, setView] = useState(true);
  const [cells, setCells] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = async () => {
    console.log(modalForm);
    debugger;
    try {
      const data = await saveEntity(modalForm);
      debugger;
      console.log(data);
      await createPage({
        name: modalForm.name,
        entity_id: data?.data?._id,
        description: 'This is the default page for this entity',
        form_schema: {},
        form_data: {},
        type: 'default_add',
      });
      await createPage({
        name: modalForm.name,
        entity_id: data?.data?._id,
        description: 'This is the default page for this entity',
        form_schema: {},
        form_data: {},
        type: 'default_edit',
      });
      await createPage({
        name: modalForm.name,
        entity_id: data?.data?._id,
        description: 'This is the default page for this entity',
        form_schema: {},
        form_data: {},
        type: 'default_view',
      });
      setShowModal(false);
      console.log('Successfully saved!');
      setToastMessage('Entity saved successfully.');
      setShowToast(true);
      fetchEntities();
    } catch (error) {
      console.error('Error saving module:', error);
      setToastMessage('Failed to save module.');
      setShowToast(true);
    }
  };

  const fetchEntities = async () => {
    const entity = await getEntities(module_id);
    let data = entity?.data;
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
    fetchEntities();
  }, []);

  const resetModalState = () => {
    setModalForm({
      name: '',
      description: '',
      module_id: module_id,
    });
    setShowModal(true);
  };
  return (
    <div className="w-full h-full bg-[#FCF9EE] flex flex-col p-4">
      <div className="w-full h-full bg-[#FFF] rounded overflow-auto">
        <TopBar
          label={'Entities'}
          showModal={showModal}
          setShowModal={setShowModal}
          resetModalState={resetModalState}
          modalForm={modalForm}
          setModalForm={setModalForm}
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
          linkto={`/builder/pages?module_id=${module_id}&entity_id`}
        />
      </div>
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

    if (!modalForm.name.trim()) {
      newErrors.name = 'Entity name is required!';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  // const handleSave = async () => {
  //   try {
  //     console.log('handleSave called');
  //     await handleSubmit();
  //     console.log('handleSubmit resolved');
  //     closeModal();
  //   } catch (error) {
  //     console.log('handleSubmit error:', error);
  //     toast.error(`Error: ${error.message}`);
  //   }
  // };

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
    }
  };

  const handleNameChange = (e) => {
    setModalForm({ ...modalForm, name: e.target.value });
    if (errors.name) {
      setErrors({ ...errors, name: '' });
    }
  };

  return (
    <div className="w-[400px]">
      <div className="text-2xl font-bold text-[#000]">Add Entities</div>
      <div className="w-full h-[1px] bg-[#E9E9E9]" />
      <div className="w-full mt-5">
        <p className="mb-2 text-lg font-bold">Entity Name</p>
        <input
          type="text"
          className="border border-[#E9E9E9] rounded-lg w-full py-2 px-4 placeholder-text-[#000] focus:border-[#000] focus:outline-none"
          placeholder="Enter Entity Name"
          value={modalForm.name}
          onChange={handleNameChange}
          // onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div className="w-full mt-5">
        <p className="mb-2 text-lg font-bold">Description</p>
        <textarea
          className="border border-[#E9E9E9] rounded-lg w-full py-2 px-4 placeholder-text-[#000] focus:border-[#000] focus:outline-none"
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
          // onClick={closeModal}
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

export default Entities;
