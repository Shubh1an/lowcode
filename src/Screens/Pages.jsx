import React, { useEffect, useState } from 'react'
import TopBar from './Components/TopBar'
import { getPages } from '../Requests/page';
import TableView from './Components/MiniComponents/Grid';

const Pages = () => {
    const [forms, setForms] = useState([]);
    const [formsToRender, setFormsToRender] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [renderHeaders, setRenderHeaders] = useState([]);
    const [hideColumns, setHideColumns] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalForm, setModalForm] = useState(null);
    const [searchableHeaders, setSearchableHeaders] = useState([
        'name',
        'category',
        'description',
    ]);
    const [cells, setCells] = useState([]);
    const [people, setPeoples] = useState({});
    let entity_id = location.search.split('entity_id=')[1];
    let module_id = location.search.split('module_id=')[1];
    const handleHide = (column, checked) => {
    };
    const handleSearch = (value) => {
    };

    const handleHeaderSelect = (value, checked) => {
    };

    const handleAddNewPage = (id, type) => {
    };

    const addPage = (data) => {
        console.log("Clicked: ", data);
    }

    const fetchPages = () => {
        getPages(entity_id).then((res) => {
            let { data } = res;
            let headers_gen = Object.keys(data?.[0] || {});
            headers_gen.forEach((header, index) => {
                if (header === '_id' || header === '__v') {
                    headers_gen.splice(index, 1);
                }
            });
            setHeaders(headers_gen);
            setCells(data);
        })
    }

    useEffect(() => {
        fetchPages();
    }, [])


    return (
        <div className="w-full h-full bg-[#FCF9EE] flex flex-col p-4">
            <div className="w-full h-full bg-[#FFF] rounded overflow-auto">
                <TopBar
                    label='Pages'
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
                    onNewPage={handleAddNewPage}
                    entity_id={entity_id}
                    isDropDownButton={true}
                    onclick={addPage}
                />
                <TableView data={{ headers: headers, cells: cells }} linkto={`/builder/editor?module_id=${module_id}&editor_id`}/>
            </div>
        </div>
    )
}

export default Pages