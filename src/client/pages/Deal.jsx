import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getPage } from '../../Graphql/modelQuery';
import { useNavigate } from 'react-router-dom';
import { createFilledData } from '../../Graphql/moduleMutation';
import { getNewPage } from '../../Requests/page';
import Control from '../../Screens/Components/MiniComponents/Control';
import { setNewform } from '../../redux/userslice';
import Table from '../components/Grid';
import { Pages, PagesFilleddata } from '../service/service';

const Deal = () => {
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

  const navigate = useNavigate();

  useEffect(() => {
    getFilledDataTable();
    if (pageId) {
      console.log('useffect', pageId);
      getviewPage();
      getForm(pageId);
      // setForms(modulesdata?.newForm);
    }
  }, [entityId, pageId]);

  const getFilledDataTable = async () => {
    const pagesdefaultadd = await Pages(dispatch, entityId);
    if (pagesdefaultadd.getPagebyEntityid.length > 0) {
      setPageID(
        pagesdefaultadd.getPagebyEntityid.find(
          (em) => em.type === 'default_add',
        )?.id,
      );
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
    const addnewform = await getNewPage(pageId);
    console.log('addnewform', addnewform);
    setForms(addnewform);
    dispatch(setNewform(addnewform));
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

  useEffect(() => {}, [pageData]);

  console.log('after use effect', forms);
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
      let key = item?.properties?.displayName?.value;
      let value = data?.[index]?.value ? data?.[index]?.value : '';
      formvalue.push({ key, value });
    });
    navigate('../page/contactview', {
      state: { data: formvalue, entityId: entityId },
    });
  };

  const openDrawer = () => {
    console.log('object', forms);
    let formvalue = [];
    forms?.form_schema?.map(() => {
      let value = '';
      formvalue.push({ value });
    });
    console.log('formvalue', formvalue);
    setPageData([{ ...formvalue }]);

    if (formvalue) document.getElementById('my-drawer').click();
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

export default Deal;
