// src/components/CreateEntity.js
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_ENTITY = gql`
  mutation CreateEntity($name: String!, $description: String, $module_id: ID) {
    createEntity(
      name: $name
      description: $description
      module_id: $module_id
    ) {
      id
      name
      description
    }
  }
`;

const CreateEntity = ({ moduleId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createEntity, { data, loading, error }] = useMutation(CREATE_ENTITY);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEntity({
        variables: { name, description, module_id: moduleId },
      });
      setName('');
      setDescription('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        Create
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Entity created: {data.createEntity.name}</p>}
    </form>
  );
};

export default CreateEntity;
