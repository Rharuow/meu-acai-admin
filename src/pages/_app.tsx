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
  faHomeAlt,
  faReceipt,
  faSignOut,
  faUserAlt,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import StatusJob from "../components/StatusJob";
import StoreProvider from "../context/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <LayoutProvider
        setMenuItems={[
          { text: "Início", icon: faHomeAlt, router: "/" },
          { text: "Usuários", icon: faUserAlt, router: "/users" },
          { text: "Pedidos", icon: faReceipt, router: "/pedidos" },
          { text: "Carteira", icon: faWallet, router: "/wallet" },
          { text: "Sair", icon: faSignOut, router: "/signout" },
        ]}
      >
        <StoreProvider>
          <StatusJob />
          <Component {...pageProps} />
        </StoreProvider>
      </LayoutProvider>
    </SessionProvider>
  );
}
