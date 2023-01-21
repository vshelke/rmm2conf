import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { createClient, Provider } from "urql";

const client = createClient({
  url: "https://hasura.kinescope.systems/v1/graphql",
  fetchOptions: () => {
    return {
      headers: { "x-hasura-admin-secret": "ioywegbhjlksdhnfuipq" },
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
