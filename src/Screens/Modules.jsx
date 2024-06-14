import React, { useEffect, useState } from 'react';
import TopBar from './Components/TopBar';
//import { PAGINATED_MODELS_QUERY } from '../Requests/module';
import {
  getModules,
  saveModule,
  getPaginatedModules,
} from '../Requests/module';
import TableView from './Components/MiniComponents/Grid';
import CustomHide from './Components/MiniComponents/CustomHide';
import { isNullableType } from 'graphql';
import { empty } from '@apollo/client';

const Modules = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: '',
    description: '',
  });
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cachedData, setCachedData] = useState(null);
  const [SearchableHeaders, setSearchableHeaders] = useState(headers);
  const [hiddenHeaders, setHiddenHeaders] = useState([]);

  // Modify handleSearch function to properly pass searchCriteria
  const handleSearch = async (searchCriteria) => {
    try {
      console.log('searchCriteria:', searchCriteria);
      // Call fetchModules with searchCriteria and currentPage
      await fetchModules(searchCriteria, currentPage);
    } catch (error) {
      console.error('Error searching modules:', error);
    }
  };
  const [view, setView] = useState(true);
  const [cells, setCells] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await saveModule(modalForm);
      setShowModal(false);
      fetchModules({}, currentPage); // Fetch current page after save
    } catch (error) {
      console.error('Error saving module:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchModules = async (
    search = {},
    page = 1,
    limit = 4,
    sort = { field: 'name', order: 'asc' },
  ) => {
    try {
      //return console.log("Loading", search);
      setLoading(true);
      const variables = {
        page,
        limit,
        sort,
        search,
        filter: {},
      };
      console.log('vvvv', variables);
      const modulesData = await getPaginatedModules(variables);
      console.log('modulesData', modulesData);
      const data = modulesData.modules;
      if (data) {
        const headers_gen = Object.keys(data?.[0] || {}).filter(
          (header) =>
            header !== 'id' && header !== '__v' && header !== '__typename',
        );
        console.log('headers_gen', headers_gen);
        setHeaders(headers_gen);
        setCells(data);
        setTotalPages(Math.ceil(modulesData.totalmodules / limit));
      }
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };
  // const fetchModules = async () => {
  //   try {

  //     setLoading(true);
  //     const modulesData = await getModules();

  //     const data = modulesData.modules;
  //     if (data) {
  //       const headers_gen = Object.keys(data?.[0] || {}).filter(
  //         (header) => header !== 'id' && header !== '__v'
  //       );
  //       setHeaders(headers_gen);
  //       setCells(data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching modules:", error);
  //   } finally {
  //     setLoading(false); // Set loading state to false after fetching
  //   }
  // };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchModules({}, newPage);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  useEffect(() => {
    console.log('Modules loaded', SearchableHeaders);
  }, [SearchableHeaders]);
  useEffect(() => {
    console.log('M1', modalForm);
    console.log('M1', view);
  }, []);

  return (
    <div className="w-full h-full bg-[#FCF9EE] flex flex-col p-4">
      <div className="w-full h-full bg-[#FFF] rounded overflow-auto">
        <TopBar
          label={'Modules'}
          showModal={showModal}
          setShowModal={setShowModal}
          modalForm={modalForm}
          setModalForm={setModalForm}
          headers={headers}
          // handleSearch={() => {}}
          handleSearch={handleSearch}
          // searchableHeaders={headers}
          SearchableHeaders={SearchableHeaders}
          setSearchableHeaders={setSearchableHeaders}
          setView={setView}
          view={view}
          handleSubmit={handleSubmit}
          fetchModules={fetchModules}
          setHiddenHeaders={setHiddenHeaders}
          hiddenHeaders={hiddenHeaders}
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
          <>
            <TableView
              data={{ headers, cells }}
              linkto={'/builder/entity?module_id'}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
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
          className="bg-[#000] text-[#fff] px-4 py-1 rounded-md mr-4 font-bold"
          onClick={() => {
            handleSubmit();
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

export default Modules;
