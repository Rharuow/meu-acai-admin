import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Table } from "react-bootstrap";

import animationNoUser from "@/src/components/lottie/no-user.json";
import { getUsers } from "@/src/service/docs/users";

import { User } from "@/src/entities/User";
import { useSessionContext } from "@/src/rharuow-admin/context/Session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { useWindowSize } from "@/src/rharuow-admin/Hooks/windowsize";

function UserList() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSessionContext();

  const { isMobile } = useWindowSize();

  useEffect(() => {
    const getUsersRequest = async () => {
      const requestUsers = (await getUsers()).filter(
        (u) => u.name !== user?.name
      );
      requestUsers && setUsers(requestUsers);
    };
    getUsersRequest();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card bg="primary">
      <Card.Header className="text-center fw-bold border-0">
        <span className="text-secondary">Usuários</span>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <></>
        ) : users.length > 0 ? (
          <Table responsive variant="secondary" striped>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Ativo</th>
                <th>Wallet</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="fw-bold text-center text-primary">
                    {user.name}
                  </td>
                  <td
                    className={`fw-bold text-center ${
                      user.isActive ? "text-success" : "text-danger"
                    }`}
                  >
                    {user.isActive ? "Sim" : "Não"}
                  </td>
                  <td
                    className={`fw-bold text-center ${
                      user.wallet > 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    {user.wallet.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td>
                    <div className="d-flex">
                      {isMobile ? (
                        <ButtonGroup>
                          <Button size="sm" variant="warning-dark">
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </Button>
                          <Button size="sm" variant="danger-dark">
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </Button>
                        </ButtonGroup>
                      ) : (
                        <>
                          <Button size="sm" variant="warning-dark">
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </Button>
                          <Button
                            size="sm"
                            className="ms-1"
                            variant="danger-dark"
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            <Lottie animationData={animationNoUser} height={10} />
            <span className="text-secondary fw-bold">Ninguém por aqui</span>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserList;
