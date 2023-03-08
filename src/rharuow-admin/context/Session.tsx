import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import ReactLoading from "../components/ReactLoading";
import { Admin } from "@/src/entities/User";

interface ISessionContext {
  sessionLoading: boolean;
  user: Admin | undefined;
  setUser: React.Dispatch<React.SetStateAction<Admin | undefined>>;
}

const SessionContext = createContext({} as ISessionContext);

export const useSessionContext = () => useContext(SessionContext);

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<Admin>();

  const router = useRouter();

  useEffect(() => {
    const userCookied = JSON.parse(Cookies.get("user") || "false") as Admin;

    if (userCookied && !user) {
      console.log("Not have user YET");
      setUser(userCookied);
    }

    if (
      !userCookied &&
      router.pathname !== "/signup" &&
      router.pathname !== "/recovery" &&
      router.pathname !== "/confirmation"
    ) {
      console.log("Not have user");
      setUser(undefined);
      router.push("/");
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, Cookies]);

  return (
    <SessionContext.Provider value={{ sessionLoading: loading, user, setUser }}>
      {loading ? (
        <>
          <ReactLoading type="spinningBubbles" color="#46295a" />
        </>
      ) : (
        children
      )}
    </SessionContext.Provider>
  );
}
