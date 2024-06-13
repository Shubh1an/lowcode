const { default: apiInstance } = require('./instance');

export const fillData = async (data) => {
  let response = await apiInstance.post('/filledData', data);
  return response;
};

export const getFillData = async (id) => {
  let response = await apiInstance.get('/filledData');
  return response;
};
import { gql } from '@apollo/client';
import client from '../ApolloClient.js';

export const PAGINATED_FILLED_DATA = gql`
  query PaginatedFilledData(
    $page: Int
    $limit: Int
    $sort: SortInput
    $search: SearchInput
    $filter: FilterInput
  ) {
    paginatedFilledData(
      page: $page
      limit: $limit
      sort: $sort
      search: $search
      filter: $filter
    ) {
      filledData {
        id
        page_id
        form_data
      }
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`;

export const getPaginatedFilledData = async ({
  page,
  limit,
  sort,
  search,
  filter,
}) => {
  const { data } = await client.query({
    query: PAGINATED_FILLED_DATA,
    variables: { page, limit, sort, search, filter },
    fetchPolicy: 'no-cache',
  });
  return data.paginatedFilledData;
};
