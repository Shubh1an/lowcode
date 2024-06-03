import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getPageDetails } from '../Requests/page';
import Control from './Components/MiniComponents/Control';

const View = () => {
  let page_id = location.search.split('=')[1];
  const [page, setPage] = useState({});
  const fetchPage = async () => {
    getPageDetails(page_id).then((res) => {
      setPage(res.data);
    });
  };

  const [pageData, setPageData] = useState([]);
  useEffect(() => {
    console.log(page?.form_schema);
  }, [page]);
  useEffect(() => {
    fetchPage();
  }, []);

  return (
    <div className="w-full h-full bg-[#FCF9EE] flex flex-col p-4">
      <div className="w-full h-full bg-[#FFF] rounded flex flex-col">
        <TopBar label={page?.name} />
        <div className="w-full h-full bg-[#FFF] flex flex-col p-4">
          {page?.form_schema?.map((field, index) => {
            console.log(field);
            return (
              <div
                key={index}
                className={`w-full bg-[#FCF9EE] rounded p-2 my-2 flex flex-col items-left border border-[#F9EFDE]`}
              >
                <div
                  className={`font-bold px-2 py-2 rounded flex justify-between`}
                >
                  <div className="cursor-pointer">
                    {field?.properties?.displayName.value}
                  </div>
                </div>
                <Control
                  label={field?.control}
                  value={pageData}
                  setValue={setPageData}
                  index={index}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const TopBar = ({ label }) => {
  return (
    <div className="flex w-full border-b p-4">
      <p className="text-2xl font-bold">{label}</p>
    </div>
  );
};

export default View;
