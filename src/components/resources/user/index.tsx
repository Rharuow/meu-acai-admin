import Lottie from "lottie-react";
import React, { useContext, useEffect, useState, createContext } from "react";
import { Card } from "react-bootstrap";

import animationNoUser from "@/src/components/lottie/no-user.json";
import { getUsers } from "@/src/service/docs/users";

import { User } from "@/src/entities/User";
import { useSessionContext } from "@/src/rharuow-admin/context/Session";
import ReactLoading from "@/src/rharuow-admin/components/ReactLoading";
import Table from "./Table";

interface IUsersContext {
  users: Array<User>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UsersContext = createContext({} as IUsersContext);

export const useUsersContext = () => useContext(UsersContext);

function UserList() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSessionContext();

  useEffect(() => {
    const getUsersRequest = async () => {
      const requestUsers = (await getUsers()).filter(
        (u) => u.name !== user?.name
      );
      requestUsers && setUsers(requestUsers);
      setLoading(false);
    };
    getUsersRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
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
            <Table />
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
