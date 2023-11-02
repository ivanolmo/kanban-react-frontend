import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";

import "~/styles/globals.scss";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
