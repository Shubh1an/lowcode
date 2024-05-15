import React, { useEffect, useState } from 'react'
import AddNewButton from '../inputs/AddNewButton';
import { IoSearch } from "react-icons/io5";
import { LiaUserCircle } from "react-icons/lia";
import { CiFilter } from "react-icons/ci";
import { MdOutlineSwapVert } from "react-icons/md";
import { BiHide } from "react-icons/bi";
import ListHeaderButton from '../inputs/ListHeaderButton';
import { getForms } from '../../Requests/form';
import moment from 'moment';
import ShortModal from '../ShortModal/ShortModal';
import HideModal from '../Modals/Hide';
import CustomSearch from '../CustomSearch/CustomSearch';
import PersonModal from '../Modals/PersonModal';

const checkValidDate = (date) => {
  // 2024-05-13T12:21:48.200+00:00
  let isValid = moment(date, 'YYYY-MM-DD', true).isValid();
  if (!isValid) {
    isValid = moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ', true).isValid();
  }
  return isValid
}

const UserPill = ({ user }) => {
  return (
    <div className="flex items-center gap-2 rounded-full bg-[#227A60] p-2 text-[#fff]">
      <img src={user?.profile_image} className='w-8 h-8 rounded-full' />
      <span className="text-14">{user.name}</span>
    </div>
  )
}

const formatValue = (value, header) => {
  if (typeof value === "object") {
    if (header === "created_by") {
      return <UserPill user={value} />
    }
    return "Custom Object"
  }
  else if (checkValidDate(value)) {
    return moment(value).format("DD/MM/YYYY")
  }
  else {
    if (value.length > 20) {
      return value.slice(0, 10) + "..." + value.slice(-5)
    }
    else {
      return value
    }
  }
}

