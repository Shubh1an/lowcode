import React from 'react'
import AddNewButton from '../inputs/AddNewButton';
import { IoSearch } from "react-icons/io5";
import { LiaUserCircle } from "react-icons/lia";
import { CiFilter } from "react-icons/ci";
import { MdOutlineSwapVert } from "react-icons/md";
import { BiHide } from "react-icons/bi";
import ListHeaderButton from '../inputs/ListHeaderButton';




const List = () => {
  const headers = ["Thumbnail", "Title", "Created By", "Created Date", "Updated By", "Updated Date", "Company ID", "Org. ID"]
  const data = [[]]
  for (let i = 0; i < 30; i++) {
    // Generate dummy data for each row
    const dummyRow = [
      `Thumbnail ${i}`,
      `Title ${i}`,
      `Creator ${i}`,
      new Date().toISOString().slice(0, 10), // Date in YYYY-MM-DD format
      `Updater ${i}`,
      new Date().toISOString().slice(0, 10), // Dummy updated date
      `Company ${i}`,
      `Org ${i}`
    ];

    // Push the dummy row into the data array
    data.push(dummyRow);
  }
  return (
    <div className='w-full h-full flex flex-row px-6 pb-6'>
      <div className='w-full h-full bg-[#fff] rounded-2xl flex flex-col overflow-auto'>
        <TopBar />
        <Table headers={headers} data={data} />
      </div>
    </div>
  )
}

const TopBar = () => {
  return (
    <div className='h-[60px] mx-6 border-b justify-center'>
      <div className='flex items-center h-full'>
        <p className='text-2xl font-bold	'>Fields</p>
        <AddNewButton />
        <div className='flex items-center h-full ml-auto'>
          <ListHeaderButton icon={<IoSearch />} label='Search' />
          <ListHeaderButton icon={<LiaUserCircle />} label='Person' />
          <ListHeaderButton icon={<CiFilter />} label='Filter' />
          <ListHeaderButton icon={<MdOutlineSwapVert />} label='Sort' />
          <ListHeaderButton icon={<BiHide />} label='Hide' />
        </div>
      </div>
    </div>
  )
}

const Table = ({ headers, data }) => {
  return (
    <div className='w-full h-full flex flex-col overflow-auto '>
      <div className='w-full flex flex-row px-[2px] py-[12px]'>
        {headers.map((header, index) => {
          return (
            <div className='w-full flex justify-center items-center text-base	font-medium	mx-[2px] py-2 bg-[#E9F2EF]'>
              {header}
            </div>
          )
        })
        }
      </div>
      {data.map((row, index) => {
        return (
          <div className='w-full flex flex-row px-[2px] py-[1px]'>
            {row.map((cell, index) => {
              return (
                <div className='w-full flex justify-center items-center text-base	font-medium	mx-[2px] py-2 bg-[#E9F2EF]'> {cell} </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default List