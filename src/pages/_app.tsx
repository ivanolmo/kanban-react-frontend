import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { AppType } from "next/app";
import { Provider as StoreProvider } from "react-redux";

import { store } from "~/store/store";
import "~/styles/globals.scss";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <StoreProvider store={store}>
      <SessionProvider>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </StoreProvider>
  );
};

export default MyApp;
