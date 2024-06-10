// // import React, { useEffect, useState } from 'react';
// // import TopBar from './Components/TopBar';
// // import { getEntities, saveEntity } from '../Requests/entity.js';
// // import TableView from './Components/MiniComponents/Grid';
// // import { createPage } from '../Requests/page';
// // import { type } from '@testing-library/user-event/dist/type';

// // const Entities = () => {
// //     let module_id = location.search.split('module_id=')[1];
// //     const [showModal, setShowModal] = useState(false);
// //     const [modalForm, setModalForm] = useState({
// //         name: '',
// //         description: '',
// //         module_id: module_id,
// //     });
// //     const [headers, setHeaders] = useState([]);
// //     const handleSearch = (value) => { };
// //     const [view, setView] = useState(true);
// //     const [cells, setCells] = useState([]);
// //     const handleSubmit = () => {
// //         console.log(modalForm);
// //         saveEntity(modalForm).then((data) => {
// //             console.log(data);
// //             createPage({
// //                 name: modalForm.name,
// //                 entity_id: data?.data?._id,
// //                 description: "This is the default page for this entity",
// //                 form_schema: {},
// //                 form_data: {},
// //                 type: "default_add",
// //             })
// //             createPage({
// //                 name: modalForm.name,
// //                 entity_id: data?.data?._id,
// //                 description: "This is the default page for this entity",
// //                 form_schema: {},
// //                 form_data: {},
// //                 type: "default_edit",
// //             })
// //             createPage({
// //                 name: modalForm.name,
// //                 entity_id: data?.data?._id,
// //                 description: "This is the default page for this entity",
// //                 form_schema: {},
// //                 form_data: {},
// //                 type: "default_view",
// //             })
// //             setShowModal(false);
// //             fetchEntities();
// //         })
// //     };

// //   const fetchEntities = async () => {
// //     const entity = await getEntities(module_id);
// //     let data = entity?.data;
// //     if (data) {
// //       let headers_gen = Object.keys(data?.[0] || {});
// //       headers_gen.forEach((header, index) => {
// //         if (header === '_id' || header === '__v') {
// //           headers_gen.splice(index, 1);
// //         }
// //       });
// //       setHeaders(headers_gen);
// //       setCells(data);
// //     }
// //   };
// //   useEffect(() => {
// //     fetchEntities();
// //   }, []);

// //     return (
// //         <div className="w-full h-full bg-[#FCF9EE] flex flex-col p-4">
// //             <div className="w-full h-full bg-[#FFF] rounded overflow-auto">
// //                 <TopBar
// //                     label={"Entities"}
// //                     showModal={showModal}
// //                     setShowModal={setShowModal}
// //                     modalForm={modalForm}
// //                     setModalForm={setModalForm}
// //                     headers={headers}
// //                     handleSearch={handleSearch}
// //                     searchableHeaders={headers}
// //                     setView={setView}
// //                     view={view}
// //                     handleSubmit={handleSubmit}
// //                     modalComponent={<ModalComponent closeModal={setShowModal} modalForm={modalForm} setModalForm={setModalForm} handleSubmit={handleSubmit} />}
// //                 />
// //                 <TableView data={{ headers, cells }} linkto={`/builder/pages?module_id=${module_id}&entity_id`} />
// //             </div>
// //         </div>
// //     )
// // }

