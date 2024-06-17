// import apiInstance from './instance';

// export const getEntities = async (module_id) => {
//   let data = await apiInstance.get('/entities?module_id=' + module_id);
//   return data;
// };

// export const saveEntity = async (data) => {
//   let response = await apiInstance.post('/entities', data);

//   return response;
// };
import { gql } from '@apollo/client';
import client from '../ApolloClient.js';

export const GET_ENTITIES = gql`
  query GetEntities($module_id: ID!) {
    entities(module_id: $module_id) {
      id
      name
      description
      module_id
    }
  }
`;

export const CREATE_ENTITY = gql`
  mutation CreateEntity($name: String!, $description: String, $module_id: ID) {
    createEntity(
      name: $name
      description: $description
      module_id: $module_id
    ) {
      id
      name
      description
      module_id
    }
  }
`;

export const getEntities = async (module_id) => {
  const { data } = await client.query({
    query: GET_ENTITIES,
    variables: { module_id },
    fetchPolicy: 'no-cache',
  });
  return data.entities;
};

export const saveEntity = async (entityData) => {
  const { data } = await client.mutate({
    mutation: CREATE_ENTITY,
    variables: entityData,
  });
  return data.createEntity;
};

export const PAGINATED_ENTITIES = gql`
  query PaginatedEntities(
    $page: Int
    $limit: Int
    $sort: SortInput
    $search: SearchEntityInput
    $filter: FilterEntityInput
  ) {
    paginatedEntities(
      page: $page
      limit: $limit
      sort: $sort
      search: $search
      filter: $filter
    ) {
      entities {
        id
        name
        description
        module_id
      }
      totalEntities
      hasNextPage
      hasPreviousPage
    }
  }
`;

export const getPaginatedEntities = async ({
  page,
  limit,
  sort,
  search,
  filter,
}) => {
  const { data } = await client.query({
    query: PAGINATED_ENTITIES,
    variables: { page, limit, sort, search, filter },
    fetchPolicy: 'no-cache',
  });
  return data.paginatedEntities;
};
