import { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import Icons from '../Components/Utility/Icons';
import controlls from '../Config/Controlls.jsx';
import config from '../Config/config.js';
import { getPagebyEntityid } from '../Graphql/modelQuery';
import { getEntities } from '../Requests/entity';
import { UpdatePage, getNewPage } from '../Requests/page';
import Control from './Components/MiniComponents/Control';
import CustomSelect from './Components/MiniComponents/CustomSelect';
import MultiSelectComponent from './Components/MiniComponents/MultiSelect';
import SubTab from './Components/MiniComponents/SubTab';
import { isInputType } from 'graphql';

//editor_id == page_id
const Editor = () => {
  //let editor_id1 = location.search.split('editor_id=')[1];
  // let module_id = location.search.split('module_id=')[1].split('&')[0];
  // let entity_id = location.search.split('entity_id=')[1].split('&')[0];

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const module_id = params.get('module_id');
  const params1 = new URLSearchParams(location.search);
  const editor_id = params1.get('page_id');
  const params2 = new URLSearchParams(location.search);
  const entity_id = params2.get('entity_id');

  const [active, setActive] = useState(0);
  const [selectedControl, setSelectedControl] = useState(null);

  const tabs = ['Controlls'];

  const { CONTROLLS } = config;

  const [page, setPage] = useState([]);
  const [isChildHovering, setIsChildHovering] = useState(false);

  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    console.log('editor_id', editor_id);
    console.log('module_id', module_id);
    console.log('entity_id', entity_id);
  }, []);
  const fetchPage = async () => {
    getNewPage(editor_id).then((res) => {
      // setPage(res.data.form_schema)
      // setPageData(res.data.page_data)
      console.log('111', res);

      setPageData(res.form_schema);
      res.form_schema.forEach((item, index) => {
        console.log('000', item);
        // { label, properties: controlls(label)?.properties, child: [] }
        let pageControl = {
          label: item.control,
          properties: controlls(item.control).properties,
          child: [],
        };

        setPage((prev) => [...prev, pageControl]);
      });
    });
  };

  useEffect(() => {
    fetchPage();
  }, []);

  const handleSubmit = () => {
    let payload = {
      id: editor_id,
      input: {
        form_schema: pageData,
      },
    };

    const res = UpdatePage(payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log('Page Data: ', page);
  };

  const handleDrop = ({ label }) => {
    if (!isChildHovering) {
      console.log('Properties-----> ', controlls(label)?.properties);

      setPage([
        ...page,
        { label, properties: controlls(label)?.properties, child: [] },
      ]);
      setPageData((prev) => {
        return [
          ...prev,
          {
            control: label,
            properties: {
              ...controlls(label)?.properties,
              displayName: {
                value: 'Display Name ' + (prev.length + 1),
                options: [],
              },
            },
          },
        ];
      });
    }
    setIsChildHovering(false);
  };
  console.log('pageData', pageData);

  const handleRemove = (index) => {
    setPage(page.filter((item, i) => i !== index));
    setPageData(pageData.filter((item, i) => i !== index));
  };

  useEffect(() => {
    setSelectedControl(page.length > 0 ? page.length - 1 : null);
  }, [page]);
  useEffect(() => {
    setSelectedControl(page.length > 0 ? page.length - 1 : null);
  }, [page]);

  useEffect(() => {}, [pageData]);

  return (
    <div className="w-full h-[94%] bg-[#FCF9EE] flex flex-row p-4">
      <div className="w-1/4 h-full bg-[#FFF] rounded-2xl overflow-auto">
        <SubTab active={active} setActive={setActive} tabs={tabs} />
        <div className="w-full p-4 grid grid-cols-2 gap-x-4">
          {CONTROLLS?.map((control, index) => {
            return (
              <ControlCard
                label={control}
                icon={<Icons name={control} />}
                index={index}
              />
            );
          })}
        </div>
      </div>

      <div className="w-2/4 h-full bg-[#FFF] rounded-2xl overflow-auto mx-4">
        <EditorComponent
          editorId={editor_id}
          handleDrop={handleDrop}
          page={page}
          setPage={setPage}
          selectedControl={selectedControl}
          setSelectedControl={setSelectedControl}
          setPageData={setPageData}
          pageData={pageData}
          handleSubmit={handleSubmit}
          handleRemove={handleRemove}
        />
      </div>

      <div className="w-1/4 h-full bg-[#FFF] rounded-2xl overflow-auto">
        <PropertyWindow
          page={page}
          selectedControl={selectedControl}
          pageData={pageData}
          setPageData={setPageData}
          module_id={module_id}
          entity_id={entity_id}
          editor_id={editor_id}
        />
      </div>
    </div>
  );
};

const ControlCard = ({ label, icon, index }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FIELD',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: { label, index },
  }));
  label = label.replace('_', ' ');
  label = label.charAt(0).toUpperCase() + label.slice(1);
  return (
    <div
      className="w-full h-10 bg-[#FCF9EE] rounded p-4 my-4 flex items-center justify-between border border-[#F9EFDE] cursor-grab select-none"
      ref={drag}
      key={index}
    >
      {icon}
      <div className="w-3/4">{label}</div>
    </div>
  );
};

