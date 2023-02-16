import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import LayoutProvider from "../rharuow-admin/context/Layout";
import SessionProvider from "../rharuow-admin/context/Session";

config.autoAddCss = false;
import "../styles/main.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <LayoutProvider>
        <Component {...pageProps} />
      </LayoutProvider>
    </SessionProvider>
  );
}
