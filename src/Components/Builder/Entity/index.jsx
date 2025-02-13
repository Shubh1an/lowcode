import React, { useEffect, useState } from 'react';
import AddNewButton from '../../inputs/AddNewButton';
import CustomSearch from '../../CustomSearch/CustomSearch';
import ListHeaderButton from '../../inputs/ListHeaderButton';
import { IoSearch } from 'react-icons/io5';
import ShortModal from '../../ShortModal/ShortModal';
import { ChangeViewBtn } from '../../Buttons/ChangeViewBtn';
import { getEntities, saveEntity } from '../../../Requests/entity';
import { formatValue } from '../../../Utility/utility';
import { Link } from 'react-router-dom';

function preprocessSearchData(searchData, searchableHeaders) {
  const hashTable = {};
  // Initialize hash table with empty arrays for each searchable header
  searchableHeaders.forEach((header) => {
    hashTable[header] = [];
  });

  // Populate hash table with search data
  searchData.forEach((item) => {
    searchableHeaders.forEach((header) => {
      if (item.hasOwnProperty(header) && typeof item[header] === 'string') {
        // Convert header value to lowercase for case-insensitive search
        const value = item[header].toLowerCase();
        hashTable[header].push({ item, value });
      }
    });
  });

  return hashTable;
}
function search(searchValue, searchableHeaders, hashTable) {
  const results = [];

  // Convert search value to lowercase for case-insensitive search
  const searchTerm = searchValue.toLowerCase();

  // Search through hash table for matches
  searchableHeaders.forEach((header) => {
    hashTable?.[header]?.forEach(({ item, value }) => {
      if (value.includes(searchTerm)) {
        results.push(item);
      }
    });
  });

  return results;
}

const Entity = () => {
  const [forms, setForms] = useState([]);
  const [formsToRender, setFormsToRender] = useState([]);
  const [searchableHeaders, setSearchableHeaders] = useState([]);
  const [hashTable, setHashTable] = useState({});
  const [hideColumns, setHideColumns] = useState([]);
  const [renderHeaders, setRenderHeaders] = useState([]);
  const [people, setPeoples] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: '',
    description: '',
    moduleId: '',
  });
  const [headers, setHeaders] = useState([]);
  const [view, setView] = useState(true);
  const [cells, setCells] = useState([]);

  let module_id = location.search.split('=')[1];

  const fetchEntities = async () => {
    const entity = await getEntities(module_id);
    let data = entity?.data;
    setForms(entity?.data);
    let headers_gen = Object.keys(data?.[0] || {});
    headers_gen.forEach((header, index) => {
      if (header === '_id' || header === '__v') {
        headers_gen.splice(index, 1);
      }
    });
    setRenderHeaders([...headers_gen]);
    setHeaders([...headers_gen]);
    setCells(data);
  };
  useEffect(() => {
    fetchEntities();
  }, []);

  const handleSubmit = () => {
    let data = {
      name: modalForm?.name,
      description: modalForm?.description,
      moduleId: module_id,
    };
    saveEntity(data).then(() => {
      fetchEntities();
    });
  };

  useEffect(() => {
    setFormsToRender(forms);
    setHashTable(preprocessSearchData(forms, searchableHeaders));
  }, [forms, searchableHeaders]);

  const handleHide = (column, checked) => {
    setHideColumns((prev) => {
      if (!checked) {
        return [...prev, column];
      } else {
        return prev.filter((col) => col !== column);
      }
    });
  };

  useEffect(() => {
    // Remove hidden columns
    setRenderHeaders((prev) => {
      let newHeaders = [...headers];
      hideColumns.forEach((col) => {
        newHeaders = newHeaders.filter((header) => header !== col);
      });
      return newHeaders;
    });
    // Add unhidden columns
  }, [hideColumns, forms]);

  useEffect(() => {}, [renderHeaders]);

  const handleSearch = (value) => {
    if (value) {
      const results = search(value, searchableHeaders, hashTable);
      setFormsToRender(results);
    } else {
      setFormsToRender(forms);
    }
  };

  useEffect(() => {
    formsToRender.forEach((form, index) => {
      let header = Object.keys(form);
      header.forEach((header) => {
        if (header == 'created_by') {
          let user_id = form[header]?.user_id;
          if (!people[user_id]) {
            setPeoples((prev) => {
              return { ...prev, [user_id]: form[header] };
            });
          }
        }
      });
    });
  }, [formsToRender]);

  const handleHeaderSelect = (value, checked) => {
    if (checked) {
      setSearchableHeaders((prev) => [...prev, value]);
    } else {
      setSearchableHeaders((prev) => prev.filter((header) => header !== value));
    }
  };

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
          searchableHeaders={searchableHeaders}
          handleHeaderSelect={handleHeaderSelect}
          setView={setView}
          handleHide={handleHide}
          view={view}
          handleSubmit={handleSubmit}
          hideColumns={hideColumns}
          people={people}
          setHideColumns={setHideColumns}
        />
        <TableView headers={renderHeaders} data={formsToRender} />
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
  handleHeaderSelect,
  setView,
  view,
  handleSubmit,
  handleHide,
  hideColumns,
  setHideColumns,
  people,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="h-[60px] mx-6 border-b justify-center">
      <div className="flex items-center h-full">
        <p className="text-2xl font-bold">Entities</p>
        <AddNewButton
          onclick={() => setShowModal(!showModal)}
          isDropDown={false}
        />
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
            handleHeaderSelect={(header_label, checked) => {
              handleHeaderSelect(header_label, checked);
            }}
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
                handleSubmit={handleSubmit}
                modalForm={modalForm}
                setModalForm={setModalForm}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};
const ModalComponent = ({
  closeModal,
  handleSubmit,
  modalForm,
  setModalForm,
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

const TableView = ({ headers, data }) => {
  const cells = data;
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
      {cells.length > 0 ? (
        cells.map((row, index) => {
          return (
            <Link to={`/builder/pages?entity_id=${row?._id}`}>
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
        })
      ) : (
        <div className="w-full flex flex-row px-[2px] py-[1px]">
          <div className="w-full flex justify-center items-center text-base	font-medium	mx-[2px] py-2 bg-[#E9F2EF]">
            No Records Found
          </div>
        </div>
      )}
    </div>
  );
};

export default Entity;
