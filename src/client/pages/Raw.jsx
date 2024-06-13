import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatValue } from '../../Utility/utility';
import { Pages, PagesFilleddata } from '../service/service';
import { getPage } from '../../Graphql/modelQuery';
import Control from '../../Screens/Components/MiniComponents/Control';
import { createFilledData } from '../../Graphql/moduleMutation';
import { setNewform } from '../../redux/userslice';

const Raw = () => {
  const dispatch = useDispatch();
  const modulesdata = useSelector((state) => state['modules']);
  let entityId = location.search.split('=')[1];

  const [forms, setForms] = useState([]);
  const [formsToRender, setFormsToRender] = useState([]);
  const [renderHeaders, setRenderHeaders] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [people, setPeoples] = useState({});
  const [pageData, setPageData] = useState([]);
  const [pageId, setPageID] = useState('');

  useEffect(() => {
    getFilledDataTable();
    if (pageId) {
      getviewPage();
      getForm(pageId);
      setForms(modulesdata?.newForm);
    }
  }, [entityId, pageId]);

  const getFilledDataTable = async () => {
    const pagesdefaultadd = await Pages(dispatch, entityId);
    console.log('pagesdefaultadd', pagesdefaultadd);
    if (pagesdefaultadd.length > 0) {
      setPageID(pagesdefaultadd.find((em) => em.type === 'default_add')?.id);
    }
  };

  const getviewPage = async () => {
    const res = await PagesFilleddata(dispatch, pageId);
    let high_index = 0;
    let high_length = 0;
    let data_array = res.map((data, index) => {
      if (data?.form_data?.length > high_length) {
        high_index = index;
        high_length = data?.form_data?.length;
      }
      return data.form_data;
    });
    setHeaders(res[high_index || 0]?.form_data.map((dt) => dt.key));
    setRenderHeaders(res[high_index || 0]?.form_data.map((dt) => dt.key));
    setFormsToRender(data_array);
  };

  const getForm = async (pageId) => {
    const addnewform = await getPage(pageId);
    dispatch(setNewform(addnewform?.getPage));
  };

  useEffect(() => {
    formsToRender.forEach((form, index) => {
      let header = Object.keys(form);
      header.forEach((header) => {
        if (header == 'created_by') {
          let user_id = form[header]?.user_id;
          if (!people[user_id]) {
            setPeoples((prev) => {
              return { ...prev, [user_id]: form[header] };
            });
          }
        }
      });
    });
  }, [formsToRender]);

  useEffect(() => {
    let formvalue = [];
    forms?.form_schema?.map(() => {
      let value = '';
      formvalue.push({ value });
    });
    setPageData([{ ...formvalue }]);
  }, [pageData]);

  const handleSubmit = async () => {
    let payload = {
      page_id: forms?.id,
      form_data: [],
    };
    pageData.map((item, index) => {
      let key = forms?.form_schema?.[index]?.properties?.displayName?.value;
      let value = item?.value;

      payload.form_data.push({ key, value });
    });
    const res = await createFilledData(payload);
    if (res) {
      console.log(res);
    }
  };

  const getFormByRow = (data) => {
    let formvalue = [];
    forms?.form_schema?.map((item, index) => {
      let value = data?.[index]?.value ? data?.[index]?.value : '';
      formvalue.push({ value });
    });
    setPageData({ ...formvalue });
    document.getElementById('my-drawer').click();
  };

  const openDrawer = () => {
    let formvalue = [];
    forms?.form_schema?.map(() => {
      let value = '';
      formvalue.push({ value });
    });
    setPageData([{ ...formvalue }]);

    if (pageData) document.getElementById('my-drawer').click();
  };

  return (
    <>
      <div className="flex flex-col p-4 h-full">
        <div className="flex justify-between mb-4">
          {/* <button className="bg-black text-white px-4 py-2 rounded">
            Add New
          </button> */}
          <label
            className="btn  bg-black text-white px-4 py-2 rounded drawer-button"
            onClick={openDrawer}
          >
            {' '}
            Add New
          </label>
        </div>
        <Table
          headers={renderHeaders}
          data={formsToRender}
          onClick={(data) => getFormByRow(data)}
        />
        <div className="flex justify-between items-center mt-auto">
          <div>
            Show
            <select className="border rounded px-2 py-1 mx-2">
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="48">48</option>
            </select>
            entries
          </div>
          <div className="flex space-x-1">
            <button className="border rounded px-3 py-1">1</button>
            <button className="border rounded px-3 py-1 bg-orange-500 text-white">
              2
            </button>
            <button className="border rounded px-3 py-1">3</button>
            <button className="border rounded px-3 py-1">...</button>
            <button className="border rounded px-3 py-1">17</button>
          </div>
        </div>
      </div>
      {/* DRawer */}
      <div className="drawer drawer-end">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="h-full w-[700px] bg-[#FFF] flex flex-col p-4">
            {forms?.form_schema?.map((field, index) => {
              return (
                <div
                  key={index}
                  className={`w-full rounded p-2 my-2 flex flex-col items-left`}
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
            <div className="flex flex-row gap-5">
              <button
                className="btn  bg-black text-white px-4 rounded drawer-button"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Save
              </button>
              <button
                className="btn  bg-white text-black px-4 rounded drawer-button"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Table = ({ headers, data, onClick }) => {
  return (
    <table className="min-w-full bg-white text-sm text-left rtl:text-right text-[#212121] dark:text-gray-400 ">
      <thead className="min-w-full bg-white">
        <tr className="border-b">
          <td className="px-2 py-3">
            <input type="checkbox" />
          </td>
          {headers?.map((header, index) => {
            return (
              <th className="p-2" key={index + '_heading'}>
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 ? (
          data?.map((row, index) => {
            if (row.length == 0) return null;
            return (
              <tr
                key={index + '_cell'}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                onClick={() => {
                  console.log('object', row);
                  onClick(row);
                }}
              >
                <td className="px-2 py-3">
                  <input type="checkbox" />
                </td>
                {headers.map((header, index) => {
                  return (
                    <>
                      <td className="px-2 py-3 " key={index + '_cell'}>
                        {formatValue(row[index]?.value || '--', header)}
                      </td>
                    </>
                  );
                })}
              </tr>
            );
          })
        ) : (
          <div className="w-full flex flex-row px-[2px] py-[1px]">
            <div className="w-full flex justify-center items-center text-base	font-medium	mx-[2px] py-2 bg-[#FCF9EE]">
              No Records Found
            </div>
          </div>
        )}
      </tbody>
    </table>
  );
};
export default Raw;
