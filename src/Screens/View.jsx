import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getPageDetails } from '../Requests/page';
import Control from './Components/MiniComponents/Control';
import { fillData } from '../Requests/fillData';
import { getPage, pages } from '../Graphql/modelQuery';
import { createFilledData } from '../Graphql/moduleMutation';
import { useNavigate } from 'react-router-dom';

const View = () => {
  let page_id = location.search.split('=')[1];
  const [page, setPage] = useState({});
  // const fetchPage = async () => {
  //   getPageDetails(page_id).then((res) => {
  //     setPage(res?.data);
  //   });
  // };
  const navigate = useNavigate();
  const [pageData, setPageData] = useState([]);

  const fetchPagebyID = async () => {
    try {
      const pageDetails = await getPage(page_id);
      const data = pageDetails?.getPage;
      if (data) {
        setPage(data);
      }
    } catch (error) {
      console.error('Error fetching enity:', error);
    }
  };

  useEffect(() => {
    fetchPagebyID();
  }, []);

  useEffect(() => {
    // console.log(page?.form_schema)
  }, [page]);

  // useEffect(() => {
  //   fetchPage();
  // }, []);

  useEffect(() => {
    // console.log("pageData", pageData)
  }, [pageData]);

  const handleSubmit = async () => {
    let payload = {
      page_id: page_id,
      form_data: [],
    };
    pageData.map((item, index) => {
      let key = page?.form_schema?.[index]?.properties?.displayName?.value;
      let value = item?.value;

      payload.form_data.push({ key, value });
    });
    const res = await createFilledData(payload);
    console.log('filled data', res);
    navigate(`/builder/listview?id=` + page_id);
    // fillData(payload).then((res) => {
    //   console.log(res);
    // });
  };

  return (
    <div className="w-full h-[94%] bg-[#FCF9EE] flex flex-col p-4">
      <div className="w-full h-full bg-[#FFF] rounded flex flex-col">
        <TopBar label={page?.name} />
        <div className="w-full h-full bg-[#FFF] flex flex-col p-4 overflow-scroll">
          {page?.form_schema?.map((field, index) => {
            return (
              <div
                key={index}
                className={`w-full bg-[#FCF9EE] rounded p-2 my-2 flex flex-col items-left border border-[#F9EFDE]`}
              >
                <div
                  className={`font-bold px-2 py-2 rounded flex justify-between`}
                >
                  <div className="cursor-pointer">
                    {field?.properties?.displayName?.value}
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
        <div className="w-full bg-[#fff] flex flex-col p-4 justify-end">
          <button
            className="justify-center items-center rounded flex flex-col items-left border border-[#F9EFDE] font-bold text-[#FFF] px-4 py-2 text-center text-sm border border-[#E9E9E9] rounded-lg w-fit bg-[#F29900]"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </button>
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
