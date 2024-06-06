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
