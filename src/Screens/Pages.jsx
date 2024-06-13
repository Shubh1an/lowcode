// import React, { useEffect, useState } from 'react';
// import TopBar from './Components/TopBar';
// import { getPages } from '../Requests/page';
// import TableView from './Components/MiniComponents/Grid';

// const Pages = () => {
//   const [forms, setForms] = useState([]);
//   const [formsToRender, setFormsToRender] = useState([]);
//   const [headers, setHeaders] = useState([]);
//   const [renderHeaders, setRenderHeaders] = useState([]);
//   const [hideColumns, setHideColumns] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalForm, setModalForm] = useState(null);
//   const [searchableHeaders, setSearchableHeaders] = useState([
//     'name',
//     'category',
//     'description',
//   ]);
//   const [cells, setCells] = useState([]);
//   const [people, setPeoples] = useState({});
//   let entity_id = location.search.split('entity_id=')[1];
//   let module_id = location.search.split('module_id=')[1];
//   const handleHide = (column, checked) => {};
//   const handleSearch = (value) => {};

//   const handleHeaderSelect = (value, checked) => {};

//   const handleAddNewPage = (id, type) => {};

//   const addPage = (data) => {
//     console.log('Clicked: ', data);
//   };

//   const fetchPages = () => {
//     getPages(entity_id).then((res) => {
//       let { data } = res;
//       let headers_gen = Object.keys(data?.[0] || {});
//       headers_gen.forEach((header, index) => {
//         if (header === '_id' || header === '__v') {
//           headers_gen.splice(index, 1);
//         }
//       });
//       setHeaders(headers_gen);
//       setCells(data);
//     });
//   };

//   useEffect(() => {
//     fetchPages();
//   }, []);

//   return (
//     <div className="w-full h-full bg-[#FCF9EE] flex flex-col p-4">
//       <div className="w-full h-full bg-[#FFF] rounded overflow-auto">
//         <TopBar
//           label="Pages"
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
//           onNewPage={handleAddNewPage}
//           entity_id={entity_id}
//           isDropDownButton={true}
//           onclick={addPage}
//         />
//         <TableView
//           data={{ headers: headers, cells: cells }}
//           linkto={`/builder/editor?module_id=${module_id}&editor_id`}
//         />
//       </div>
//     </div>
//   );
// };

// export default Pages;
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  PaginatedPages,
  savePage,
  getPaginatedNewPages,
} from '../Requests/page';
import TableView from './Components/MiniComponents/Grid';
import TopBar from './Components/TopBar';

const Pages = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const entity_id = params.get('entity_id');
  const module_id = params.get('module_id');
  const page_id = params.get('page_id');
  // console.log(entity_id , "entity_id", module_id, "module",page_id, "page");

  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState({
    id: '',
    name: '',
    description: '',
    entity_id: entity_id,
    form_schema: [],
    form_data: {},
    type: '',
  });
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cells, setCells] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchableHeaders, setSearchableHeaders] = useState([
    'name',
    'category',
    'description',
  ]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (modalForm.id) {
        //await updatePage(modalForm);
      } else {
        await savePage(modalForm);
      }
      setShowModal(false);
      fetchPages();
    } catch (error) {
      console.error('Error saving/updating page:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPages = async (
    page = 1,
    limit = 10,
    sort = { field: 'name', order: 'asc' },
    search = { field: '', value: '' },
    filter = { field: 'entity_id', value: entity_id },
  ) => {
    try {
      console.log('Fetching with parameters:', {
        page,
        limit,
        sort,
        search,
        filter,
      });
      const variables = { page, limit, sort, search, filter };
      const { pages, totalPages } = await getPaginatedNewPages(variables);

      if (pages) {
        const headers_gen = Object.keys(pages?.[0] || {}).filter(
          (header) =>
            header !== '_id' &&
            header !== '__v' &&
            header !== 'id' &&
            header !== 'form_data' &&
            header !== '__typename',
        );
        setHeaders(headers_gen);
        setCells(pages);
        setTotalPages(Math.ceil(totalPages / variables.limit));
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchPages = async () => {
  //    try {
  //       console.log('Fetchinentity_id', entity_id);
  //     const variables = {
  //       "page": 1,
  //         "limit": 10,
  //         "sort": {
  //           "field": "name",
  //           "order": "asc"
  //         },
  //         "search": {
  //           "field": "",
  //           "value": ""
  //         },
  //         "filter": {
  //           "field": "entity_id",
  //           "value": "6663ff145e0e219c18b665a1"

  //         } // Update filter to use the entity_id variable
  //     };
  //     const { pages, totalPages }=    await PaginatedPages({...variables})

  //     if (pages) {
  //       const headers_gen = Object.keys(pages?.[0] || {}).filter(
  //         (header) => header !== '_id' && header !== '__v',
  //       );
  //       setHeaders(headers_gen);
  //       setCells(pages);
  //       setTotalPages(Math.ceil(totalPages / variables.limit));
  //     }
  //   } catch (error) {
  //     console.error('Error fetching pages:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchPages({}, newPage);
    }
  };

  const handleEditPage = (page) => {
    setModalForm({
      id: page.id,
      name: page.name,
      description: page.description,
      entity_id: page.entity_id,
      form_schema: page.form_schema,
      form_data: page.form_data,
      type: page.type,
    });
    setShowModal(true);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    // console.log("entity_id1 :" entity_id);
    console.log(entity_id, 'entity_id', module_id, 'module', page_id, 'page');
  }, []);
  return (
    <div className="w-full h-full bg-[#FCF9EE] flex flex-col p-4">
      <div className="w-full h-full bg-[#FFF] rounded overflow-auto">
        <TopBar
          label="Pages"
          showModal={showModal}
          setShowModal={setShowModal}
          modalForm={modalForm}
          setModalForm={setModalForm}
          headers={headers}
          hideColumns={[]}
          setHideColumns={() => {}}
          handleHide={() => {}}
          handleSearch={(value) => fetchPages({ name: value }, currentPage)}
          searchableHeaders={searchableHeaders}
          handleHeaderSelect={() => {}}
          people={{}}
          onNewPage={() => setShowModal(true)}
          entity_id={entity_id}
          isDropDownButton={true}
          onclick={() => {}}
        />
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <p>Loading...</p>
          </div>
        ) : (
          <TableView
            data={{ headers, cells }}
            // linkto={`/builder/editor?module_id=${module_id}&editor_id`}
            linkto={`/builder/editor?module_id=${module_id}&entity_id=${entity_id}&page_id`}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onEditPage={handleEditPage}
          />
        )}
      </div>
      {showModal && (
        <ModalComponent
          closeModal={setShowModal}
          modalForm={modalForm}
          setModalForm={setModalForm}
          handleSubmit={handleSubmit}
        />
      )}
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
      <div className="text-2xl font-bold text-[#000]">
        {modalForm.id ? 'Update Page' : 'Add Page'}
      </div>
      <div className="w-full h-[1px] bg-[#E9E9E9]" />
      <div className="w-full mt-5">
        <p className="mb-2 text-lg">Modal Content Goes Here</p>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={() => closeModal(false)}>Close</button>
      </div>
    </div>
  );
};

export default Pages;
