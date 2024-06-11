import { useEffect, useState } from 'react';
import { BiHide } from 'react-icons/bi';
import { CiFilter } from 'react-icons/ci';
import { IoSearch } from 'react-icons/io5';
import { LiaUserCircle } from 'react-icons/lia';
import { MdOutlineSwapVert } from 'react-icons/md';
import HideModal from '../Components/Modals/Hide';
import PersonModal from '../Components/Modals/PersonModal';
import { formatValue } from '../Utility/utility';
import CustomSearch from './Components/MiniComponents/CustomSearch';
import ListHeaderButton from './Components/MiniComponents/ListHeaderButton';
import ShortModal from './Components/MiniComponents/ShortModal';
import { getFilledData } from '../Graphql/modelQuery';
// import { getFilledData } from '../Graphql/modelQuery';

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

const ListView = () => {
  let page_id = location.search.split('=')[1];
  console.log('jhhsghd', page_id);

  const [forms, setForms] = useState([]);
  const [formsToRender, setFormsToRender] = useState([]);
  const [renderHeaders, setRenderHeaders] = useState([]);
  const [hideColumns, setHideColumns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState(null);
  const [searchableHeaders, setSearchableHeaders] = useState([
    'name',
    'category',
    'description',
  ]);
  const [people, setPeoples] = useState({});

  const [page_detail_id, setPage_detail_id] = useState('');
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);

  const getviewPage = async (page_id) => {
    try {
      const res = await getFilledData(page_id);
      let high_index = 0;
      let high_length = 0;
      let form_data = res.getFilledData;
      let data_array = form_data.map((data, index) => {
        if (data?.form_data?.length > high_length) {
          high_index = index;
          high_length = data?.form_data?.length;
        }
        return data.form_data;
      });
      console.log('Form Data: ', form_data);
      console.log('Data Array: ', data_array);
      setHeaders(form_data[high_index || 0]?.form_data.map((dt) => dt.key));
      setRenderHeaders(
        form_data[high_index || 0]?.form_data.map((dt) => dt.key),
      );
      setData(data_array);
      setForms(data_array);
      setFormsToRender(data_array);
    } catch (err) {
      console.log('object', err);
    }
  };

  useEffect(() => {
    getviewPage(page_id);
  }, [page_id]);

  //let entity_id = location.search.split('=')[1];

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

  const handleHide = (column, checked) => {
    setHideColumns((prev) => {
      if (!checked) {
        return [...prev, column];
      } else {
        return prev.filter((col) => col !== column);
      }
    });
  };

  const [hashTable, setHashTable] = useState({});

  useEffect(() => {
    setFormsToRender(forms);
    setHashTable(preprocessSearchData(forms, searchableHeaders));
  }, [forms, searchableHeaders]);

  const handleSearch = (value) => {
    if (value) {
      const results = search(value, searchableHeaders, hashTable);
      setFormsToRender(results);
    } else {
      setFormsToRender(forms);
    }
  };

  const handleHeaderSelect = (value, checked) => {
    if (checked) {
      setSearchableHeaders((prev) => [...prev, value]);
    } else {
      setSearchableHeaders((prev) => prev.filter((header) => header !== value));
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

  return (
    <div className="w-full h-full flex flex-row px-6 pb-6">
      <div className="w-full h-full bg-[#fff] rounded-2xl flex flex-col overflow-auto">
        <TopBar
          showModal={showModal}
          setShowModal={setShowModal}
          modalForm={modalForm}
          setModalForm={setModalForm}
          headers={headers}
          hideColumns={hideColumns}
          setHideColumns={setHideColumns}
          handleHide={handleHide}
          handleSearch={handleSearch}
          searchableHeaders={searchableHeaders}
          handleHeaderSelect={handleHeaderSelect}
          people={people}
        />
        <Table headers={renderHeaders} data={formsToRender} />
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
  hideColumns,
  setHideColumns,
  handleHide,
  handleSearch,
  searchableHeaders,
  handleHeaderSelect,
  people,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="h-[60px] mx-6 border-b justify-center">
      <div className="flex items-center h-full">
        <p className="text-2xl font-bold	">View</p>

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
          <ListHeaderButton
            icon={<LiaUserCircle />}
            label="Person"
            onclick={() => {
              setShowModal(true);
              setModalForm('Person');
            }}
          />
          <ListHeaderButton
            icon={<CiFilter />}
            label="Filter"
            onclick={() => {
              setShowModal(true);
              setModalForm('Filter');
            }}
          />
          <ListHeaderButton
            icon={<MdOutlineSwapVert />}
            label="Sort"
            onclick={() => {
              setShowModal(true);
              setModalForm('Sort');
            }}
          />
          <ListHeaderButton
            icon={<BiHide />}
            label="Hide"
            onclick={() => {
              setShowModal(true);
              setModalForm('Hide');
            }}
          />
          <ShortModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
            }}
            children={
              modalComponents(
                headers,
                hideColumns,
                setHideColumns,
                handleHide,
                people,
              )[modalForm]
            }
          />
        </div>
      </div>
    </div>
  );
};

const modalComponents = (
  headers,
  hideColumns,
  setHideColumns,
  handleHide,
  people,
) => {
  return {
    Hide: (
      <HideModal
        hideArray={headers}
        hideColumns={hideColumns}
        handleHide={handleHide}
      />
    ),
    Person: <PersonModal people={people} />,
  };
};

const Table = ({ headers, data }) => {
  return (
    <div className="w-full h-full flex flex-col max-h-[75vh] px-4 overflow-scroll">
      <div className="w-full flex flex-row px-[2px] pt-[12px] sticky top-0 bg-[#fff] ">
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
      {data.length > 0 ? (
        data.map((row, index) => {
          if (row.length == 0) return null;
          return (
            <div
              className="w-full flex flex-row px-[2px] hover:bg-[#E9E9E9] cursor-pointer"
              key={index + '_cell'}
            >
              {headers.map((header, index) => {
                return (
                  <div
                    className="w-full flex justify-center items-center text-base	font-medium	py-2 border border-[#E9E9E9]"
                    key={index + '_cell'}
                  >
                    {formatValue(row[index]?.value || '--', header)}
                  </div>
                );
              })}
            </div>
          );
        })
      ) : (
        <div className="w-full flex flex-row px-[2px] py-[1px]">
          <div className="w-full flex justify-center items-center text-base	font-medium	mx-[2px] py-2 bg-[#FCF9EE]">
            No Records Found
          </div>
        </div>
      )}
    </div>
  );
};
export default ListView;
