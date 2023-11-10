import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { AppType } from "next/app";
import { Provider } from "react-redux";

import { setupStore } from "~/store";

import "~/styles/globals.scss";

const store = setupStore();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <SessionProvider>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  );
};

export default MyApp;
