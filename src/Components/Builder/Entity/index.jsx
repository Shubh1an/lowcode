import React, { useState } from 'react'
import AddNewButton from '../../inputs/AddNewButton';
import CustomSearch from '../../CustomSearch/CustomSearch';
import ListHeaderButton from '../../inputs/ListHeaderButton';
import { IoSearch } from 'react-icons/io5';
import ShortModal from '../../ShortModal/ShortModal';
import { ChangeViewBtn } from '../../Buttons/ChangeViewBtn';

const Entity = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalForm, setModalForm] = useState({})
    const [headers, setHeaders] = useState([])
    const [view, setView] = useState(true)

    const handleSearch = (value) => { };
    return (
        <div className="w-full h-full bg-[#E9F2EF] flex justify-center items-center px-6 py-6 ">
            <div className="w-full h-full bg-[#FFF] rounded-2xl">
                <TopBar
                    showModal={showModal}
                    setShowModal={setShowModal}
                    modalForm={modalForm}
                    setModalForm={setModalForm}
                    headers={headers}
                    handleSearch={handleSearch}
                    searchableHeaders={headers}
                    setView={setView}
                    view={view}
                />
            </div>
        </div>
    )
}

const TopBar = ({
    showModal,
    setShowModal,
    modalForm,
    setModalForm,
    headers,
    handleSearch,
    searchableHeaders,
    setView,
    view
}) => {
    const [showSearch, setShowSearch] = useState(false);
    return (
        <div className="h-[60px] mx-6 border-b justify-center">
            <div className="flex items-center h-full">
                <p className="text-2xl font-bold">Entities</p>
                <AddNewButton onclick={() => setShowModal(!showModal)} />
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
                    />
                    <ChangeViewBtn onclick={() => {
                        setView(!view)
                    }} view={view} />
                    <ShortModal
                        isOpen={showModal}
                        onClose={() => {
                            setShowModal(false);
                        }}
                        children={
                            <ModalComponent closeModal={() => setShowModal(false)} />
                        }
                    />
                </div>
            </div>
        </div>
    );
};
const ModalComponent = ({closeModal}) => {
    return (
        <div className="w-[400px]">
            <div className="text-2xl font-bold text-[#227A60]">Add Entities</div>
            <div className="w-full h-[1px] bg-[#E9E9E9]" />
            <div className="w-full mt-5">
                <p className="mb-2 text-lg font-bold">Entity Name</p>
                <input
                    type="text"
                    className="border border-[#E9E9E9] rounded-lg w-full py-2 px-4 placeholder-text-[#227A60] focus:border-[#227A60] focus:outline-none"
                    placeholder="Enter Entity Name"
                />
            </div>
            <div className="w-full mt-5">
                <p className="mb-2 text-lg font-bold">Description</p>
                <textarea
                    className="border border-[#E9E9E9] rounded-lg w-full py-2 px-4 placeholder-text-[#227A60] focus:border-[#227A60] focus:outline-none "
                    placeholder="Enter Description"
                    rows={3}
                />
            </div>
            <div className="flex justify-start items-center mt-5">
                <button
                    className="bg-[#227A60] text-[#fff] px-4 py-1 rounded-md mr-4 font-bold"
                    onClick={() => { }}
                >
                    Save
                </button>
                <button className="text-[#227A60] px-4 py-1 rounded-md border border-[#227A60] font-bold" onClick={closeModal}>
                    Cancel
                </button>
            </div>
        </div>
    )
};

export default Entity