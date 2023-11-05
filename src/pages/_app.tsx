import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import { Provider } from "react-redux";

import { store } from "~/redux/store";
import "~/styles/globals.scss";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
};

export default MyApp;
