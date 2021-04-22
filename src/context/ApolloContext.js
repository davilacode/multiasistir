import ApolloClient from "apollo-boost"

export const client = new ApolloClient({
    uri: process.env.WPGRAPHQL_URL ||
    `https://api.multiasistir.com/graphql`
})