// import apiInstance from './instance';

// export const getModules = async () => {
//   let data = await apiInstance.get('/modules');
//   return data;
// };

// export const saveModule = async (data) => {
//   let response = await apiInstance.post('/modules', data);

//   return response;
// };

// export const PAGINATED_MODELS_QUERY = gql`
//   query PaginatedModels($page: Int, $limit: Int, $sort: SortInput, $search: SearchModuleInput, $filter: FilterModuleInput) {
//     paginatedModels(page: $page, limit: $limit, sort: $sort, search: $search, filter: $filter) {
//       modules {
//         id
//         name
//         description
//       }
//       totalmodules
//       hasNextPage
//       hasPreviousPage
//     }
//   }
// `;

// export const getPaginatedModules = async (variables) => {
//   const { data } = await client.query({
//     query: GET_PAGINATED_MODULES,
//     variables,
//   });
//   return data.paginatedModels;
// };
import { gql } from '@apollo/client';
import client from '../ApolloClient.js';
export const PAGINATED_MODELS_QUERY = gql`
  query PaginatedModels(
    $page: Int
    $limit: Int
    $sort: SortInput
    $search: SearchModuleInput
    $filter: FilterModuleInput
  ) {
    paginatedModels(
      page: $page
      limit: $limit
      sort: $sort
      search: $search
      filter: $filter
    ) {
      modules {
        id
        name
        description
      }
      totalmodules
      hasNextPage
      hasPreviousPage
    }
  }
`;

export const getPaginatedModules = async (variables) => {
  const { data } = await client.query({
    query: PAGINATED_MODELS_QUERY,
    variables,
    fetchPolicy: 'no-cache',
  });
  return data.paginatedModels;
};

export const GET_MODULES = gql`
  query GetModules {
    modules {
      id
      name
      description
    }
  }
`;

export const SAVE_MODULE = gql`
  mutation CreateModule($name: String!, $description: String) {
    createModule(name: $name, description: $description) {
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

export const saveModule = async (data) => {
  try {
    return client
      .mutate({
        mutation: SAVE_MODULE,
        variables: { name: data.name, description: data.description },
      })
      .then((res) => {
        console.log('Res', res, 'At', Date.now());
        return res.data;
      });

    //return response.data;
  } catch (err) {
    console.log('err', err);
    return err;
  }
};
