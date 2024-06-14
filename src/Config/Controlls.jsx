import { type } from '@testing-library/user-event/dist/type';
import { max } from 'moment';
import React from 'react';
import { useDrop } from 'react-dnd';
const controlls = (internal_name, children) => {
  switch (internal_name) {
    case 'section':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
        },
      };
    case 'single_line':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          placeholder: { type: 'string', label: 'Placeholder' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'string', label: 'Default Value' },
          // maxLength: { type: 'number', label: 'Max Length' },
          // minLength: { type: 'number', label: 'Min Length' },
          pattern: { type: 'string', label: 'Pattern' },
        },
      };

    case 'Multi_Line':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          placeholder: { type: 'string', label: 'Placeholder' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'string', label: 'Default Value' },
          // maxLength: { type: 'number', label: 'Max Length' },
          // minLength: { type: 'number', label: 'Min Length' },
          // pattern: { type: 'string', label: 'Pattern' },
        },
      };
    case 'Number':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          placeholder: { type: 'string', label: 'Placeholder' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'number', label: 'Default Value' },
          // max: { type: 'number', label: 'Max Length' },
          // min: { type: 'number', label: 'Min Length' },
          pattern: { type: 'string', label: 'Pattern' },
        },
      };
    case 'dropdown':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          placeholder: { type: 'string', label: 'Placeholder' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'string', label: 'Default Value' },
          options: { type: 'options', label: 'Options' },
        },
      };
    case 'Radio':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'string', label: 'Default Value' },
          options: { type: 'options', label: 'Options' },
        },
      };
    case 'Image Upload':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          options: { type: 'options', label: 'Options' },
        },
      };
    case 'File Upload':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          title: { type: 'string', label: 'title' },
        },
      };
    case 'Description':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          placeholder: { type: 'string', label: 'placeholder' },
          maxLength: { type: 'number', label: 'Max Length' },
          minLength: { type: 'number', label: 'Min Length' },
        },
      };

    case 'Name':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          placeholder: { type: 'string', label: 'Placeholder' },
          required: { type: 'boolean', label: 'Required' },
          maxLength: { type: 'number', label: 'Max Length' },
          minLength: { type: 'number', label: 'Min Length' },
        },
      };
    case 'Email':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          placeholder: { type: 'string', label: 'Placeholder' },
          required: { type: 'boolean', label: 'Required' },
          maxLength: { type: 'number', label: 'Max Length' },
          minLength: { type: 'number', label: 'Min Length' },
          pattern: { type: 'string', label: 'Pattern' },
        },
      };
    case 'Address':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          placeholder: { type: 'string', label: 'Placeholder' },
          required: { type: 'boolean', label: 'Required' },
          maxLength: { type: 'number', label: 'Max Length' },
          minLength: { type: 'number', label: 'Min Length' },
        },
      };
    case 'Phone':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          placeholder: { type: 'string', label: 'Placeholder' },
          maxLength: { type: 'number', label: 'Max Length' },
          minLength: { type: 'number', label: 'Min Length' },
          pattern: { type: 'string', label: 'Pattern' },
        },
      };
    case 'Unique_ID': {
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          placeholder: { type: 'string', label: 'Placeholder' },
          required: { type: 'boolean', label: 'Required' },
          maxLength: { type: 'number', label: 'Max Length' },
          minLength: { type: 'number', label: 'Min Length' },
          pattern: { type: 'string', label: 'pattern' },
        },
      };
    }
    case 'Date': {
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          minDate: { type: 'number', label: 'MinDate' },
        },
      };
    }
    case 'Time': {
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          //defaultValue: { type: 'string', label: 'defaultValue' },
          placeholder: { type: 'string', label: 'Placeholder' },
        },
      };
    }
    case 'Date-Time': {
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          placeholder: { type: 'string', label: 'Placeholder' },
        },
      };
    }
    case 'Checkbox': {
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'string', label: 'Default Value' },
          options: { type: 'options', label: 'Options' },
        },
      };
    }
    case 'Star-Rating': {
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
        },
      };
    }
    case 'Button':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
        },
      };
    case 'Toggle':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
        },
      };
    case 'URL':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          placeholder: { type: 'string', label: 'Placeholder' },
          pattern: { type: 'string', label: 'Pattern' },
          maxLength: { type: 'number', label: 'Max Length' },
          minLength: { type: 'number', label: 'Min Length' },
        },
      };
    case 'Close Button':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
        },
      };
    case 'Button Dropdown':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'string', label: 'Default Value' },
          placeholder: { type: 'string', label: 'Placeholder' },
          options: { type: 'options', label: 'Options' },
        },
      };
    case 'Toggle Button':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'string', label: 'Default Value' },
          options: { type: 'options', label: 'Options' },
        },
      };
    case 'Link':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          placeholder: { type: 'string', label: 'Placeholder' },
          // link: { type: 'string', label: 'Link type' },
          // pattern: { type: 'string', label: 'Pattern' },
          // max: { type: 'number', label: 'Max Length' },
          // min: { type: 'number', label: 'Min Length' },
        },
      };
    case 'Link List':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          placeholder: { type: 'string', label: 'Placeholder' },
          pattern: { type: 'string', label: 'Pattern' },
          maxLength: { type: 'number', label: 'Max Length' },
          minLength: { type: 'number', label: 'Min Length' },
        },
      };

    case 'Toggle Link':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'string', label: 'Default Value' },
          options: { type: 'options', label: 'Options' },
        },
      };

    case 'Button Groups':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'string', label: 'Default Value' },
          options: { type: 'options', label: 'Options' },
          maxLength: { type: 'number', label: 'Max Length' },
          minLength: { type: 'number', label: 'Min Length' },
        },
      };
    case 'Color Input':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'string', label: 'Default Value' },
          // id: { type: 'string', label: 'id' },
        },
      };
    case 'File Button':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'string', label: 'Default Value' },
          options: { type: 'options', label: 'Options' },
        },
      };
    case 'File Dropzone':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'string', label: 'Default Value' },
          options: { type: 'options', label: 'Options' },
          maxFile: { type: 'number', label: 'MaxFile' },
          minFile: { type: 'number', label: 'MinFile' },
        },
      };
    case 'File Input':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          placeholder: { type: 'string', label: 'Placeholder' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'string', label: 'Default Value' },
          options: { type: 'options', label: 'Options' },
        },
      };
    case 'Microphone':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          options: { type: 'options', label: 'Options' },
        },
      };
    case 'Scanner':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'string', label: 'Default Value' },
          options: { type: 'options', label: 'Options' },
          maxFile: { type: 'number', label: 'MaxFile' },
          minFile: { type: 'number', label: 'MinFile' },
        },
      };
    case 'Signature':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          // defaultValue: { type: 'string', label: 'Default Value' },
          options: { type: 'options', label: 'Options' },
          max: { type: 'number', label: 'Max' },
          min: { type: 'number', label: 'Min' },
        },
      };
    case 'Timer':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
        },
      };
    case 'Chat':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          placeholder: { type: 'string', label: 'placeholder' },
          defaultValue: { type: 'string', label: 'Default Value' },
          maxLength: { type: 'number', label: 'Max' },
          minLength: { type: 'number', label: 'Min' },
          authentication: { type: 'boolean', label: 'authentication' },
        },
      };
    case 'Annotation Text':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'string', label: 'Default Value' },
          maxLength: { type: 'number', label: 'Max' },
          minLength: { type: 'number', label: 'Min' },
        },
      };
    case 'Text Input':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'string', label: 'Default Value' },
          placeholder: { type: 'string', label: 'placeholder' },
          maxLength: { type: 'number', label: 'Max' },
          minLength: { type: 'number', label: 'Min' },
        },
      };
    case 'Form':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          maxLength: { type: 'number', label: 'Max' },
          minLength: { type: 'number', label: 'Min' },
        },
      };
    case 'Select':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'string', label: 'Default Value' },
          options: { type: 'options', label: 'Options' },
          maxLength: { type: 'number', label: 'Max' },
          minLength: { type: 'number', label: 'Min' },
        },
      };
    case 'Image':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          options: { type: 'options', label: 'Options' },
          max: { type: 'number', label: 'Max' },
          min: { type: 'number', label: 'Min' },
        },
      };
    case 'Editable Text':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'string', label: 'defaultValue' },
          options: { type: 'options', label: 'Options' },
          max: { type: 'number', label: 'Max' },
          min: { type: 'number', label: 'Min' },
        },
      };
    case 'Editable TextArea':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          placeholder: { type: 'string', label: 'Placeholder' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'string', label: 'Default Value' },
          maxLength: { type: 'number', label: 'Max Length' },
          minLength: { type: 'number', label: 'Min Length' },
          pattern: { type: 'string', label: 'Pattern' },
        },
      };
    case 'Password':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          placeholder: { type: 'string', label: 'Placeholder' },
          required: { type: 'boolean', label: 'Required' },
          maxLength: { type: 'number', label: 'Max Length' },
          minLength: { type: 'number', label: 'Min Length' },
          pattern: { type: 'string', label: 'Pattern' },
        },
      };
    case 'lookup':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          entity: { type: 'lookup', label: 'Entity' },
          entityColumn: { type: 'lookupcolumn', label: 'Entity Column' },
          entityType: { type: 'lookuptype', label: 'Entity Type' },
        },
      };
    default:
      return {
        component: <div>Not Found</div>,
        properties: {},
      };
  }
};

export default controlls;
