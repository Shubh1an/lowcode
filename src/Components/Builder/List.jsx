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

const checkValidDate = (date) => {
  // 2024-05-13T12:21:48.200+00:00
  let isValid = moment(date, 'YYYY-MM-DD', true).isValid();
  if (!isValid) {
    isValid = moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ', true).isValid();
  }
  return isValid
}

const formatValue = (value) => {
  if (typeof value === "object") {
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

const List = () => {
  const [forms, setForms] = useState([])
  const [headers, setHeaders] = useState([])
  const [renderHeaders, setRenderHeaders] = useState([])
  const [hideColumns, setHideColumns] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalForm, setModalForm] = useState(null)
  useEffect(() => {
    getForms().then(data => {
      setForms(data.data)
      let headers_gen = Object.keys(data.data[0])
      headers_gen.forEach((header, index) => {
        // if data type is Object, do not show
        if (typeof data.data[0][header] === "object") {
          headers_gen.splice(index, 1)
        }
      })
      setRenderHeaders(headers_gen)
      setHeaders(headers_gen)
    }).catch(err => console.log(err))
  }, [])

  useEffect(() => {
    let lastRenderHeaders = renderHeaders
    lastRenderHeaders.forEach((header, index) => {
      if (hideColumns.includes(header)) {
        lastRenderHeaders.splice(index, 1)
      }
    })
    setRenderHeaders(lastRenderHeaders)
  }, [hideColumns, forms])

  return (
    <div className='w-full h-full flex flex-row px-6 pb-6'>
      <div className='w-full h-full bg-[#fff] rounded-2xl flex flex-col overflow-auto'>
        <TopBar showModal={showModal} setShowModal={setShowModal} modalForm={modalForm} setModalForm={setModalForm} headers={headers} hideColumns={hideColumns} setHideColumns={setHideColumns} />
        <Table headers={renderHeaders} data={forms} />
      </div>
    </div>
  )
}

const TopBar = ({ showModal, setShowModal, modalForm, setModalForm, headers, hideColumns, setHideColumns }) => {
  return (
    <div className='h-[60px] mx-6 border-b justify-center'>
      <div className='flex items-center h-full'>
        <p className='text-2xl font-bold	'>Fields</p>
        <AddNewButton />
        <div className='flex items-center h-full ml-auto'>

          <ListHeaderButton icon={<IoSearch />} label='Search' onclick={() => { setShowModal(true); setModalForm("Search") }} />
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
            modalComponents(headers, hideColumns, setHideColumns)[modalForm]
          } />
        </div>
      </div>
    </div>
  )
}

const modalComponents = (headers, hideColumns, setHideColumns) => {
  return {
    Hide: <HideModal hideArray={headers} hideColumns={hideColumns} handleHide={(column, checked) => {
      let newHideColumns = [...hideColumns]
      if (checked) {
        newHideColumns.push(column)
      }
      else {
        newHideColumns.splice(newHideColumns.indexOf(column), 1)
      }
      setHideColumns(newHideColumns)
    }} />,
  }
}

const Table = ({ headers, data }) => {
  return (
    <div className='w-full h-full flex flex-col overflow-auto '>
      <div className='w-full flex flex-row px-[2px] py-[12px] sticky top-0 bg-[#fff]'>
        {headers.map((header, index) => {
          return (
            <div className='w-full flex justify-center items-center text-base	font-medium	mx-[2px] py-2 bg-[#E9F2EF]' key={index + "_heading"}>
              {header}
            </div>
          )
        })
        }
      </div>
      {data.map((row, index) => {
        return (
          <div className='w-full flex flex-row px-[2px] py-[1px]'>
            {headers.map((header, index) => {
              return (
                <div className='w-full flex justify-center items-center text-base	font-medium	mx-[2px] py-2 bg-[#E9F2EF]' key={index + "_cell"}>
                  {
                    formatValue(row[header])
                  }
                </div>
              )
            })
            }
          </div>
        )
      })}
    </div>
  )
}

export default List