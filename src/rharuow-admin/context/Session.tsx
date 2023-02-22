import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";
import { getUsers } from "@/src/service/docs/users";

interface ISessionContext {
  sessionLoading: boolean;
  user:
    | {
        name: string;
        role: "admin";
      }
    | undefined;
  setUser: React.Dispatch<
    React.SetStateAction<
      | {
          name: string;
          role: "admin";
        }
      | undefined
    >
  >;
}

interface IUserAdmin {
  name: string;
  role: "admin";
}

const SessionContext = createContext({} as ISessionContext);

export const useSessionContext = () => useContext(SessionContext);

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUserAdmin>();

  const router = useRouter();

  useEffect(() => {
    const userCookied = JSON.parse(
      Cookies.get("user") || "false"
    ) as IUserAdmin;

    userCookied && setUser(userCookied);

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
