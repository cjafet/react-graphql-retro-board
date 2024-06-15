import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, HttpLink, split, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const GRAPHQL_SERVER = process.env.REACT_APP_GRAPHQL_SERVER || 7000;
console.log(GRAPHQL_SERVER);

const httpLink = new HttpLink({ uri: GRAPHQL_SERVER })

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://graphql-5a92c0ee750b.herokuapp.com/subscriptions",
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
  
// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: from([errorLink, httpLink]),
//   // fetchPolicy: 'cache-and-network'
// });

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  fetchPolicy: "no-cache",
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
