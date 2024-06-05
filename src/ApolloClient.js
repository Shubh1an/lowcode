// src/ApolloClient.js
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import config from './Config/config.js';

const client = new ApolloClient({
  uri: config.BASE_URL,
  cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
