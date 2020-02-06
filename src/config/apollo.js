import { ApolloClient } from "apollo-boost";
import { toIdValue } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { ApolloLink, split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { onError } from "apollo-link-error";
import { getMainDefinition } from "apollo-utilities";

//
// Formats GraphQL errors
//
const errorlink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

//
// Sets Authorization header for every http request
//
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ""
    }
  };
});

//
// Composes https links into a single entity
//
const httpLink = ApolloLink.from([
  authLink,
  errorlink,
  new HttpLink({
    credentials: "same-origin",
    uri: "http://localhost:5000/graphql"
  })
]);

//
// Create Websocket link
//
const wsLink = new WebSocketLink({
  uri: "ws://localhost:5000/graphql"
});

const subscriptionMiddleware = {
  applyMiddleware: (options, next) => {
    options.authToken = localStorage.getItem("token");
    next();
  }
};

wsLink.subscriptionClient.use([subscriptionMiddleware]);

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      // orchestra: (_, args) => (
      //   toIdValue(
      //     cache.config.dataIdFromObject({ __typename: "Orchestra", _id: args.id })
      //   )
      // ),
      // channel: (_, args) => (
      //   toIdValue(
      //     cache.config.dataIdFromObject({ __typename: "Channel", _id: args.id })
      //   )
      // ),
      // member: (_, args) => (
      //   toIdValue(
      //     cache.config.dataIdFromObject({ __typename: "Member", _id: args.id })
      //   )
      // )
    }
  }
});

export default function configureClient() {
  return new ApolloClient({
    link,
    cache,
    connectToDevTools: process.env.NODE_ENV !== "production"
  });
}
