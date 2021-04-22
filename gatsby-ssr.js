import React from 'react'
import fetch from 'cross-fetch'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
    uri: `https://api.multiasistir.com/graphql`,
    fetch
})

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)