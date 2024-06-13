// const { default: apiInstance } = require('./instance');

// export const getPages = async (entity_id) => {
//   let data = await apiInstance.get('/pages?entity_id=' + entity_id);
//   return data;
// };

// export const getPageDetails = async (page_id) => {
//   let data = await apiInstance.get('/pages/page?id=' + page_id);
//   return data;
// };
// export const createPage = async (data) => {
//   let response = await apiInstance.post('/pages', data);
//   return response;
// };

// export const updatePage = async (page_id, data) => {
//   let response = await apiInstance.put('/pages?id=' + page_id, data);
//   return response;
// };
// src/Requests/page.js
import { gql } from '@apollo/client';
import client from '../ApolloClient.js';

export const GET_PAGES = gql`
  query GetPages($entity_id: ID!) {
    pages(entity_id: $entity_id) {
      id
      name
      entity_id
      description
      form_schema
      form_data
      type
    }
  }
`;

// export const CREATE_PAGE = gql`
//   mutation CreatePage(
//     $name: String!,
//     $entity_id: ID,
//     $description: String,
//     $form_schema: [String],
//     $form_data: JSON,
//     $type: String
//   ) {
//     createPage(
//       name: $name,
//       entity_id: $entity_id,
//       description: $description,
//       form_schema: $form_schema,
//       form_data: $form_data,
//       type: $type
//     ) {
//       id
//       name
//       entity_id
//       description
//       form_schema
//       form_data
//       type
//     }
//   }
// `;
export const UPDATE_PAGE = gql`
  mutation UpdatePage(
    $id: ID!
    $name: String
    $entity_id: ID
    $description: String
    $form_schema: [String]
    $form_data: JSON
    $type: String
  ) {
    updatePage(
      id: $id
      name: $name
      entity_id: $entity_id
      description: $description
      form_schema: $form_schema
      form_data: $form_data
      type: $type
    ) {
      id
      name
      entity_id
      description
      form_schema
      form_data
      type
    }
  }
`;
export const getPages = async (entity_id) => {
  const { data } = await client.query({
    query: GET_PAGES,
    variables: { entity_id },
    fetchPolicy: 'no-cache',
  });
  return data.pages;
};

// export const savePage = async (pageData) => {
//   debugger;
//   const { data } = await client.mutate({
//     mutation: CREATE_PAGE,
//     variables: pageData,
//   });
//   console.log("data.createPage", data)
//   return data.createPage;

// };

export const updatePage = async (pageData) => {
  const { data } = await client.mutate({
    mutation: UPDATE_PAGE,
    variables: pageData,
  });
  return data.updatePage;
};

// export const PAGINATED_PAGES = gql`
//   query PaginatedPages(
//  $page: Int, $limit: Int, $sort: SortInput, $search: SearchInput, $filter: FilterInput

//   ) {
//     paginatedPages(
//      page: $page, limit: $limit, sort: $sort, search: $search, filter: $filter
//     ) {
//       pages {
//       id
//       name
//       entity_id
//       description
//       form_schema
//       form_data
//       type
//       }
//       totalPages
//       hasNextPage
//       hasPreviousPage
//     }
//   }
// `;
export const CREATE_PAGE = gql`
  mutation CreatePage(
    $name: String!
    $entity_id: ID
    $description: String
    $form_schema: [String]
    $form_data: JSON
    $type: String
  ) {
    createPage(
      name: $name
      entity_id: $entity_id
      description: $description
      form_schema: $form_schema
      form_data: $form_data
      type: $type
    ) {
      id
      name
      entity_id
      description
      form_schema
      form_data
      type
    }
  }
`;

// Function to call the mutation
export const savePage = async (pageData) => {
  debugger;
  try {
    const { data } = await client.mutate({
      mutation: CREATE_PAGE,
      variables: pageData,
    });
    debugger;
    console.log('data.createPage', CREATE_PAGE);
    return data.createPage;
  } catch {
    console.log('data.createPage', CREATE_PAGE);
    console.log('error');
  }
};
export const PAGINATED_PAGES = gql`
  query PaginatedPages(
    $page: Int
    $limit: Int
    $sort: SortInput
    $search: SearchInput
    $filter: FilterInput
  ) {
    paginatedPages(
      page: $page
      limit: $limit
      sort: $sort
      search: $search
      filter: $filter
    ) {
      pages {
        id
        name
        entity_id
        description
        form_schema
        form_data
        type
      }
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`;

export const PaginatedPages = async (pagedata) => {
  const { data } = await client.query({
    query: PAGINATED_PAGES,
    variables: pagedata,
    fetchPolicy: 'no-cache',
  });
  return data.paginatedPages;
};
export const PAGINATED_NEW_PAGES = gql`
  query PaginatedNewPages(
    $page: Int
    $limit: Int
    $sort: SortInput
    $search: SearchInput
    $filter: FilterInput
  ) {
    paginatedNewPages(
      page: $page
      limit: $limit
      sort: $sort
      search: $search
      filter: $filter
    ) {
      pages {
        id
        name
        entity_id
        description
        form_schema {
          control
          properties {
            displayName {
              value
              options
            }
            placeholder {
              value
              options
            }
            required {
              value
              label
            }
            defaultValue {
              value
              options
            }
            pattern {
              value
              options
            }
            value
          }
        }
        type
      }
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`;

export const getPaginatedNewPages = async ({
  page,
  limit,
  sort,
  search,
  filter,
}) => {
  const { data } = await client.query({
    query: PAGINATED_NEW_PAGES,
    variables: { page, limit, sort, search, filter },
    fetchPolicy: 'no-cache',
  });
  return data.paginatedNewPages;
};
// export const PaginatedPages = async (
// pagedata
// ) => {
//   debugger;
//    console.log('PaginatedPages ?????????????',  pagedata)

//   const { data } = await client.query({
//     query: PAGINATED_PAGES,
//     variables: {
//       "page": pagedata?.page,
//       "limit": pagedata?.limit,
//       "sort": pagedata?.sort,
//       "search": pagedata?.search,
//       "filter":pagedata?.filter
//       },
//     fetchPolicy: 'no-cache',
//   });
//   console.log('PaginatedPages>>>>>>>>',data.paginatedPages)
//   return data.paginatedPages;
// };

// GraphQL query to fetch page details
export const GET_PAGE_DETAILS = gql`
  query GetPageDetails($id: ID!) {
    getPageDetails(id: $id) {
      id
      name
      entity_id
      description
      form_schema
      form_data
      type
    }
  }
`;

// Function to fetch page details
export const getPageDetails = async (pageId) => {
  try {
    const { data } = await client.query({
      query: GET_PAGE_DETAILS,
      variables: { id: pageId },
    });
    return data.getPageDetails;
  } catch (error) {
    console.error('Error fetching page details:', error);
    throw error;
  }
};

export const GET_NEW_PAGE = gql`
  query GetNewPage($id: ID!) {
    getNewPage(id: $id) {
      id
      name
      entity_id
      description
      form_schema {
        control
        properties {
          displayName {
            value
            options
          }
          placeholder {
            value
            options
          }
          required {
            value
            label
          }
          defaultValue {
            value
            options
          }
          pattern {
            value
            options
          }
          value
        }
      }
      type
    }
  }
`;

export const getNewPage = async (pageId) => {
  try {
    const { data } = await client.query({
      query: GET_NEW_PAGE,
      variables: { id: pageId },
    });
    return data.getNewPage;
  } catch (error) {
    console.error('Error fetching new page:', error);
    throw error;
  }
};
