import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPaginatedEntities, saveEntity } from '../Requests/entity';
import { createPage } from '../Requests/page';
import TableView from './Components/MiniComponents/Grid';
import TopBar from './Components/TopBar';

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
  const [SearchableHeaders, setSearchableHeaders] = useState([]);
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

  const handleSubmit = async () => {
    try {
      debugger;
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
      fetchEntities();
    } catch (error) {
      console.error('Error saving entity:', error);
    }
  };

  const fetchEntities = async (search = {}, page = 1, limit = 4) => {
    try {
      setLoading(true);
      const variables = {
        page,
        limit,
        sort: { field: 'name', order: 'asc' },
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
        console.log('headers_gen1', headers_gen);
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
  //     fetchEntities({}, newPage);
  //   }
  // };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchEntities({ name: searchCriteria }, newPage);
    }
  };
  // const handleSearch = (searchCriteria) => {
  //   setCurrentPage(1); // Reset to first page on new search
  //   fetchEntities(searchCriteria, 1);
  // };
  const handleSearch = (value) => {
    setSearchCriteria(value);
    fetchEntities({ name: value }, currentPage);
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
          // handleSearch={(value) => fetchEntities({ name: value }, currentPage)}
          SearchableHeaders={headers}
          setView={() => {}}
          view={true}
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
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <p>Loading...</p>
          </div>
        ) : (
          <TableView
            data={{ headers, cells }}
            linkto={`/builder/pages?module_id=${module_id}&entity_id`}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
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
          className="border border-[#E9E9E9] rounded-lg w-full py-2 px-4 placeholder-text-[#000] focus:border-[#000] focus:outline-none"
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
            closeModal(false);
          }}
        >
          Save
        </button>
        <button
          className="text-[#000] px-4 py-1 rounded-md border border-[#000] font-bold"
          onClick={() => closeModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Entities;
