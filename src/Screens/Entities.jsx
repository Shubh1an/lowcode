import React, { useEffect, useState } from 'react';
import TopBar from './Components/TopBar';
import { getEntities, saveEntity } from '../Requests/entity.js';
import TableView from './Components/MiniComponents/Grid';
import { createPage } from '../Requests/page';
import { type } from '@testing-library/user-event/dist/type';

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
  const handleSubmit = () => {
    console.log(modalForm);
    saveEntity(modalForm).then((data) => {
      console.log(data);
      createPage({
        name: modalForm.name,
        entity_id: data?.data?._id,
        description: 'This is the default page for this entity',
        form_schema: {},
        form_data: {},
        type: 'default_add',
      });
      createPage({
        name: modalForm.name,
        entity_id: data?.data?._id,
        description: 'This is the default page for this entity',
        form_schema: {},
        form_data: {},
        type: 'default_edit',
      });
      createPage({
        name: modalForm.name,
        entity_id: data?.data?._id,
        description: 'This is the default page for this entity',
        form_schema: {},
        form_data: {},
        type: 'default_view',
      });
      setShowModal(false);
      fetchEntities();
    });
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

  return (
    <div className="w-full h-full bg-[#FCF9EE] flex flex-col p-4">
      <div className="w-full h-full bg-[#FFF] rounded overflow-auto">
        <TopBar
          label={'Entities'}
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
    </div>
  );
};

const ModalComponent = ({
  closeModal,
  modalForm,
  setModalForm,
  handleSubmit,
}) => {
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
          className="bg-[#000] text-[#fff] px-4 py-1 rounded-md mr-4 font-bold"
          onClick={() => {
            handleSubmit();
            closeModal();
          }}
        >
          Save
        </button>
        <button
          className="text-[#000] px-4 py-1 rounded-md border border-[#000] font-bold"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Entities;
