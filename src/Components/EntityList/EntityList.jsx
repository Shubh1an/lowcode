// src/components/EntityList.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ENTITIES = gql`
  query GetEntities {
    entities {
      id
      name
      description
    }
  }
`;

const EntityList = () => {
  const { loading, error, data } = useQuery(GET_ENTITIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.entities.map((entity) => (
        <li key={entity.id}>
          <h3>{entity.name}</h3>
          <p>{entity.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default EntityList;
