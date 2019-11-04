import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { getToken } from './../utils/auth'
const isProduction = process.env.NODE_ENV !== 'development';

const productionUrl = process.env.REACT_APP_BASE_API + '/admingq/graphql/';
const testUrl = process.env.REACT_APP_BASE_API + '/admingq/graphql/';

  
const url = isProduction ? productionUrl : testUrl;

// var strToken = 'Token ' + getToken()
// const token = 'c7aa0dc9f76b3fbcf5d1b7453d3ea163f25d2f2a' // + getToken()
const token =  getToken()
console.log('Sending Authorization as ' + token)

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const httpLink = createHttpLink({
  uri: url,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  const token = getToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : "",
      authorization: token ? `Token ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});
//

export default client;