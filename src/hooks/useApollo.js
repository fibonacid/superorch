import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

function useApollo(token) {
    
    const httpLink = new HttpLink({
        credentials: 'same-origin',
        uri: 'http://localhost:5000/graphql'
    });

    const wsLink = new WebSocketLink({
        uri: 'ws://localhost:5000/graphql',
        options: {
            reconnect: true,
            connectionParams: {
                authToken: token,
            }
        }
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
        httpLink,
    );
    
    const cache = new InMemoryCache();
    const client = new ApolloClient({ cache, link });

    return { client };
}

export default useApollo;