// // const ModalComponent = ({
// //   closeModal,
// //   modalForm,
// //   setModalForm,
// //   handleSubmit,
// // }) => {
// //   return (
// //     <div className="w-[400px]">
// //       <div className="text-2xl font-bold text-[#000]">Add Entities</div>
// //       <div className="w-full h-[1px] bg-[#E9E9E9]" />
// //       <div className="w-full mt-5">
// //         <p className="mb-2 text-lg font-bold">Entity Name</p>
// //         <input
// //           type="text"
// //           className="border border-[#E9E9E9] rounded-lg w-full py-2 px-4 placeholder-text-[#000] focus:border-[#000] focus:outline-none"
// //           placeholder="Enter Entity Name"
// //           value={modalForm.name}
// //           onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
// //         />
// //       </div>
// //       <div className="w-full mt-5">
// //         <p className="mb-2 text-lg font-bold">Description</p>
// //         <textarea
// //           className="border border-[#E9E9E9] rounded-lg w-full py-2 px-4 placeholder-text-[#000] focus:border-[#000] focus:outline-none "
// //           placeholder="Enter Description"
// //           rows={3}
// //           value={modalForm.description}
// //           onChange={(e) =>
// //             setModalForm({ ...modalForm, description: e.target.value })
// //           }
// //         />
// //       </div>
// //       <div className="flex justify-start items-center mt-5">
// //         <button
// //           className="bg-[#000] text-[#fff] px-4 py-1 rounded-md mr-4 font-bold"
// //           onClick={() => {
// //             handleSubmit();
// //             closeModal();
// //           }}
// //         >
// //           Save
// //         </button>
// //         <button
// //           className="text-[#000] px-4 py-1 rounded-md border border-[#000] font-bold"
// //           onClick={closeModal}
// //         >
// //           Cancel
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Entities;
// import React, { useEffect, useState } from 'react';
// import TopBar from './Components/TopBar';
// import { getEntities, saveEntity, getPaginatedEntities } from '../Requests/entity.js';
// import TableView from './Components/MiniComponents/Grid';
// import { createPage } from '../Requests/page';

// const Entities = () => {
//     let module_id = location.search.split('module_id=')[1];
//     const [showModal, setShowModal] = useState(false);
//     const [modalForm, setModalForm] = useState({
//         name: '',
//         description: '',
//         module_id: module_id,
//     });
//     const [headers, setHeaders] = useState([]);
//     const [view, setView] = useState(true);
//     const [cells, setCells] = useState([]);
//     const [pagination, setPagination] = useState({ page: 1, limit: 10, totalEntities: 0, hasNextPage: false, hasPreviousPage: false });
//     const [sort, setSort] = useState({ field: 'name', order: 'asc' });
//     const [search, setSearch] = useState({});
//     const [filter, setFilter] = useState({});
//     const handleSubmit = async () => {
//         try {
//           console.log('Submit', modalForm);
//           await saveEntity(modalForm);
//             // const data = await saveEntity(modalForm);
//             // await createPage({
//             //     name: modalForm.name,
//             //     entity_id: data.id,
//             //     description: "This is the default page for this entity",
//             //     form_schema: {},
//             //     form_data: {},
//             //     type: "default_add",
//             // });
//             // await createPage({
//             //     name: modalForm.name,
//             //     entity_id: data.id,
//             //     description: "This is the default page for this entity",
//             //     form_schema: {},
//             //     form_data: {},
//             //     type: "default_edit",
//             // });
//             // await createPage({
//             //     name: modalForm.name,
//             //     entity_id: data.id,
//             //     description: "This is the default page for this entity",
//             //     form_schema: {},
//             //     form_data: {},
//             //     type: "default_view",
//             // });
//             setShowModal(false);
//             fetchEntities();
//         } catch (error) {
//             console.error('Error saving entity:', error);
//         }
//     };

//     // const fetchEntities = async () => {
//     //     const data = await getEntities(module_id);
//     //     if (data) {
//     //         const headers_gen = Object.keys(data[0] || {}).filter(header => header !== '_id' && header !== '__v');
//     //         setHeaders(headers_gen);
//     //         setCells(data);
//     //     }
//     // };
//     const fetchEntities = async (page = 1, limit = 4, sort = { field: 'name', order: 'asc' }, search = {}, filter = {}) => {
//       try {
//         const { entities, totalEntities, hasNextPage, hasPreviousPage } = await getPaginatedEntities({ page, limit, sort, search, filter });

//         if (entities) {
//           const headers_gen = Object.keys(entities[0] || {}).filter(header => header !== '_id' && header !== '__v');
//           setHeaders(headers_gen);
//           setCells(entities);
//         }

//         setPagination({ page, limit, totalEntities, hasNextPage, hasPreviousPage });
//       } catch (error) {
//         console.error('Error fetching entities:', error);
//       }
//     };
//     useEffect(() => {
//         fetchEntities();
//     }, []);

