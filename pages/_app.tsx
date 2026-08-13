import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client/react";
import { apolloPagesClient } from "@/lib/apollo-pages-client";
import "@/app/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloPagesClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
