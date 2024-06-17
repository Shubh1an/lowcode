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
        // console.log('Res', res);
        return res.data;
      });
  } catch (error) {
    console.error('Error fetching enity:', error);
  }
};

export const GET_PAGES_BY_ENTITY = gql`
  query ($entity_id: ID!) {
    getPagebyEntityid(entity_id: $entity_id) {
      id
      name
      entity_id
      description
      form_schema
      type
    }
  }
`;

export const getPagebyEntityid = async (entity_id) => {
  try {
    return await client
      .query({
        query: GET_PAGES_BY_ENTITY,
        fetchPolicy: 'no-cache',
        variables: { entity_id },
      })
      .then((res) => {
        console.log('Res for raw', res);
        return res.data;
      });
  } catch (error) {
    console.error('Error fetching enity:', error);
  }
};

export const GET_PAGES_BY_Id = gql`
  query ($getPageId: ID!) {
    getPagebyid(id: $getPageId) {
      id
      name
      description
      form_schema
      type
    }
  }
`;

export const getPagebyid = async (getPageId) => {
  try {
    return await client
      .query({
        query: GET_PAGES_BY_Id,
        fetchPolicy: 'no-cache',
        variables: { getPageId },
      })
      .then((res) => {
        // console.log('Res', res);
        return res.data;
      });
  } catch (error) {
    console.error('Error fetching enity:', error);
  }
};

export const GET_VIWES_BY_Id = gql`
  query ($pageId: ID!) {
    getFilledData(page_id: $pageId) {
      id
      form_data
      page_id
    }
  }
`;

export const getFilledData = async (pageId) => {
  try {
    return await client
      .query({
        query: GET_VIWES_BY_Id,
        fetchPolicy: 'no-cache',
        variables: { pageId },
      })
      .then((res) => {
        console.log('Res', res);
        return res.data;
      });
  } catch (error) {
    console.error('Error fetching enity:', error);
  }
};
