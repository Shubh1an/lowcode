import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PaginatedPages } from '../Requests/page';
import TableView from './Components/MiniComponents/Grid';
import TopBar from './Components/TopBar';

const Pages = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const entity_id = params.get('entity_id');
  const module_id = params.get('module_id');
  const page_id = params.get('page_id');
  console.log(entity_id, 'entity_id', module_id, 'module', page_id, 'page');
  const [hiddenHeaders, setHiddenHeaders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState({
    id: '',
    name: '',
    description: '',
    entity_id: entity_id,
    form_schema: {},
    type: '',
  });
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cells, setCells] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchCriteria, setSearchCriteria] = useState('');
  // const [searchableHeaders, setSearchableHeaders] = useState([
  //   'name',
  //   'category',
  //   'description',
  // ]);
  const [SearchableHeaders, setSearchableHeaders] = useState(headers);
  useEffect(() => {
    fetchPages();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (modalForm.id) {
        //await updatePage(modalForm);
      } else {
        //  await savePage(modalForm);
      }
      setShowModal(false);
      fetchPages();
    } catch (error) {
      console.error('Error saving/updating page:', error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchPages = async (
  //   page = 1,
  //   limit = 4,
  //   sort = { field: 'name', order: 'asc' },
  //   search = { field: '', value: '' },
  //   filter = { field: 'entity_id', value: entity_id },
  // ) => {
  //   console.log('Fetching pages', page);
  //   try {
  //     console.log('Fetching with parameters:', {
  //       page,
  //       limit,
  //       sort,
  //       search,
  //       filter,
  //     });

  //     const variables = { page, limit, sort, search, filter };
  //     console.log('Fetching', variables);
  //     const { pages, totalPages } = await PaginatedPages(variables);

  //     if (pages) {
  //       const headers_gen = Object.keys(pages?.[0] || {}).filter(
  //         (header) =>
  //           header !== '_id' &&
  //           header !== '__v' &&
  //           header !== 'id' &&
  //           header !== 'form_data' &&
  //           header !== '__typename',
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
  const fetchPages = async (
    page = 1,
    limit = 4,
    sort = { field: 'name', order: 'asc' },
    search = { field: '', value: '' },
    filter = { field: 'entity_id', value: entity_id },
  ) => {
    console.log('Fetching pages', page);
    try {
      console.log('Fetching with parameters:', {
        page,
        limit,
        sort,
        search,
        filter,
      });

      const variables = { page, limit, sort, search, filter };
      console.log('Fetching', variables);
      const { pages, totalPages } = await PaginatedPages(variables);

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

  const handleSearch = async (searchCriteria) => {
    try {
      console.log('searchCriteria:', searchCriteria);
      let value = Object.values(searchCriteria)[0];
      // Call fetchModules with searchCriteria and currentPage
      await fetchPages(
        currentPage,
        4,
        { field: sortField, order: sortOrder },
        { field: 'name', value: value },
        { field: 'entity_id', value: entity_id },
      );
      //await fetchPages(searchCriteria, currentPage);
    } catch (error) {
      console.error('Error searching modules:', error);
    }
  };
  // const handlePageChange = (newPage) => {
  //   if (newPage >= 1 && newPage <= totalPages) {
  //     setCurrentPage(newPage);
  //     fetchPages(newPage);
  //   }
  // };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchPages(
        newPage,
        4,
        { field: sortField, order: sortOrder },
        { field: 'name', value: searchCriteria },
        { field: 'entity_id', value: entity_id },
      );
      //fetchPages(newPage, 4, { field: sortField, order: sortOrder }, { field: '', value: '' }, { field: 'entity_id', value: entity_id });
    }
  };

  const handleEditPage = (page) => {
    setModalForm({
      id: page.id,
      name: page.name,
      description: page.description,
      entity_id: page.entity_id,
      form_schema: page.form_schema,
      type: page.type,
    });

    setShowModal(true);
  };

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
          //handleSearch={(value) => fetchPages(currentPage)}
          handleHeaderSelect={() => {}}
          people={{}}
          onNewPage={() => setShowModal(true)}
          entity_id={entity_id}
          isDropDownButton={true}
          onclick={() => {}}
          handleSearch={handleSearch}
          SearchableHeaders={SearchableHeaders}
          setSearchableHeaders={setSearchableHeaders}
          setHiddenHeaders={setHiddenHeaders}
          hiddenHeaders={hiddenHeaders}
          sortField={sortField}
          sortOrder={sortOrder}
          //handleSort={handleSort}
          handleSort={(field, order) => {
            setSortField(field);
            setSortOrder(order);
            fetchPages(
              1,
              4,
              { field, order },
              { field: 'name', value: searchCriteria },
              { field: 'entity_id', value: entity_id },
            );
          }}
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
            onEditPage={handleEditPage}
            hiddenHeaders={hiddenHeaders}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
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
