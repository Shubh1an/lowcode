import React, { useEffect, useState } from 'react';
import FormInput from '../../FormInput/FormInput';
import { FaTrash } from 'react-icons/fa';
import {
  getAllControls,
  getPageData,
  getPageDetails,
} from '../../../Requests/form';
import { BiText } from 'react-icons/bi';
import Icons from '../../Utility/Icons';

const View = () => {
  const [formFields, setFormFields] = useState([]);
  const [page_detail_id, setPage_detail_id] = useState('');
  const [page_data_id, setPage_data_id] = useState('');
  const [basicFields, setBasicFields] = useState([]);
  const [fieldValue, setFieldValue] = useState({});

  const newPageData = {
    id: '664edf5a0c7ebf60fb0bcd79',
    type: 'Form',
    entity_id: '6646f939f9c9f1d1717142ee',
    mode: 'edit',
  };
  const fetchAllControls = async () => {
    const basicFieldsData = [];
    getAllControls().then(({ data }) => {
      data.map((field) => {
        basicFieldsData.push({
          title: field.name,
          inputType: field.name,
          icon: <Icons name={field.logo} />,
          properties: field.control_properties,
          control_id: field._id,
          styles: field.styles,
        });
      });
      console.log('bb>>>>>>>>>>>>>>', basicFieldsData);
      setBasicFields(basicFieldsData);
    });
  };

  useEffect(() => {
    fetchAllControls();
  }, []);

  let mode = newPageData?.mode;

  const getFields = async () => {
    setFormFields([]);
    if (Object.keys(newPageData).length > 0) {
      if (mode === 'edit') {
        getPageDetails(newPageData?.id).then(({ data }) => {
          setPage_detail_id(data?.[0]?._id);
          console.log('Page detail', data);
          getPageData(data?.[0]?._id).then(({ data }) => {
            setPage_data_id(data?._id);
            console.log('Page data', data);
            let propertyDetails = data?.PropertyDetails || [];
            propertyDetails.map((key) => {
              console.log([...basicFields]);
              console.log(key);
              let control = [...basicFields]?.find(
                (field) => field.control_id === key.control_id,
              );
              console.log(control);
              if (control) {
                // control.propertyValues = key.properties;
                if (key?.properties?.options) {
                  control.options = key?.properties?.options;
                }
                setFormFields((prev) => [
                  ...prev,
                  { ...control, propertyValues: key.properties },
                ]);
              }
            });
          });
        });
      }
    }
  };

  useEffect(() => {
    getFields();
  }, [basicFields]);

  return (
    <div>
      <div
        className={`h-[85vh] p-4 flex flex-wrap overflow-auto justify-around max-w-[90%] mx-auto my-4 bg-white`}
      >
        {formFields.map((field, index) => (
          <div
            key={index}
            className={`max-w-[100%] w-${field.propertyValues?.width === '1' ? 'full' : field.propertyValues?.width === '1/2' ? '[48%]' : '[98%]'}`}
          >
            <FormInput
              field={{ ...field, id: index }}
              setActiveField={''}
              activePropertiesField={''}
              onchange={(e) => {
                setFieldValue((prev) => {
                  return {
                    ...prev,
                    [field?.propertyValues?.display_name]: {
                      value: e.target.value,
                      type: field.inputType,
                    },
                  };
                });
              }}
              deleteProp={
                <div
                  onClick={() => {
                    setFormFields((prevstate) =>
                      prevstate.filter((_, i) => i !== index),
                    );
                  }}
                ></div>
              }
            />
          </div>
        ))}
        <Footer handleFormSubmit={() => console.log(fieldValue)} />
      </div>
    </div>
  );
};

const Footer = ({ handleFormSubmit = () => {} }) => {
  return (
    <div className="w-full h-[60px] border-t-[1px] border-[#E9E9E9] mt-4">
      <div className="flex justify-center items-center h-full py-4">
        <button
          className="bg-[#227A60] text-[#fff] px-4 py-1 rounded-md mx-4 font-bold"
          onClick={handleFormSubmit}
        >
          Save
        </button>
        <button className="text-[#227A60] px-4 py-1 rounded-md border border-[#227A60] font-bold">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default View;