//     return (
//         <div className="w-full h-full bg-[#FCF9EE] flex flex-col p-4">
//             <div className="w-full h-full bg-[#FFF] rounded overflow-auto">
//                 <TopBar
//                     label={"Entities"}
//                     showModal={showModal}
//                     setShowModal={setShowModal}
//                     modalForm={modalForm}
//                     setModalForm={setModalForm}
//                     headers={headers}
//                     handleSearch={() => {}}
//                     searchableHeaders={headers}
//                     setView={setView}
//                     view={view}
//                     handleSubmit={handleSubmit}
//                     modalComponent={<ModalComponent closeModal={() => setShowModal(false)} modalForm={modalForm} setModalForm={setModalForm} handleSubmit={handleSubmit} />}
//                 />
//                 <TableView data={{ headers, cells }} linkto={`/builder/pages?module_id=${module_id}&entity_id`} />
//             </div>
//         </div>
//     );
// };

// const ModalComponent = ({ closeModal, modalForm, setModalForm, handleSubmit }) => {
//     return (
//         <div className="w-[400px]">
//             <div className="text-2xl font-bold text-[#000]">Add Entities</div>
//             <div className="w-full h-[1px] bg-[#E9E9E9]" />
//             <div className="w-full mt-5">
//                 <p className="mb-2 text-lg font-bold">Entity Name</p>
//                 <input
//                     type="text"
//                     className="border border-[#E9E9E9] rounded-lg w-full py-2 px-4 placeholder-text-[#000] focus:border-[#000] focus:outline-none"
//                     placeholder="Enter Entity Name"
//                     value={modalForm.name}
//                     onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
//                 />
//             </div>
//             <div className="w-full mt-5">
//                 <p className="mb-2 text-lg font-bold">Description</p>
//                 <textarea
//                     className="border border-[#E9E9E9] rounded-lg w-full py-2 px-4 placeholder-text-[#000] focus:border-[#000] focus:outline-none"
//                     placeholder="Enter Description"
//                     rows={3}
//                     value={modalForm.description}
//                     onChange={(e) => setModalForm({ ...modalForm, description: e.target.value })}
//                 />
//             </div>
//             <div className="flex justify-start items-center mt-5">
//                 <button
//                     className="bg-[#000] text-[#fff] px-4 py-1 rounded-md mr-4 font-bold"
//                     onClick={() => {
//                         handleSubmit();
//                         closeModal();
//                     }}
//                 >
//                     Save
//                 </button>
//                 <button
//                     className="text-[#000] px-4 py-1 rounded-md border border-[#000] font-bold"
//                     onClick={closeModal}
//                 >
//                     Cancel
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Entities;

// import React, { useEffect, useState } from 'react';
// import TopBar from './Components/TopBar';
// import { getPaginatedEntities,saveEntity } from '../Requests/entity.js';
// import TableView from './Components/MiniComponents/Grid';
// import { createPage } from '../Requests/page';
// // import { getEntities, saveEntity, getPaginatedEntities } from '../Requests/entity.js';

// const Entities = () => {
//   let module_id = new URLSearchParams(window.location.search).get('module_id');
//   const [showModal, setShowModal] = useState(false);
//   const [modalForm, setModalForm] = useState({
//     name: '',
//     description: '',
//     module_id: module_id,
//   });
//   const [headers, setHeaders] = useState([]);
//   const [view, setView] = useState(true);
//   const [cells, setCells] = useState([]);
//   const [pagination, setPagination] = useState({ page: 1, limit: 10, totalEntities: 0, hasNextPage: false, hasPreviousPage: false });
//   const [sort, setSort] = useState({ field: 'name', order: 'asc' });
//   const [search, setSearch] = useState({});
//   const [filter, setFilter] = useState({});

//   const handleSubmit = async () => {
//     try {
//       const data = await saveEntity(modalForm);
//       // await createPage({
//       //   name: modalForm.name,
//       //   entity_id: data.id,
//       //   description: "This is the default page for this entity",
//       //   form_schema: {},
//       //   form_data: {},
//       //   type: "default_add",
//       // });
//       // await createPage({
//       //   name: modalForm.name,
//       //   entity_id: data.id,
//       //   description: "This is the default page for this entity",
//       //   form_schema: {},
//       //   form_data: {},
//       //   type: "default_edit",
//       // });
//       // await createPage({
//       //   name: modalForm.name,
//       //   entity_id: data.id,
//       //   description: "This is the default page for this entity",
//       //   form_schema: {},
//       //   form_data: {},
//       //   type: "default_view",
//       // });
//       setShowModal(false);
//       fetchEntities();
//     } catch (error) {
//       console.error('Error saving entity:', error);
//     }
//   };

