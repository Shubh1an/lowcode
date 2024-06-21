// src/ApolloClient.js
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import config from './Config/config.js';

// const client = new ApolloClient({
//   uri: config.BASE_URL,
//   cache: new InMemoryCache(),
// });

// const ApolloClientProvider = ({ children }) => {
//   return <ApolloProvider client={client}>{children}</ApolloProvider>;
// };

// export default ApolloClientProvider;

// src/apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  // uri: config.BASE_URL, // Update this to your GraphQL endpoint
  uri: 'http://localhost:9966/graphql',
  //uri: 'https://quikitbackend.moreyeahs.in/graphql',
  cache: new InMemoryCache(),
});

// const ApolloProviderComponent = ({ children }) => (
//   <ApolloProvider client={client}>{children}</ApolloProvider>
// );
export default client;