function preprocessSearchData(searchData, searchableHeaders) {
  const hashTable = {};
  // Initialize hash table with empty arrays for each searchable header
  searchableHeaders.forEach(header => {
    hashTable[header] = [];
  });

  // Populate hash table with search data
  searchData.forEach(item => {
    searchableHeaders.forEach(header => {
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
  searchableHeaders.forEach(header => {
    hashTable?.[header]?.forEach(({ item, value }) => {
      if (value.includes(searchTerm)) {
        results.push(item);
      }
    });
  });

  return results;
}

const List = () => {
  const [forms, setForms] = useState([])
  const [formsToRender, setFormsToRender] = useState([])
  const [headers, setHeaders] = useState([])
  const [renderHeaders, setRenderHeaders] = useState([])
  const [hideColumns, setHideColumns] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalForm, setModalForm] = useState(null)
  const [searchableHeaders, setSearchableHeaders] = useState(["name", "category", "description"])
  const [people, setPeoples] = useState({})
  useEffect(() => {
    getForms().then(data => {
      setForms(data.data)
      let headers_gen = Object.keys(data.data[0])
      headers_gen.forEach((header, index) => {
        // if data type is Object, do not show
        if (typeof data.data[0][header] === "object") {
          if (header === "created_by") {

          }
          else {
            headers_gen.splice(index, 1)
          }
        }
        if (header.includes("created_at") || header.includes("updated_at") || header.includes("_id")) {
          headers_gen.splice(index, 1)
        }
      })
      setRenderHeaders([...headers_gen])
      setHeaders([...headers_gen])
    }).catch(err => console.log(err))
  }, [])

  useEffect(() => {
    // Remove hidden columns
    setRenderHeaders(prev => {
      let newHeaders = [...headers]
      hideColumns.forEach(col => {
        newHeaders = newHeaders.filter(header => header !== col)
      })
      return newHeaders
    })
    // Add unhidden columns
  }, [hideColumns, forms])

  useEffect(() => {
  }, [renderHeaders])

  const handleHide = (column, checked) => {
    setHideColumns(prev => {
      if (!checked) {
        return [...prev, column]
      }
      else {
        return prev.filter(col => col !== column)
      }
    })
  }

  const [hashTable, setHashTable] = useState({})

  useEffect(() => {
    setFormsToRender(forms)
    setHashTable(preprocessSearchData(forms, searchableHeaders))
  }, [forms, searchableHeaders])

  const handleSearch = (value) => {
    if (value) {
      const results = search(value, searchableHeaders, hashTable)
      setFormsToRender(results)
    }
    else {
      setFormsToRender(forms)
    }
  }

  const handleHeaderSelect = (value, checked) => {
    if (checked) {
      setSearchableHeaders(prev => [...prev, value])
    }
    else {
      setSearchableHeaders(prev => prev.filter(header => header !== value))
    }
  }
  useEffect(() => {
    formsToRender.forEach((form, index) => {
      let header = Object.keys(form)
      header.forEach(header => {
        if (header == "created_by") {
          let user_id = form[header]?.user_id
          if (!people[user_id]) {
            setPeoples(prev => {
              return { ...prev, [user_id]: form[header] }
            })
          }
        }
      })
    })
  }, [formsToRender])

  return (
    <div className='w-full h-full flex flex-row px-6 pb-6'>
      <div className='w-full h-full bg-[#fff] rounded-2xl flex flex-col overflow-auto'>
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
  )
}

const TopBar = ({ showModal,
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
  people
}) => {
  const [showSearch, setShowSearch] = useState(false)
  return (
    <div className='h-[60px] mx-6 border-b justify-center'>
      <div className='flex items-center h-full'>
        <p className='text-2xl font-bold	'>Fields</p>
        <AddNewButton />
        <div className='flex items-center h-full ml-auto'>

          <CustomSearch
            initialComponent={<ListHeaderButton icon={<IoSearch />} label='Search' onclick={() => { setShowSearch(!showSearch) }} />}
            searchHeaders={searchableHeaders}
            headers={headers}
            searchActive={showSearch}
            setShowSearch={setShowSearch}
            customClass={""}
            handleSearch={handleSearch}
            handleHeaderSelect={(header_label, checked) => {
              handleHeaderSelect(header_label, checked)
            }}
          />
          <ListHeaderButton icon={<LiaUserCircle />} label='Person' onclick={() => { setShowModal(true); setModalForm("Person") }} />
          <ListHeaderButton icon={<CiFilter />} label='Filter' onclick={() => { setShowModal(true); setModalForm("Filter") }} />
          <ListHeaderButton icon={<MdOutlineSwapVert />} label='Sort' onclick={() => { setShowModal(true); setModalForm("Sort") }} />
          <ListHeaderButton icon={<BiHide />} label='Hide' onclick={() => {
            setShowModal(true)
            setModalForm("Hide")
          }} />
          <ShortModal isOpen={showModal} onClose={() => {
            setShowModal(false)
          }} children={
            modalComponents(headers, hideColumns, setHideColumns, handleHide, people)[modalForm]
          } />
        </div>
      </div>
    </div>
  )
}

const modalComponents = (headers, hideColumns, setHideColumns, handleHide, people) => {
  return {
    Hide: <HideModal hideArray={headers} hideColumns={hideColumns} handleHide={handleHide} />,
    Person: <PersonModal people={people} />,
  }
}

const Table = ({ headers, data }) => {
  return (
    <div className='w-full h-full flex flex-col overflow-auto px-4'>
      <div className='w-full flex flex-row px-[2px] pt-[12px] sticky top-0 bg-[#fff]'>
        {headers.map((header, index) => {
          return (
            <div className='w-full flex justify-center items-center text-base	font-medium py-2 border border-[#E9E9E9] overflow-hidden' key={index + "_heading"}>
              {header}
            </div>
          )
        })
        }
      </div>
      {data.length > 0 ? data.map((row, index) => {
        return (
          <div className='w-full flex flex-row px-[2px]'>
            {headers.map((header, index) => {
              return (
                <div className='w-full flex justify-center items-center text-base	font-medium	py-2 border border-[#E9E9E9]' key={index + "_cell"}>
                  {
                    formatValue(row[header], header)
                  }
                </div>
              )
            })
            }
          </div>
        )
      })
        :
        <div className='w-full flex flex-row px-[2px] py-[1px]'>
          <div className='w-full flex justify-center items-center text-base	font-medium	mx-[2px] py-2 bg-[#E9F2EF]'>
            No Records Found
          </div>
        </div>
      }
    </div>
  )
}

export default List