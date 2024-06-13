import { gql } from '@apollo/client';
import client from '../graphQL';

export const CREATE_MODULE = gql`
  mutation CreateModule($name: String!, $description: String) {
    createModule(name: $name, description: $description) {
      name
      description
    }
  }
`;

export const saveModule = async (data) => {
  try {
    return client
      .mutate({
        mutation: CREATE_MODULE,
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
export const Create_Filled = gql`
  mutation ($page_id: ID!, $form_data: JSON) {
    createFilledData(page_id: $page_id, form_data: $form_data) {
      id
      form_data
    }
  }
`;

export const createFilledData = async (data) => {
  const { page_id, form_data } = data;

  try {
    return client
      .mutate({
        mutation: Create_Filled,
        variables: { page_id, form_data },
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

export const UpdatePageBYId = gql`
  mutation ($updatePageId: ID!, $form_schema: JSON) {
    updatePage(id: $updatePageId, form_schema: $form_schema) {
      id
      form_schema
    }
  }
`;

export const updatePage = async (updatePageId, form_schema) => {
  try {
    return client
      .mutate({
        mutation: UpdatePageBYId,
        variables: { updatePageId, form_schema },
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
export const UpdatePage_filledData = gql`
  mutation ($id: ID!, $form_data: JSON) {
    updateFilledData(id: $id, form_data: $form_data) {
      id
      page_id
      form_data
    }
  }
`;

export const updateFilledData = async (id, form_data) => {
  try {
    return client
      .mutate({
        mutation: UpdatePage_filledData,
        variables: { id, form_data },
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
