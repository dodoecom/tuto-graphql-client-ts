import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Change this to your GraphQL API
  cache: new InMemoryCache(),
  link: new HttpLink({ 
    uri: "http://localhost:4000/graphql", 
    credentials: "same-origin",
    // fetchOptions: {
    //   method: "GET", // Force GET requests
    // }, 
  }),
});

export default client;
