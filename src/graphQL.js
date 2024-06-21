import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({
    uri: 'http://localhost:9966/graphql',
    // uri: 'https://quikitbackend.moreyeahs.in/graphql'
  }),
]);
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
