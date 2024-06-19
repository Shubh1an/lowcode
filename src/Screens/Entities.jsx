import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPaginatedEntities, saveEntity } from '../Requests/entity';
import { createPage } from '../Requests/page';
import TableView from './Components/MiniComponents/Grid';
import TopBar from './Components/TopBar';
import Toast from './Components/Toaster';

const Entities = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const module_id = params.get('module_id');

  console.log('module_id', module_id);
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: '',
    description: '',
    module_id: module_id,
  });
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cells, setCells] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchCriteria, setSearchCriteria] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [hiddenHeaders, setHiddenHeaders] = useState([]);
  const [SearchableHeaders, setSearchableHeaders] = useState(headers);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  // const handleSubmit = async () => {
  //   try {
  //     setLoading(true);
  //     console.log('Submit', modalForm);
  //     const data = await saveEntity(modalForm);
  //     // Additional page creation logic can be added here if needed
  //     setShowModal(false);
  //     fetchEntities({}, currentPage);
  //   } catch (error) {
  //     console.error('Error saving entity:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSearch = async (searchCriteria) => {
    try {
      console.log('searchCriteria:', searchCriteria);
      // Call fetchModules with searchCriteria and currentPage
      await fetchEntities(searchCriteria, currentPage);
    } catch (error) {
      console.error('Error searching modules:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const data = await saveEntity(modalForm);
      await createPage({
        name: modalForm.name,
        entity_id: data.id,
        description: 'This is the default page for this entity',
        form_schema: [],
        type: 'default_add',
      });

      await createPage({
        name: modalForm.name,
        entity_id: data.id,
        description: 'This is the default page for this entity',
        form_schema: [],
        type: 'default_edit',
      });
      await createPage({
        name: modalForm.name,
        entity_id: data.id,
        description: 'This is the default page for this entity',
        form_schema: [],
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

  const fetchEntities = async (
    search = {},
    page = 1,
    limit = 4,
    sort = { field: 'name', order: 'asc' },
  ) => {
    try {
      setLoading(true);
      const variables = {
        page,
        limit,
        sort,
        search,
        filter: { module_id: module_id },
      };
      const { entities, totalEntities } = await getPaginatedEntities(variables);
      if (entities) {
        const headers_gen = Object.keys(entities?.[0] || {}).filter(
          (header) =>
            header !== '_id' &&
            header !== '__v' &&
            header !== 'id' &&
            header !== '__typename',
        );
        console.log('headers_gen111----->', headers_gen);
        setHeaders(headers_gen);
        setCells(entities);
        setTotalPages(Math.ceil(totalEntities / limit));
      }
    } catch (error) {
      console.error('Error fetching entities:', error);
    } finally {
      setLoading(false);
    }
  };

  // const handlePageChange = (newPage) => {
  //   if (newPage >= 1 && newPage <= totalPages) {
  //     setCurrentPage(newPage);
  //     fetchEntities({ name: searchCriteria }, newPage);
  //   }
  // };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);

      fetchEntities({}, newPage, 4, { field: sortField, order: sortOrder });
    }
  };
  // const handleSearch = (searchCriteria) => {
  //   setCurrentPage(1); // Reset to first page on new search
  //   fetchEntities(searchCriteria, 1);
  // };
  // const handleSearch = (value) => {
  //   setSearchCriteria(value);
  //   fetchEntities({ name: value }, currentPage);
  // };
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
          // handleSearch={(value) => fetchEntities({ name: value }, currentPage)}
          //SearchableHeaders={headers}
          setView={() => {}}
          view={true}
          handleSubmit={handleSubmit}
          setHiddenHeaders={setHiddenHeaders}
          hiddenHeaders={hiddenHeaders}
          setSearchableHeaders={setSearchableHeaders}
          SearchableHeaders={SearchableHeaders}
          sortField={sortField}
          sortOrder={sortOrder}
          //handleSort={handleSort}
          handleSort={(field, order) => {
            setSortField(field);
            setSortOrder(order);
            fetchEntities({}, 1, 4, { field, order });
          }}
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
          hiddenHeaders={hiddenHeaders}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
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
          //className="border border-[#E9E9E9] rounded-lg w-full py-2 px-4 placeholder-text-[#000] focus:border-[#000] focus:outline-none"
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
