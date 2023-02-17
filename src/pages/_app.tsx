import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import LayoutProvider from "../rharuow-admin/context/Layout";
import SessionProvider from "../rharuow-admin/context/Session";

config.autoAddCss = false;
import "../styles/main.scss";
import {
  faDashboard,
  faHome,
  faReceipt,
  faSignOut,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <LayoutProvider
        setMenuItems={[
          { text: "Dashboard", icon: faDashboard, router: "/" },
          { text: "Pedidos", icon: faReceipt, router: "/pedidos" },
          { text: "Carteira", icon: faWallet, router: "/wallet" },
          { text: "Sair", icon: faSignOut, router: "/signout" },
        ]}
      >
        <Component {...pageProps} />
      </LayoutProvider>
    </SessionProvider>
  );
}
