import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from 'apollo-boost'
import { getToken } from './../utils/auth'
// import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost'
const isProduction = process.env.NODE_ENV !== 'development';

// const productionUrl = 'http://localhost:9527/admingq/graphql/';
// const testUrl = 'http://localhost:9527/admingq/graphql/';

const productionUrl = process.env.REACT_APP_BASE_API + '/admingq/graphql/';
const testUrl = process.env.REACT_APP_BASE_API + '/admingq/graphql/';

  
const url = isProduction ? productionUrl : testUrl;

// var strToken = 'Token ' + getToken()
// const token = 'c7aa0dc9f76b3fbcf5d1b7453d3ea163f25d2f2a' // + getToken()
const token =  getToken()
console.log('Sending Authorization as ' + token)
const httpLink = new HttpLink({ uri: url });
const authLink = new ApolloLink((operation, forward) => {
// // Retrieve the authorization token from local storage.
// const token = localStorage.getItem('auth_token');

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Token ${token}` : ''
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

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

let client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink  
  cache:new InMemoryCache(),    
  defaultOptions: defaultOptions,
})

  
  export default client;