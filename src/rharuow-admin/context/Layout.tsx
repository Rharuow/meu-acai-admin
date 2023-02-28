import Head from "next/head";
import React, { createContext, ReactNode, useContext, useState } from "react";
import SignIn from "../pages/SignIn";
import { useSessionContext } from "./Session";
import Nav from "../components/Nav";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import ConfirmationPage from "@/src/pages/confirmation";
import ForgotPasswordPage from "@/src/pages/forgot-password";
import RecoveryPage from "@/src/pages/recovery";

interface ILayoutContext {
  language: "pt-BR" | "US";
  setLanguage: React.Dispatch<React.SetStateAction<"pt-BR" | "US">>;
  theme: "ligth" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"ligth" | "dark">>;
  setClassWrapper: React.Dispatch<React.SetStateAction<string>>;
}

const LayoutContext = createContext({} as ILayoutContext);

export const useLayoutContext = () => useContext(LayoutContext);

const LayoutProvider: React.FC<{
  children: ReactNode;
  setMenuItems?: Array<{
    text: string;
    icon?: IconDefinition;
    router: string;
  }>;
  isClient?: boolean;
  CustomNav?: JSX.Element;
  SignInPage?: ReactNode;
  SignUpPage?: ReactNode;
}> = ({
  children,
  setMenuItems = [{ text: "Configuração", icon: faGear, router: "/config" }],
  CustomNav,
  SignInPage,
  SignUpPage,
  isClient = false,
}) => {
  const [language, setLanguage] = useState<"pt-BR" | "US">("pt-BR");
  const [theme, setTheme] = useState<"ligth" | "dark">("dark");
  const [classWrapper, setClassWrapper] = useState(" ");

  const { user } = useSessionContext();

  const router = useRouter();

  console.log(user);

  return (
    <LayoutContext.Provider
      value={{ language, setLanguage, theme, setTheme, setClassWrapper }}
    >
      <Head>
        <title>Meu Açai</title>
      </Head>
      <main id="rharuow_app">
        {user &&
        router.pathname !== "/signup" &&
        router.pathname !== "/recovery" &&
        router.pathname !== "/forgot-password" ? (
          <div className={`${classWrapper}`}>
            {CustomNav ? CustomNav : <Nav menuItems={setMenuItems} />}
            {children}
          </div>
        ) : SignInPage && router.pathname === "/" ? (
          <div className={`min-h-100vh bg-primary ${classWrapper}`}>
            {SignInPage}
          </div>
        ) : router.pathname === "/signup" && isClient ? (
          SignUpPage
        ) : router.pathname === "/confirmation" && isClient ? (
          <ConfirmationPage />
        ) : router.pathname === "/forgot-password" && isClient ? (
          <ForgotPasswordPage />
        ) : router.pathname === "/recovery" && isClient ? (
          <RecoveryPage />
        ) : (
          <SignIn />
        )}
      </main>
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
