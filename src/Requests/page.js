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
export const getPages = async (entity_id) => {
  console.log('object', entity_id);
  const { data } = await client.query({
    query: GET_PAGES,
    variables: { entity_id },
    fetchPolicy: 'no-cache',
  });
  console.log(' data.pages', data.pages);
  return data.pages;
};

export const UPDATE_PAGE = gql`
  mutation UpdatePage($id: ID!, $input: NewPageInput!) {
    updatePage(id: $id, input: $input) {
      id
      name
      entity_id
      description
      form_schema
      type
    }
  }
`;

export const UpdatePage = async (pageData) => {
  const { data } = await client.mutate({
    mutation: UPDATE_PAGE,
    variables: pageData,
  });
  return data.updatePage;
};

export const CREATE_PAGE = gql`
  mutation CreatePage($input: NewPageInput!) {
    createPage(input: $input) {
      id
      name
      entity_id
      description
      form_schema
      type
    }
  }
`;

// Function to call the mutation
export const createPage = async (pageData) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_PAGE,
      variables: { input: pageData },
    });

    console.log('data.createPage', CREATE_PAGE);
    return data.createPage;
  } catch {
    console.log('data.createPage', CREATE_PAGE);
    console.log('error');
  }
};

export const PAGINATED_NEW_PAGES = gql`
  query PaginatedPages(
    $page: Int!
    $limit: Int!
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
        type
      }
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`;

export const PaginatedPages = async ({ page, limit, sort, search, filter }) => {
  console.log('Fetching with parameters:', {
    page,
    limit,
    sort,
    search,
    filter,
  });
  try {
    const { data } = await client.query({
      query: PAGINATED_NEW_PAGES,
      variables: { page, limit, sort, search, filter },
      fetchPolicy: 'no-cache',
    });
    console.log('Data fetched:', data);
    return data.paginatedPages;
  } catch (error) {
    console.error('Error in query:', error);
    throw error;
  }
};

// GraphQL query to fetch page details
export const GET_PAGE_DETAILS = gql`
  query GetPageById($id: ID!) {
    getPagebyid(id: $id) {
      id
      name
      entity_id
      description
      form_schema
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
    return data;
  } catch (error) {
    console.error('Error fetching page details:', error);
    throw error;
  }
};

export const GET_NEW_PAGE = gql`
  query GetPageById($id: ID!) {
    getPagebyid(id: $id) {
      id
      name
      entity_id
      description
      form_schema
      type
    }
  }
`;

export const getNewPage = async (pageId) => {
  console.log('pageId', pageId);
  try {
    const { data } = await client.query({
      query: GET_NEW_PAGE,
      variables: { id: pageId },
    });
    return data.getPagebyid; // Corrected query name
  } catch (error) {
    console.error('Error fetching new page:', error);
    throw new Error('Error fetching new page');
  }
};
