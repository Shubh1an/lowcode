import React from 'react';
import { CustomInput } from '../inputs/CustomInput';
import FormInput from '../FormInput/FormInput';

const AddTemplate = ({ onClickSave = () => {}, onClickCancel = () => {} }) => {
  const fields = [
    {
      title: 'Template Name',
      inputType: 'text',
      defaultValue: 'Enter Name',
    },
    {
      title: 'Template Type',
      inputType: 'text',
      defaultValue: '---Select---',
    },
    {
      title: 'Industry',
      inputType: 'text',
      defaultValue: '---Select---',
    },
    {
      title: 'Tags',
      inputType: 'text',
      defaultValue: 'Add tags...',
    },
    {
      title: 'Category',
      inputType: 'text',
      defaultValue: '---Select---',
    },
    {
      title: 'Sub Category',
      inputType: 'text',
      defaultValue: '---Select---',
    },
    {
      title: 'Is Recommended',
      inputType: 'radio',
      options: ['Yes', 'No'],
    },
    {
      title: 'Ratings',
      inputType: 'text',
      defaultValue: '---Select---',
    },
  ];

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
            </div>
          </div>
          <div className="my-2">
            <hr />
          </div>
          <div className="mt-4">
            <button
              className="bg-[#227A60] text-[#fff] px-4 py-1 rounded-md mr-4 font-bold"
              onClick={onClickSave}
            >
              Save
            </button>
            <button
              className="text-[#227A60] px-4 py-1 rounded-md border border-[#227A60] font-bold"
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
