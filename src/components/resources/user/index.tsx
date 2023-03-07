import Lottie from "lottie-react";
import React, { useContext, useEffect, useState, createContext } from "react";
import { Card } from "react-bootstrap";

import animationNoUser from "@/src/components/lottie/no-user.json";
import { getUserTotalPage, listUsers } from "@/src/service/docs/users";

import { User } from "@/src/entities/User";
import { useSessionContext } from "@/src/rharuow-admin/context/Session";
import ReactLoading from "@/src/rharuow-admin/components/ReactLoading";
import List from "./List";

interface IUsersContext {
  users: Array<User>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
  setTotalPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsersContext = createContext({} as IUsersContext);

export const useUsersContext = () => useContext(UsersContext);

function UserList() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const { user } = useSessionContext();

  useEffect(() => {
    const getUsersRequest = async () => {
      const requestUsers = (await listUsers()).filter(
        (u) => u.name !== user?.name
      );
      if (requestUsers) {
        setTotalPage(getUserTotalPage(requestUsers.length));
        setUsers(requestUsers);
      }
      setLoading(false);
    };
    getUsersRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        page,
        setPage,
        setTotalPage,
        totalPage,
        loading,
        setLoading,
      }}
    >
      <Card bg="primary">
        <Card.Header className="text-center fw-bold border-0">
          <span className="text-secondary">Usuários</span>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="d-flex justify-content-center">
              <ReactLoading size={80} />
            </div>
          ) : users.length > 0 ? (
            <List />
          ) : (
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              <Lottie animationData={animationNoUser} height={10} />
              <span className="text-secondary fw-bold">Ninguém por aqui</span>
            </div>
          )}
        </Card.Body>
      </Card>
    </UsersContext.Provider>
  );
}

export default UserList;
