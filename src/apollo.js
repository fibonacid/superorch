import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = new HttpLink({
   credentials: 'same-origin',
   uri: 'http://localhost:5000/graphql'
});

const authLink = setContext((_, { headers }) => {
   // get the authentication token from local storage if it exists
   const token = localStorage.getItem('token');
   // return the headers to the context so httpLink can read them
   return {
     headers: {
       ...headers,
       "Authorization": token ? `Bearer ${token}` : "",
     }
   }
 });

const wsLink = new WebSocketLink({
   uri: 'ws://localhost:5000/graphql',
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
   // split based on operation type
   ({ query }) => {
      const definition = getMainDefinition(query);
      return (
         definition.kind === 'OperationDefinition' &&
         definition.operation === 'subscription'
      );
   },
   wsLink,
   authLink.concat(httpLink),
);

export default function configureClient() {
   return new ApolloClient({
      link, 
      cache: new InMemoryCache(), 
   });
}