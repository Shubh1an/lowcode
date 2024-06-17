import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPagebyid } from '../Graphql/modelQuery';
import { createFilledData } from '../Graphql/moduleMutation';
import Control from './Components/MiniComponents/Control';

const View = () => {
  let page_id = location.search.split('=')[1];
  const [page, setPage] = useState({});
  const navigate = useNavigate();
  const [pageData, setPageData] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchPagebyID = async () => {
    try {
      const pageDetails = await getPagebyid(page_id);
      const data = pageDetails?.getPagebyid;
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

  useEffect(() => {}, [page]);

  useEffect(() => {}, [pageData]);

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
  };

  return (
    <div className="w-full h-[94%] bg-[#FCF9EE] flex flex-col p-4">
      <div className="w-full h-full bg-[#FFF] rounded flex flex-col">
        <TopBar label={page?.name} />
        <div className="w-full h-full bg-[#FFF] flex flex-col p-4 overflow-scroll">
          {page?.form_schema?.map((field, index) => {
            let options = field?.properties?.options?.options || [];
            return (
              <div
                key={index}
                className={`w-full bg-[#FCF9EE] rounded p-2 my-2 flex flex-col items-left border border-[#F9EFDE]`}
              >
                <div
                  className={`font-bold px-2 py-2 rounded flex justify-between`}
                >
                  <div className="cursor-pointer">
                    {field?.properties?.displayName?.value}{' '}
                    {field?.properties?.required?.value === 'true' ? (
                      <span className="text-red-500">*</span>
                    ) : null}
                  </div>
                  <div className="cursor-pointer"></div>
                </div>
                <Control
                  label={field?.control}
                  field={field}
                  value={pageData}
                  setValue={setPageData}
                  index={index}
                  options={options}
                  isValid={isValid}
                  setIsValid={setIsValid}
                  isError={isError}
                  setIsError={setIsError}
                  name={field?.properties?.displayName?.value}
                />
              </div>
            );
          })}
          <div>
            {isError ? <p className="text-red-500">{isError}</p> : null}
          </div>
        </div>
        <div className="w-full bg-[#fff] flex flex-col p-4 justify-end">
          <button
            className="justify-center items-center rounded flex flex-col items-left border border-[#F9EFDE] font-bold text-[#FFF] px-4 py-2 text-center text-sm border border-[#E9E9E9] rounded-lg w-fit bg-[#F29900]
            disabled:bg-[#E9E9E9]
            disabled:text-[#A9A9A9]
            disabled:border-[#E9E9E9]
            "
            onClick={() => {
              handleSubmit();
            }}
            disabled={isError}
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
