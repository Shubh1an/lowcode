import { useEffect, useState } from 'react';
import {
  getAllControls,
  getPageData,
  getPageDetails,
} from '../../../Requests/form';
import { fillPage } from '../../../Requests/pade_data';
import FormInput from '../../FormInput/FormInput';
import Icons from '../../Utility/Icons';

const View = ({ newPageData }) => {
  const [formFields, setFormFields] = useState([]);
  const [page_detail_id, setPage_detail_id] = useState('');
  const [page_data_id, setPage_data_id] = useState('');
  const [basicFields, setBasicFields] = useState([]);
  const [fieldValue, setFieldValue] = useState({ page_data_id: '', data: {} });

  useEffect(() => {
    setFieldValue((prev) => {
      return {
        ...prev,
        page_data_id: page_data_id,
      };
    });
  }, [page_data_id]);

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

          getPageData(data?.[0]?._id).then(({ data }) => {
            setPage_data_id(data?._id);

            let propertyDetails = data?.PropertyDetails || [];
            propertyDetails.map((key) => {
              let control = [...basicFields]?.find(
                (field) => field.control_id === key.control_id,
              );

              if (control) {
                // control.propertyValues = key.properties;
                if (key?.properties?.options) {
                  setFormFields((prev) => [
                    ...prev,
                    {
                      ...control,
                      propertyValues: key.properties,
                      options: key?.properties?.options,
                    },
                  ]);
                } else {
                  setFormFields((prev) => [
                    ...prev,
                    { ...control, propertyValues: key.properties },
                  ]);
                }
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
            className={`${field.propertyValues?.width === '1' ? 'w-full' : field.propertyValues?.width === '1/2' ? 'w-[48%]' : 'w-[98%]'}`}
          >
            <FormInput
              field={{ ...field, id: index }}
              setActiveField={''}
              activePropertiesField={''}
              fieldValue={fieldValue}
              onchange={(e) => {
                setFieldValue((prev) => {
                  return {
                    ...prev,
                    data: {
                      ...prev?.data,
                      [field?.propertyValues?.display_name]: {
                        value: e.target.value,
                        type: field.inputType,
                      },
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
        <Footer
          handleFormSubmit={() => {
            fillPage(fieldValue)
              .then((data) => {})
              .catch((err) => {
                console.log('Error', err);
              });
          }}
        />
      </div>
    </div>
  );
};

const Footer = ({ handleFormSubmit = () => {} }) => {
  return (
    <div className="w-full h-[60px] border-t-[1px] border-[#E9E9E9] mt-4">
      <div className="flex justify-center items-center h-full py-4">
        <button
          className="bg-[#000] text-[#fff] px-4 py-1 rounded-md mx-4 font-bold"
          onClick={handleFormSubmit}
        >
          Save
        </button>
        <button className="text-[#000] px-4 py-1 rounded-md border border-[#000] font-bold">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default View;
