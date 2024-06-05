import React from 'react'
import { useDrop } from 'react-dnd';
const controlls = (internal_name, children) => {

  switch (internal_name) {
    case 'section':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
        }
      }
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
        }
      }

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
        }
      }

    case 'dropdown':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          defaultValue: { type: 'string', label: 'Default Value' },
          options: { type: 'options', label: 'Options' },
        }
      }

    case 'lookup':
      return {
        properties: {
          displayName: { type: 'string', label: 'Display Name' },
          required: { type: 'boolean', label: 'Required' },
          entity: { type: 'lookup', label: 'Entity' },
          entityType: { type: 'lookuptype', label: 'Entity Type' },
        }
      }


    default:
      return {
        component: <div>Not Found</div>,
        properties: {}
      }
  }
}

export default controlls