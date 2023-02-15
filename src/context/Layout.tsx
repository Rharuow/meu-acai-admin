import Head from "next/head";
import React, { createContext, ReactNode, useContext, useState } from "react";
import SignIn from "@/src/rharuow-admin/pages/SignIn";
import { useSessionContext } from "./Session";

interface ILayoutContext {
  language: "pt-BR" | "US";
  setLanguage: React.Dispatch<React.SetStateAction<"pt-BR" | "US">>;
  theme: "ligth" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"ligth" | "dark">>;
  setClassWrapper: React.Dispatch<React.SetStateAction<string>>;
}

const LayoutContext = createContext({} as ILayoutContext);

export const useLayoutContext = () => useContext(LayoutContext);

const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<"pt-BR" | "US">("pt-BR");
  const [theme, setTheme] = useState<"ligth" | "dark">("ligth");
  const [classWrapper, setClassWrapper] = useState(" ");

  const { user } = useSessionContext();
  return (
    <LayoutContext.Provider
      value={{ language, setLanguage, theme, setTheme, setClassWrapper }}
    >
      <Head>
        <title>Admin - Meu Açai</title>
      </Head>
      <main id="rharuow_app">{user ? children : <SignIn />}</main>
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
