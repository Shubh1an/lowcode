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
          maxLength: { type: 'number', label: 'Max Length' },
          minLength: { type: 'number', label: 'Min Length' },
          pattern: { type: 'string', label: 'Pattern' },
        },
      };

    case 'multi_line':
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

    case 'dropdown':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
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
    case 'Number':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'number', label: 'Default Value' },
          max: { type: 'number', label: 'Max Length' },
          min: { type: 'number', label: 'Min Length' },
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
          placeholder: { type: 'string', label: 'Placeholder' },
          required: { type: 'boolean', label: 'Required' },
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
        },
      };
    }
    case 'Date': {
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
        },
      };
    }
    case 'Time': {
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
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
    case 'Avatar':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          options: { type: 'options', label: 'Options' },
        },
      };
    case 'Circular Image':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          options: { type: 'options', label: 'Options' },
        },
      };
    case 'Icon':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          options: { type: 'options', label: 'Options' },
        },
      };
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
          pattern: { type: 'string', label: 'Pattern' },
          maxLength: { type: 'number', label: 'Max Length' },
          minLength: { type: 'number', label: 'Min Length' },
        },
      };
    case 'lookup':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          entity: { type: 'lookup', label: 'Entity' },
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
