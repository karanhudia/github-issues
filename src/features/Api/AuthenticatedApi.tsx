import React from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

type AuthenticatedApiProps = {
    children: React.ReactElement | React.ReactElement[];
};

export const AuthenticatedApi = ({ children }: AuthenticatedApiProps) => {
    const httpLink = createHttpLink({
        uri: process.env.REACT_APP_GITHUB_URL,
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
            },
        };
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache({
            addTypename: true,
        }),
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
