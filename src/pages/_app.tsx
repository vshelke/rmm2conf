import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { createClient, Provider } from "urql";

const client = createClient({
  url: "https://trusting-civet-35.hasura.app/v1/graphql",
  fetchOptions: () => {
    return {
      headers: { "x-hasura-admin-secret": "do5675mitMiR50aIxNs1rUjLwddC4b76eO6f2m3NbTS9A5gGz8chrf8aG5a41xKK" },
    };
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}