const EditorComponent = ({
  handleDrop,
  page,
  selectedControl,
  setSelectedControl,
  setPage,
  pageData,
  setPageData,
  handleSubmit,
  editorId,
  handleRemove,
}) => {
  // console.log("Editor Component setSelectedControl ----> ",setSelectedControl)
  const [hover, setHover] = useState(false);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'FIELD',
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    hover: (item) => setHover(true),
  });

  return (
    <div
      className={`w-full h-full flex flex-col  pb-0 border  ${isOver ? 'border-[black]' : ''}`}
      ref={drop}
    >
      <EditorTopBar editorId={editorId} />
      {page.length == 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          Drag and Drop
        </div>
      ) : null}
      <div className="w-full h-full flex flex-col items-center px-4 overflow-scroll">
        {page?.map((item, index) => {
          return (
            <div
              key={index}
              className={`${selectedControl === index ? 'bg-[#F9EFDE]' : ''} w-full bg-[#FCF9EE] rounded p-2 my-2 flex flex-col items-left border border-[#F9EFDE]`}
            >
              <div
                className={`font-bold px-2 py-2 rounded flex justify-between`}
              >
                <div
                  className="cursor-pointer"
                  onClick={() => setSelectedControl(index)}
                >
                  {pageData[index]?.properties?.displayName?.value ||
                    item?.label}
                </div>
                <button
                  className="ml-2"
                  onClick={() => {
                    handleRemove(index);
                  }}
                >
                  Remove
                </button>
              </div>
              <Control
                label={item?.label}
                value={pageData}
                setValue={setPageData}
                index={index}
              />
            </div>
          );
        })}
      </div>
      <div className="w-full flex items-center border-t-[1px] border-[#E9E9E9] mt-auto sticky bottom-0 bg-[#FFF] p-4">
        <button
          className="justify-center items-center rounded flex flex-col items-left border border-[#F9EFDE] font-bold text-[#FFF] px-4 py-2 text-center text-sm border border-[#E9E9E9] rounded-lg w-fit bg-[#F29900]"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

