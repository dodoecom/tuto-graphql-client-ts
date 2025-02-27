"use client"; // Mark this as a Client Component

import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
