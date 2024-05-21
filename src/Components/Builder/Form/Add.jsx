import React, { useEffect, useState } from 'react';
import SubTab from '../../Tab/SubTab';
import { BiText } from 'react-icons/bi';
import { FieldButton } from '../../Buttons/FieldButton';
import BuildFormNav from '../../BreadcrumNavigation/BuildFormNav';
import { useDrop } from 'react-dnd';
import AddPageField from '../../inputs/AddPageField';
import FormInput from '../../FormInput/FormInput';
import { getAllControls, getControls, getPageData, getPageDetails, getPages, savePage } from '../../../Requests/form';
import Icons from '../../Utility/Icons';
import { editPageData, savePageData } from '../../../Requests/pade_data';

function toSnakeCase(input) {
  // Replace spaces with underscores and convert to lowercase
  return input.replace(/\s+/g, '_').toLowerCase();
}
const Add = ({ newPageData, setActive }) => {
  const FieldTabs = ['Basic Fields', 'Advanced Fields'];

  const PropertiesFields = ['Edit', 'Style'];
  const [basicFields, setBasicFields] = useState([
    {
      title: 'Single Line',
      inputType: 'text',
      icon: <BiText />,
    },
  ])

  const [page_detail_id, setPage_detail_id] = useState("");
  const [page_data_id, setPage_data_id] = useState("");
  const [fieldProperties, setFieldProperties] = useState([]);

  const [formFields, setFormFields] = useState([]);

  const [activeField, setActiveField] = useState(0);
  const [activeProperties, setActiveProperties] = useState(0);
  const [activePropertiesField, setActivePropertiesField] = useState(0);
  const [formName, setFormName] = useState('Untitled Form');


  let mode = newPageData?.mode
  const getFields = async () => {
    setFormFields([])
    if (Object.keys(newPageData).length > 0) {
      if (mode === "edit") {
        getPageDetails(newPageData?.id).then(({ data }) => {
          let page_data = data?.[0]?.page_data || []
          setPage_detail_id(data?.[0]?._id)
          getPageData(data?.[0]?._id).then(({ data }) => {
            setPage_data_id(data?._id)
            let propertyDetails = data?.PropertyDetails || []
            propertyDetails.map((key) => {
              let control = [...basicFields]?.find((field) => field.control_id === key.control_id)
              if (control) {
                control.propertyValues = key.properties
                if (key?.properties?.options) {
                  control.options = key?.properties?.options
                }
                setFormFields(prev => [...prev, control])
              }
              console.log("key", key)
            })
            console.log("Basic fields", basicFields)
          })
        })
      }
    }
  }

  const fetchAllControls = async () => {
    const basicFieldsData = [
    ]
    getAllControls().then(({ data }) => {
      console.log("data", data)
      data.map((field) => {
        basicFieldsData.push({
          title: field.name,
          inputType: field.name,
          icon: <Icons name={field.logo} />,
          properties: field.control_properties,
          control_id: field._id
        })
      })
      setBasicFields(basicFieldsData)
    })
  }
  useEffect(() => {
    fetchAllControls()
  }, [])

  useEffect(() => {
    getFields()
  }, [newPageData, basicFields])


  // useEffect(() => {
  //   console.log("Form Fields", formFields)
  // }, [formFields])


  useEffect(() => {
    const fields = []
    formFields?.[activePropertiesField]?.properties.map((field) => {
      let key = Object.keys(field)[0];
      let data = {
        id: key,
        type: field[key].type,
        title: field[key].label[0],
        options: field[key]?.options,
      }
      fields.push(data)
    })
    console.log("Fields", fields)
    setFieldProperties(fields)
  }, [activePropertiesField]);

  const handleProperties = (data) => {
    let changeId = activePropertiesField;
    let currentData = formFields;
    currentData[changeId] = {
      ...currentData[changeId],
      propertyValues: {
        ...currentData[changeId].propertyValues || {},
        [data.id]: data.value
      }
    }
    setFormFields([...currentData]);
  };

  const handleDrop = (item) => {
    let { field } = item;
    delete field.icon;
    setFormFields([...formFields, field]);
    setActivePropertiesField(formFields.length);
  };

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
    console.log('formFields', formFields);
    let data = {
      page_detail_id: page_detail_id,
      PropertyDetails: [],
      styles: {}
    };
    formFields.map((field) => {
      data.PropertyDetails.push({
        properties: field.propertyValues,
        control_id: field.control_id
      })
    });
    if (mode === "edit" && page_data_id) {
      editPageData(page_data_id, data).then(({ data }) => {
        console.log('data', data);
      })
    }
    else {
      savePageData(data).then(({ data }) => {
        console.log('data', data);
      });
    }
  }

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
        className="flex flex-col w-2/4 h-full bg-[#fff] rounded-2xl mx-6 flex overflow-auto"
        ref={drop}
      >
        <BuildFormNav setFormName={setFormName} formName={formName} />
        <div
          className={`w-full h-[80%] border-2 ${isActive ? ' border-[#227A60]' : 'border-transparent'} p-4 overflow-scroll`}
        >
          {formFields.map((field, index) => (
            <div key={index}>
              <FormInput
                field={{ ...field, id: index }}
                setActiveField={setActivePropertiesField}
                activePropertiesField={activePropertiesField}
              />
            </div>
          ))}
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
          ) : null}
        </div>
      </div>
    </div>
  );
};

const Footer = ({ handleFormSubmit }) => {
  return (
    <div className="w-full h-[60px] border-t-[1px] border-[#E9E9E9]">
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
