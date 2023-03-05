/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import type { AppProps } from "next/app";

import { MintProvider } from "@/hooks/mint";

import "../../styles/globals.scss";
import { AuthProvider } from "@/Auth/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MintProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </MintProvider>
  );
}

export default MyApp;
