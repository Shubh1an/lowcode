import { useState } from 'react';
import FormInput from '../FormInput/FormInput';

const AddTemplate = ({ onClickSave = () => {}, onClickCancel = () => {} }) => {
  const [options, setOptions] = useState([
    { value: 'usa', label: 'USA' },
    { value: 'uk', label: 'UK' },
    { value: 'france', label: 'France' },
    { value: 'germany', label: 'Germany' },
  ]);

  const fields = [
    {
      title: 'Template Name',
      inputType: 'Single Line',
      defaultValue: 'Enter Name',
    },
    {
      title: 'Template Type',
      inputType: 'multiselect',
      defaultValue: '---Select---',
      options: options,
    },
    {
      title: 'Industry',
      inputType: 'multiselect',
      defaultValue: '---Select---',
      options: options,
    },
    {
      title: 'Tags',
      inputType: 'multiselect',
      defaultValue: 'Add tags...',
      options: options,
    },
    {
      title: 'Category',
      inputType: 'multiselect',
      defaultValue: '---Select---',
      options: options,
    },
    {
      title: 'Sub Category',
      inputType: 'multiselect',
      defaultValue: '---Select---',
      options: options,
    },
    {
      title: 'Is Recommended',
      inputType: 'radio',
      options: ['Yes', 'No'],
    },
    {
      title: 'Ratings',
      inputType: 'multiselect',
      defaultValue: '---Select---',
      options: options,
    },
  ];

  const onupload = (file) => {
    // Handle file upload logic here
  };

  return (
    <div>
      <div className="w-full">
        <div className="bg-[#fff] min-h-96 rounded-2xl mx-6 px-4 pt-4 pb-2 overflow-auto">
          <div className="font-Nunito_Sans font-bold content-center">
            Add Template
          </div>
          <div>
            <hr />
          </div>
          <div className="mt-2">
            <div className="">
              <div className="grid grid-cols-2 gap-4">
                {fields.map((field, index) => (
                  <div key={index}>
                    <FormInput
                      field={{ ...field, id: index }}
                      setActiveField={() => {}}
                      activePropertiesField={() => {}}
                    />
                  </div>
                ))}
              </div>
              <div>
                <FormInput
                  field={{
                    title: 'Description',
                    inputType: 'textarea',
                    defaultValue: 'Add description...',
                    rows: 5,
                  }}
                  setActiveField={() => {}}
                  activePropertiesField={() => {}}
                />
              </div>
              <div>
                <FormInput
                  field={{
                    title: 'Upload FIle',
                    inputType: 'uploadfile',
                  }}
                  onUpload={onupload}
                  setActiveField={() => {}}
                  activePropertiesField={() => {}}
                />
              </div>
            </div>
          </div>
          <div className="my-2">
            <hr />
          </div>
          <div className="mt-4">
            <button
              className="bg-[#000] text-[#fff] px-4 py-1 rounded-md mr-4 font-bold"
              onClick={onClickSave}
            >
              Save
            </button>
            <button
              className="text-[#000] px-4 py-1 rounded-md border border-[#000] font-bold"
              onClick={onClickCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTemplate;