const PropertyWindow = ({
  page,
  selectedControl,
  pageData,
  setPageData,
  module_id,
  entity_id,
  editor_id,
}) => {
  console.log('selectControl 1 ----->', selectedControl);
  console.log('selectControl 2----->', pageData);
  // console.log("selectControl 3 ----->",selectedControl)
  let properties = page[selectedControl]?.properties;

  if (!properties) return null;
  return (
    <div className="w-full h-full rounded-2xl overflow-auto p-4">
      {Object.keys(properties).map((key, index) => {
        return (
          <Property
            key={index}
            property={properties[key]}
            property_key={key}
            pageData={pageData}
            setPageData={setPageData}
            selectedControl={selectedControl}
            module_id={module_id}
            entity_id={entity_id}
            editor_id={editor_id}
          />
        );
      })}
    </div>
  );
};
const PropertyInput = ({
  type,
  property_key,
  pageData,
  setPageData,
  selectedControl,
  property,
  module_id,
  entity_id,
  editor_id,
}) => {
  let key = property_key;
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState('');
  const [lookupType, setLookupType] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [lookupentityId, setlookupentityId] = useState('');

  useEffect(() => {
    let inputValue = pageData[selectedControl]?.properties?.[key]?.value;
    setInputValue(inputValue);
  }, [pageData, selectedControl]);

  const addOption = () => {
    if (option === '') return;
    setOptions([...options, option]);
    setOption('');
  };
  useEffect(() => {
    if (inputValue || options.length > 0) {
      console.log('Editor options111 ---->', options); // Log options
      console.log('Editor inputValue ---->', inputValue); // Log inputValue
      if (!pageData[selectedControl]?.properties) {
        setPageData((prev) => {
          let newPageData = [...prev];
          newPageData[selectedControl] = {
            ...newPageData[selectedControl],
            properties: {
              ...pageData[selectedControl]?.properties,
              [key]: {
                value: inputValue,
                options: options,
              },
            },
          };

          return newPageData;
        });
      } else {
        setPageData((prev) => {
          let newPageData = [...prev];
          newPageData[selectedControl] = {
            ...newPageData[selectedControl],
            properties: {
              ...pageData[selectedControl]?.properties,
              [key]: {
                value: inputValue,
                options: options,
              },
            },
          };

          return newPageData;
        });
      }
    }
  }, [inputValue, options]);

  switch (type) {
    case 'string':
      return (
        <input
          type="text"
          className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm"
          value={inputValue}
          onChange={(e) => {
            console.log(e.target.value); // Log the value
            setInputValue(e.target.value);
          }}
        />
      );
    case 'number':
      return (
        <input
          type="number"
          className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      );
    case 'boolean':
      return (
        <select
          className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      );
    case 'options':
      console.log('Option Enter ---->', options);
      return (
        <div className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm">
          {options.map((option, index) => {
            return (
              <div
                key={index}
                className="w-full font-bold py-2 flex bg-[#FCF9EE] px-2 justify-between"
              >
                <p className="m-2 " key={index}>
                  {option}
                </p>
                {/* Red button */}
                <button
                  className="text-[#FFF] px-4 py-2  text-center text-sm border border-[#E9E9E9] rounded-lg w-fit bg-[#F29900]"
                  onClick={() => {
                    setOptions([
                      ...options.slice(0, index),
                      ...options.slice(index + 1),
                    ]);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
          <div className="flex gap-2">
            <input
              type="text"
              className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm"
              placeholder="Add option"
              value={option}
              onChange={(e) => setOption(e.target.value)}
              // if I press enter it will add the option
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addOption();
                }
              }}
            />
            <button
              className="text-[#4D4D4D] px-4 py-2 bg-[#FCF9EE] text-center text-sm border border-[#E9E9E9] rounded-lg w-fit"
              onClick={() => {
                addOption();
              }}
            >
              Add
            </button>
          </div>
        </div>
      );

    case 'lookup':
      console.log('property------------------------------------->', property);
      console.log('lookup Data----->', property);
      return (
        <div className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm">
          <LookupComponent
            module_id={module_id}
            entity_id={entity_id}
            lookupType={inputValue}
            setInputValue={setInputValue}
          />
        </div>
      );
    case 'lookupcolumn':
      return (
        <div className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm">
          <LookupColumnComponent
            pageData={pageData}
            setInputValue={setInputValue}
            selectedControl={selectedControl}
          />
        </div>
      );
    case 'lookuptype':
      return (
        <select
          className="w-full border border-[#E9E9E9] rounded my-2 bg-[#FFFFFF] p-2 text-sm"
          value={inputValue}
          // onChange={(e) => setInputValue(e.target.value)}
          onChange={(e) => {
            const value = e.target.value;
            setInputValue(value);
            setLookupType(value);
          }}
        >
          <option value="onetoone">One to One</option>
          <option value="onetomany">One to Many</option>
        </select>
      );
  }
};
const Property = ({
  property,
  pageData,
  setPageData,
  selectedControl,
  property_key,
  module_id,
  entity_id,
  editor_id,
}) => {
  console.log('Property123 ------>', pageData);
  return (
    <div className="w-full bg-[#FCF9EE] rounded p-4 my-4 flex-col items-center justify-between border border-[#F9EFDE]">
      <div className="">{property?.label}</div>
      <div className="w-">
        <PropertyInput
          type={property?.type}
          property_key={property_key}
          property={property}
          pageData={pageData}
          setPageData={setPageData}
          selectedControl={selectedControl}
          module_id={module_id}
          entity_id={entity_id}
          editor_id={editor_id}
        />
      </div>
    </div>
  );
};

const EditorTopBar = ({ editorId }) => {
  return (
    <div className="w-full sticky top-0 border-b border-[#E9E9E9] p-4 bg-[#FFFFFF] rounded">
      <div className="w-full flex justify-between">
        <p className="text-[#4D4D4D] font-semibold text-lg">Editor</p>
        <Link to={'/builder/viewform?id=' + editorId}>
          <button className="justify-center items-center rounded flex flex-col items-left border border-[#F9EFDE] font-bold text-[#FFF] px-4 py-2 text-center text-sm border border-[#E9E9E9] rounded-lg w-fit bg-[#F29900]">
            Preview
          </button>
        </Link>
      </div>
    </div>
  );
};

const LookupComponent = ({
  module_id,
  entity_id,
  setInputValue,
  lookupType,
}) => {
  const [entities, setEntities] = useState([]);
  useEffect(() => {
    console.log('Calling get entities:', module_id);
    if (module_id) {
      getEntities(module_id).then((data) => {
        let entities = data;
        entities.forEach((entity, index) => {
          if (entity_id === entity.id) {
            entities.splice(index, 1);
          }
        });
        setEntities(entities);
      });
    }
  }, [module_id, entity_id]);
  return (
    <div>
      {lookupType === 'onetomany' ? (
        <MultiSelectComponent
          options={entities.map((entity) => ({
            label: entity.name,
            value: entity.id,
          }))}
          setValue={setInputValue}
        />
      ) : (
        <CustomSelect
          options={entities.map((entity) => ({
            label: entity.name,
            value: entity.id,
          }))}
          setValue={setInputValue}
        />
      )}
    </div>
  );
};

const LookupColumnComponent = ({
  pageData,
  setInputValue,
  selectedControl,
}) => {
  const [page, setPage] = useState([]);

  useEffect(() => {
    let pageDetailId = pageData[selectedControl]?.properties?.entity?.value;
    if (pageDetailId) {
      getPagebyEntityid(pageDetailId).then((data) => {
        let form_schema = data?.getPagebyEntityid?.find(
          (elm) => elm.type === 'default_add',
        )?.form_schema;
        setPage(form_schema || []);
      });
    }
  }, [pageData]);

  return (
    <CustomSelect
      options={page.map((entity) => {
        return {
          label: entity?.properties?.displayName?.value,
          value: entity?.properties?.displayName?.value,
        };
      })}
      setValue={setInputValue}
    />
  );
};
export default Editor;
