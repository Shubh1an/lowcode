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
  query ($moduleId: ID) {
    entities(module_id: $moduleId) {
      id
      name
      description
    }
  }
`;

export const entities = async (moduleId) => {
  try {
    return await client
      .query({
        query: GET_ENTITY_BY_MODULEID,
        fetchPolicy: 'no-cache',
        variables: { moduleId },
      })
      .then((res) => {
        console.log('Res', res);
        return res.data;
      });
  } catch (error) {
    console.error('Error fetching enity:', error);
  }
};

export const GET_PAGES_BY_ENTITY = gql`
  query ($entityId: ID) {
    pages(entity_id: $entityId) {
      id
      name
      type
      description
      form_schema
    }
  }
`;

export const pages = async (entityId) => {
  try {
    return await client
      .query({
        query: GET_PAGES_BY_ENTITY,
        fetchPolicy: 'no-cache',
        variables: { entityId },
      })
      .then((res) => {
        console.log('Res', res);
        return res.data;
      });
  } catch (error) {
    console.error('Error fetching enity:', error);
  }
};
export const GET_PAGES_BY_Id = gql`
  query ($getPageId: ID!) {
    getPage(id: $getPageId) {
      id
      name
      type
      description
      form_schema
    }
  }
`;

export const getPage = async (getPageId) => {
  try {
    return await client
      .query({
        query: GET_PAGES_BY_Id,
        fetchPolicy: 'no-cache',
        variables: { getPageId },
      })
      .then((res) => {
        console.log('Res', res);
        return res.data;
      });
  } catch (error) {
    console.error('Error fetching enity:', error);
  }
};
