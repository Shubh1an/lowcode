import React, { useEffect, useState } from 'react';
import SubTab from '../../Tab/SubTab';
import { BiText } from 'react-icons/bi';
import { FieldButton } from '../../Buttons/FieldButton';
import BuildFormNav from '../../BreadcrumNavigation/BuildFormNav';
import { useDrop, useDrag } from 'react-dnd';
import AddPageField from '../../inputs/AddPageField';
import FormInput from '../../FormInput/FormInput';
import {
  editPages,
  getAllControls,
  getControls,
  getPageData,
  getPageDetails,
  savePage,
} from '../../../Requests/form';
import Icons from '../../Utility/Icons';
import { editPageData, savePageData } from '../../../Requests/pade_data';
import { useDebounce } from 'use-debounce';
import { FaTrash } from 'react-icons/fa';

function toSnakeCase(input) {
  // Replace spaces with underscores and convert to lowercase
  return input.replace(/\s+/g, '_').toLowerCase();
}
const Add = ({ newPageData, selectedPage }) => {
  const FieldTabs = ['Basic Fields', 'Advanced Fields'];

  const PropertiesFields = ['Edit', 'Style', 'Arrange'];
  const [basicFields, setBasicFields] = useState([
    {
      title: 'Single Line',
      inputType: 'text',
      icon: <BiText />,
    },
  ]);

  const [page_detail_id, setPage_detail_id] = useState('');
  const [page_data_id, setPage_data_id] = useState('');
  const [fieldProperties, setFieldProperties] = useState([]);
  const [fieldStyles, setFieldStyles] = useState([]);

  const [formFields, setFormFields] = useState([]);

  const [activeField, setActiveField] = useState(0);
  const [activeProperties, setActiveProperties] = useState(0);
  const [activePropertiesField, setActivePropertiesField] = useState(-1);
  const [pageName, setPageName] = useState(
    selectedPage?.title || 'Unique Page Name',
  );
  const [pageState, setPageState] = useState('');

  const [pageNameDebounced] = useDebounce(pageName, 500);

  useEffect(() => {
    if (!selectedPage?._id) return;
    editPages(selectedPage?._id, { title: pageNameDebounced }).then(
      ({ data }) => {},
    );
  }, [pageNameDebounced]);

  let mode = newPageData?.mode;
  const getFields = async () => {
    console.log('newPageData????????????????', newPageData);
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

  useEffect(() => {
    getFields();
  }, [newPageData, basicFields]);

  useEffect(() => {
    const fields = [];
    const styleFields = [];

    formFields?.[activePropertiesField]?.properties.map((field) => {
      let key = Object.keys(field)[0];
      let data = {
        id: key,
        type: field[key].type,
        title: field[key].label[0],
        options: field[key]?.options,
      };
      fields.push(data);
    });

    formFields?.[activePropertiesField]?.styles.map((field) => {
      let key = Object.keys(field)[0];
      let data = {
        id: key,
        type: field[key].type,
        title: field[key].label[0],
        options: field[key]?.options,
      };
      styleFields.push(data);
    });

    setFieldStyles(styleFields);
    setFieldProperties(fields);
  }, [activePropertiesField]);

  const handleProperties = (data) => {
    console.log('data>>>>>>>>>>>>>>>>>', data);
    let changeId = activePropertiesField;
    let currentData = formFields;
    currentData[changeId] = {
      ...currentData[changeId],
      propertyValues: {
        ...(currentData[changeId].propertyValues || {}),
        [data.id]: data.value,
      },
    };
    setFormFields([...currentData]);
  };

  const handleStyles = (data) => {
    let changeId = activePropertiesField;
    let currentData = formFields;
    currentData[changeId] = {
      ...currentData[changeId],
      propertyValues: {
        ...(currentData[changeId].propertyValues || {}),
        [data.id]: data.value,
      },
    };
    console.log('currentData>>>>>>>>>>>>>>>>>>>>>', currentData);
    setFormFields([...currentData]);
  };

  const handleDrop = (item) => {
    let { field, type } = item;

    if (type === 'add') {
      field = { ...field };
      delete field.icon;
      setFormFields([...formFields, field]);
    }
  };

  useEffect(() => {
    setActivePropertiesField(formFields.length - 1);
  }, [formFields.length]);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'FIELD',
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = canDrop && isOver;

  const handleFormSubmit = async () => {
    if (!page_detail_id) return;
    let data = {
      page_detail_id: page_detail_id,
      PropertyDetails: [],
      styles: {},
    };
    formFields.map((field) => {
      data.PropertyDetails.push({
        properties: field.propertyValues,
        control_id: field.control_id,
      });
    });
    if (mode === 'edit' && page_data_id) {
      editPageData(page_data_id, data).then(({ data }) => {});
    } else {
      savePageData(data).then(({ data }) => {});
    }
  };

  return (
    <div className="w-full h-full flex flex-row px-6 pb-6">
      <div className="w-1/4 h-full bg-[#fff] rounded-2xl flex flex-col overflow-auto">
        <SubTab
          tabs={FieldTabs}
          active={activeField}
          setActive={setActiveField}
        />
        <div className="">
          {activeField === 0 ? (
            <div className="grid grid-cols-2 gap-2 w-full h-full p-4">
              {basicFields.map((field, index) => (
                <FieldButton
                  key={index}
                  title={field.title}
                  icon={field.icon}
                  onclick={() => setActiveField(index)}
                  titleClass={''}
                  extraClass="w-full text-[#4D4D4D] hover:text-[#FFFFFF] hover:bg-[#227A60] text-center text-sm border border-[#E9E9E9] rounded-lg py-2"
                  index={index}
                  field={field}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div
        className="flex-col w-2/4 h-full bg-[#fff] rounded-2xl mx-6 flex overflow-auto"
        ref={drop}
      >
        <BuildFormNav setFormName={setPageName} formName={pageName} />
        <div
          className={`max-h-[65vh] border-2 ${isActive ? ' border-[#227A60]' : 'border-transparent'} p-4 flex flex-wrap overflow-auto justify-around`}
        >
          {formFields.map((field, index) => {
            console.log('field', field);
            return (
              <div
                key={index}
                className={`${field.propertyValues?.width === 'full' ? 'w-full' : field.propertyValues?.width === '1/2' ? 'w-[48%]' : field.propertyValues?.width === '1/3' ? 'w-[33.33%]' : 'w-full'}`}
              >
                <FormInput
                  field={{ ...field, id: index }}
                  setActiveField={setActivePropertiesField}
                  activePropertiesField={activePropertiesField}
                  deleteProp={
                    <div
                      onClick={() => {
                        setFormFields((prevstate) =>
                          prevstate.filter((_, i) => i !== index),
                        );
                      }}
                    >
                      <FaTrash className="text-[#227A60] cursor-pointer" />
                    </div>
                  }
                />
              </div>
            );
          })}
        </div>
        <Footer handleFormSubmit={handleFormSubmit} />
      </div>
      <div className="w-1/4 h-full bg-[#fff] rounded-2xl flex flex-col overflow-auto">
        <SubTab
          tabs={PropertiesFields}
          active={activeProperties}
          setActive={setActiveProperties}
        />
        <div className={`w-full h-full overflow-auto`}>
          {activeProperties === 0 ? (
            <div className="grid grid-cols-1 w-full  p-4">
              {fieldProperties.map((field, index) => (
                <AddPageField
                  key={index}
                  field={field}
                  handleProperties={handleProperties}
                  defaultValue={formFields[activePropertiesField]}
                />
              ))}
            </div>
          ) : activeProperties === 1 ? (
            <>
              <div className="grid grid-cols-1 w-full  p-4">
                {fieldStyles.map((field, index) => (
                  <AddPageField
                    key={index}
                    field={field}
                    handleProperties={handleStyles}
                    defaultValue={formFields[activePropertiesField]}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const Footer = ({ handleFormSubmit }) => {
  return (
    <div className="w-full h-[60px] border-t-[1px] border-[#E9E9E9] mt-auto">
      <div className="flex justify-start items-center h-full py-4">
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

export default Add;
