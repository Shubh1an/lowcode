import { gql } from '@apollo/client';
import client from '../graphQL';

export const GET_MODULES = gql`
  query getModules {
    modules {
      id
      name
      description
    }
  }
`;

export const getModules = async () => {
  const response = await client.query({
    query: GET_MODULES,
    fetchPolicy: 'no-cache',
  });
  return response.data;
};

export const GET_ENTITY_BY_MODULEID = gql`
  query {
    entities(module_id: Id) {
      id
      name
      description
    }
  }
`;

export const entities = async (module_id) => {
  const response = await client.query({
    query: GET_ENTITY_BY_MODULEID,
    fetchPolicy: 'no-cache',
  });
  return response.data;
};
