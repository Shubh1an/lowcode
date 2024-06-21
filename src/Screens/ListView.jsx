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
import { getFilledData, getPaginatedFilledData } from '../Graphql/modelQuery';
import { useLocation } from 'react-router-dom';
import TableView from './Components/MiniComponents/Grid';
const ListView = () => {
  let page_id = location.search.split('=')[1];
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // debugger;
  // const page_id = params.get('id');
  const [forms, setForms] = useState([]);
  const [formsToRender, setFormsToRender] = useState([]);
  const [renderHeaders, setRenderHeaders] = useState([]);
  const [hideColumns, setHideColumns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchableHeaders, setSearchableHeaders] = useState([
    'name',
    'category',
    'description',
  ]);
  const [people, setPeoples] = useState({});

  const [page_detail_id, setPage_detail_id] = useState('');
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // const getviewPage = async (page_id) => {
  //   try {
  //     debugger;
  //     const res = await getFilledData(page_id);
  //     console.log('dhvh', res);
  //     let high_index = 0;
  //     let high_length = 0;
  //     let form_data = res.getFilledData;
  //     let data_array = form_data.map((data, index) => {
  //       if (data?.form_data?.length > high_length) {
  //         high_index = index;
  //         high_length = data?.form_data?.length;
  //       }
  //       return data.form_data;
  //     });
  //     setHeaders(form_data[high_index || 0]?.form_data.map((dt) => dt.key));
  //     setRenderHeaders(
  //       form_data[high_index || 0]?.form_data.map((dt) => dt.key),
  //     );
  //     setData(data_array);
  //     setForms(data_array);
  //     setFormsToRender(data_array);
  //   } catch (err) {
  //     console.log('object', err);
  //   }
  // };
  const getviewPage = async (
    page_id,
    search = { field: '', value: '' },
    page = 1,
    limit = 4,
    sort = { field: 'page_id', order: 'asc' },
  ) => {
    try {
      const variables = {
        page,
        limit,
        sort,
        search,
        filter: { field: 'page_id', value: page_id },
      };
      debugger;
      console.log('Fetching data with variables:', variables);
      const res = await getPaginatedFilledData(variables);
      console.log('Fetched data:', res);

      const filledData = res.filledData;
      const high_index = filledData.reduce(
        (maxIdx, curr, idx, arr) =>
          curr.form_data.length > arr[maxIdx].form_data.length ? idx : maxIdx,
        0,
      );

      const headers =
        filledData[high_index]?.form_data.map((dt) => dt.key) || [];
      //const data_array = filledData.map((data) => data.form_data);
      const data_array = filledData.map((data) => {
        const row = {};
        data.form_data.forEach((item) => {
          row[item.key] = item.value;
        });
        return row;
      });
      debugger;
      setHeaders(headers);
      setRenderHeaders(headers);
      setData(data_array);
      setForms(data_array);
      setFormsToRender(data_array);
      setTotalPages(res.totalPages);
      setCurrentPage(page);
    } catch (err) {
      console.log('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };
  // const handlePageChange = (newPage) => {
  //   // Ensure the new page is within the valid range
  //   if (newPage < 1 || newPage > totalPages) return;

  //   // Call the getviewPage function with the new page number
  //   getviewPage('your_page_id', { field: 'name', value: 'searchValue' }, newPage, 10, { field: 'page_id', order: 'asc' });
  // };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      getviewPage(page_id, {}, newPage, 4, { field: 'page_id', order: 'asc' });
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

  //useEffect(() => { }, [renderHeaders]);

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
    //setHashTable(preprocessSearchData(forms, searchableHeaders));
  }, [forms, searchableHeaders]);

  const handleSearch = (value) => {
    if (value) {
      //const results = search(value, searchableHeaders, hashTable);
      /// setFormsToRender(results);
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
        <TableView
          data={{ headers: renderHeaders, cells: formsToRender }}
          linkto={'/builder/listview?id'}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        {/* <Table headers={renderHeaders} data={formsToRender} /> */}
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

// import { useEffect, useState } from 'react';
// import { BiHide } from 'react-icons/bi';
// import { CiFilter } from 'react-icons/ci';
// import { IoSearch } from 'react-icons/io5';
// import { LiaUserCircle } from 'react-icons/lia';
// import { MdOutlineSwapVert } from 'react-icons/md';
// import HideModal from '../Components/Modals/Hide';
// import PersonModal from '../Components/Modals/PersonModal';
// import { formatValue } from '../Utility/utility';
// import CustomSearch from './Components/MiniComponents/CustomSearch';
// import ListHeaderButton from './Components/MiniComponents/ListHeaderButton';
// import ShortModal from './Components/MiniComponents/ShortModal';
// import { getPaginatedFilledData } from '../Graphql/modelQuery';
// import TableView from './Components/MiniComponents/Grid';
// import TopBar from './Components/TopBar';
// import { useLocation } from 'react-router-dom';
// const ListView = () => {
//   const location = useLocation();
//   let page_id = location.search.split('=')[1];

//   const [forms, setForms] = useState([]);
//   const [formsToRender, setFormsToRender] = useState([]);
//   const [renderHeaders, setRenderHeaders] = useState([]);
//   const [hideColumns, setHideColumns] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalForm, setModalForm] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchableHeaders, setSearchableHeaders] = useState([
//     'name',
//     'category',
//     'description',
//   ]);

//   const [people, setPeoples] = useState({});

//   const [page_detail_id, setPage_detail_id] = useState('');
//   const [headers, setHeaders] = useState([]);
//   const [data, setData] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [sortField, setSortField] = useState('page_id');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [hiddenHeaders, setHiddenHeaders] = useState([]);
//   // const getviewPage = async (
//   //   page_id,
//   //   search = { field: '', value: '' },
//   //   page = 1,
//   //   limit = 4,
//   //   sort = { field: 'page_id', order: 'asc' },
//   // ) => {
//   //   try {
//   //     const variables = {
//   //       page,
//   //       limit,
//   //       sort,
//   //       search,
//   //       filter: { field: 'page_id', value: page_id },
//   //     };
//   //     console.log('Fetching data with variables:', variables);
//   //     const res = await getPaginatedFilledData(variables);
//   //     console.log('Fetched data:', res);

//   //     const filledData = res.filledData;
//   //     const high_index = filledData.reduce(
//   //       (maxIdx, curr, idx, arr) =>
//   //         curr.form_data.length > arr[maxIdx].form_data.length ? idx : maxIdx,
//   //       0,
//   //     );

//   //     const headers =
//   //       filledData[high_index]?.form_data.map((dt) => dt.key) || [];
//   //     const data_array = filledData.map((data) => {
//   //       const row = {};
//   //       data.form_data.forEach((item) => {
//   //         row[item.key] = item.value;
//   //       });
//   //       return row;
//   //     });

//   //     setHeaders(headers);
//   //     setRenderHeaders(headers);
//   //     setData(data_array);
//   //     setForms(data_array);
//   //     setFormsToRender(data_array);
//   //     setTotalPages(res.totalPages);
//   //     setCurrentPage(page);
//   //   } catch (err) {
//   //     console.log('Error fetching data:', err);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const handlePageChange = (newPage) => {
//   //   if (newPage >= 1 && newPage <= totalPages) {
//   //     setCurrentPage(newPage);
//   //     getviewPage(page_id, {}, newPage, 4, { field: sortField, order: sortOrder });
//   //   }
//   // };

//   const getviewPage = async (
//     page_id,
//     search = { field: '', value: '' },
//     page = 1,
//     limit = 4,
//     sort = { field: 'page_id', order: 'asc' }
//   ) => {
//     try {
//       const variables = {
//         page,
//         limit,
//         sort,
//         search,
//         filter: { field: 'page_id', value: page_id },
//       };
//       console.log('Fetching data with variables:', variables);
//       const res = await getPaginatedFilledData(variables);
//       console.log('Fetched data:', res);

//       const filledData = res.filledData;
//       const high_index = filledData.reduce(
//         (maxIdx, curr, idx, arr) =>
//           curr.form_data.length > arr[maxIdx].form_data.length ? idx : maxIdx,
//         0
//       );

//       const headers =
//         filledData[high_index]?.form_data.map((dt) => dt.key) || [];
//       const data_array = filledData.map((data) => {
//         const row = {};
//         data.form_data.forEach((item) => {
//           row[item.key] = item.value;
//         });
//         return row;
//       });

//       setHeaders(headers);
//       setRenderHeaders(headers);
//       setData(data_array);
//       setForms(data_array);
//       setFormsToRender(data_array);
//       setTotalPages(res.totalPages);
//       setCurrentPage(page);
//     } catch (err) {
//       console.log('Error fetching data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//       getviewPage(page_id, {}, newPage, 4, { field: sortField, order: sortOrder });
//     }
//   };

//   const handleSearch = async (searchCriteria) => {
//     try {
//       console.log('searchCriteria:', searchCriteria);
//       await getviewPage(page_id, searchCriteria, currentPage);
//     } catch (error) {
//       console.error('Error searching modules:', error);
//     }
//   };

//   useEffect(() => {
//     getviewPage(page_id);
//   }, [page_id]);

//   useEffect(() => {
//     setRenderHeaders((prev) => {
//       let newHeaders = [...headers];
//       hideColumns.forEach((col) => {
//         newHeaders = newHeaders.filter((header) => header !== col);
//       });
//       return newHeaders;
//     });
//   }, [hideColumns, forms]);

//   const handleHide = (column, checked) => {
//     setHideColumns((prev) => {
//       if (!checked) {
//         return [...prev, column];
//       } else {
//         return prev.filter((col) => col !== column);
//       }
//     });
//   };

//   const [hashTable, setHashTable] = useState({});

//   useEffect(() => {
//     setFormsToRender(forms);
//   }, [forms, searchableHeaders]);

//   const handleHeaderSelect = (value, checked) => {
//     if (checked) {
//       setSearchableHeaders((prev) => [...prev, value]);
//     } else {
//       setSearchableHeaders((prev) => prev.filter((header) => header !== value));
//     }
//   };

//   useEffect(() => {
//     formsToRender.forEach((form) => {
//       let header = Object.keys(form);
//       header.forEach((header) => {
//         if (header === 'created_by') {
//           let user_id = form[header]?.user_id;
//           if (!people[user_id]) {
//             setPeoples((prev) => {
//               return { ...prev, [user_id]: form[header] };
//             });
//           }
//         }
//       });
//     });
//   }, [formsToRender]);

//   return (
//     <div className="w-full h-full flex flex-row px-6 pb-6">
//       <div className="w-full h-full bg-[#fff] rounded-2xl flex flex-col overflow-auto">
//         <TopBar
//           showModal={showModal}
//           setShowModal={setShowModal}
//           modalForm={modalForm}
//           setModalForm={setModalForm}
//           headers={headers}
//           hideColumns={hideColumns}
//           setHideColumns={setHideColumns}
//           handleHide={handleHide}
//           handleSearch={handleSearch}
//           searchableHeaders={searchableHeaders}
//           handleHeaderSelect={handleHeaderSelect}
//           people={people}
//           sortField={sortField}
//           sortOrder={sortOrder}
//           handleSort={(field, order) => {
//             setSortField(field);
//             setSortOrder(order);
//             getviewPage(page_id, {}, 1, 4, { field, order });
//           }}
//           setHiddenHeaders={setHiddenHeaders}
//           hiddenHeaders={hiddenHeaders}
//         />
//         {loading ? (
//           <div className="w-full h-full flex items-center justify-center">
//             <p>Loading...</p>
//           </div>
//         ) : (
//           <TableView
//             data={{ headers: renderHeaders, cells: formsToRender }}
//             linkto={'/builder/listview?id'}
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={handlePageChange}
//             hiddenHeaders={hiddenHeaders}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ListView;