//   const fetchEntities = async (page = 1, limit = 10, sort = { field: 'name', order: 'asc' }, search = {}, filter = {}) => {
//     try {
//       const { entities, totalEntities, hasNextPage, hasPreviousPage } = await getPaginatedEntities({ page, limit, sort, search, filter });

//       if (entities) {
//         const headers_gen = Object.keys(entities[0] || {}).filter(header => header !== '_id' && header !== '__v');
//         setHeaders(headers_gen);
//         setCells(entities);
//       }

//       setPagination({ page, limit, totalEntities, hasNextPage, hasPreviousPage });
//     } catch (error) {
//       console.error('Error fetching entities:', error);
//     }
//   };

//   useEffect(() => {
//     fetchEntities();
//   }, []);

//   return (
//     <div className="w-full h-full bg-[#FCF9EE] flex flex-col p-4">
//       <div className="w-full h-full bg-[#FFF] rounded overflow-auto">
//         <TopBar
//           label={"Entities"}
//           showModal={showModal}
//           setShowModal={setShowModal}
//           modalForm={modalForm}
//           setModalForm={setModalForm}
//           headers={headers}
//           handleSearch={(value) => setSearch({ name: value })} // Example search by name
//           searchableHeaders={headers}
//           setView={setView}
//           view={view}
//           handleSubmit={handleSubmit}
//           modalComponent={<ModalComponent closeModal={() => setShowModal(false)} modalForm={modalForm} setModalForm={setModalForm} handleSubmit={handleSubmit} />}
//         />
//         <TableView data={{ headers, cells }} linkto={`/builder/pages?module_id=${module_id}&entity_id`} />
//         {/* Add pagination controls here */}
//         <div className="pagination-controls">
//           {pagination.hasPreviousPage && <button onClick={() => fetchEntities(pagination.page - 1, pagination.limit, sort, search, filter)}>Previous</button>}
//           {pagination.hasNextPage && <button onClick={() => fetchEntities(pagination.page + 1, pagination.limit, sort, search, filter)}>Next</button>}
//         </div>
//       </div>
//     </div>
//   );
// };

// const ModalComponent = ({ closeModal, modalForm, setModalForm, handleSubmit }) => {
//   return (
//     <div className="w-[400px]">
//       <div className="text-2xl font-bold text-[#000]">Add Entities</div>
//       <div className="w-full h-[1px] bg-[#E9E9E9]" />
//       <div className="w-full mt-5">
//         <p className="mb-2 text-lg font-bold">Entity Name</p>
//         <input
//           type="text"
//           className="border border-[#E9E9E9] rounded-lg w-full py-2 px-4 placeholder-text-[#000] focus:border-[#000] focus:outline-none"
//           placeholder="Enter Entity Name"
//           value={modalForm.name}
//           onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
//         />
//       </div>
//       <div className="w-full mt-5">
//         <p className="mb-2 text-lg font-bold">Description</p>
//         <textarea
//           className="border border-[#E9E9E9] rounded-lg w-full py-2 px-4 placeholder-text-[#000] focus:border-[#000] focus:outline-none"
//           placeholder="Enter Description"
//           rows={3}
//           value={modalForm.description}
//           onChange={(e) => setModalForm({ ...modalForm, description: e.target.value })}
//         />
//       </div>
//       <div className="flex justify-start items-center mt-5">
//         <button
//           className="bg-[#000] text-[#fff] px-4 py-1 rounded-md mr-4 font-bold"
//           onClick={() => {
//             handleSubmit();
//             closeModal();
//           }}
//         >
//           Save
//         </button>
//         <button
//           className="text-[#000] px-4 py-1 rounded-md border border-[#000] font-bold"
//           onClick={closeModal}
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Entities;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from './Components/TopBar';
import { getPaginatedEntities, saveEntity } from '../Requests/entity';
import TableView from './Components/MiniComponents/Grid';
import { createPage } from '../Requests/page';

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

  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log('Submit', modalForm);
      const data = await saveEntity(modalForm);
      // Additional page creation logic can be added here if needed
      setShowModal(false);
      fetchEntities({}, currentPage);
    } catch (error) {
      console.error('Error saving entity:', error);
    } finally {
      setLoading(false);
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
          (header) => header !== '_id' && header !== '__v',
        );
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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchEntities({}, newPage);
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
          handleSearch={(value) => fetchEntities({ name: value }, currentPage)}
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
