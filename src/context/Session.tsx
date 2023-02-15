import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

interface ISessionContext {
  sessionLoading: boolean;
  user:
    | {
        name: string;
      }
    | undefined;
  setUser: React.Dispatch<
    React.SetStateAction<
      | {
          name: string;
        }
      | undefined
    >
  >;
}

const SessionContext = createContext({} as ISessionContext);

export const useSessionContext = () => useContext(SessionContext);

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string }>();

  const router = useRouter();

  useEffect(() => {
    const userCookied = JSON.parse(Cookies.get("user") || "false");

    if (userCookied) {
      setUser(userCookied);
    } else {
      router.push("/");
    }

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SessionContext.Provider value={{ sessionLoading: loading, user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
}
