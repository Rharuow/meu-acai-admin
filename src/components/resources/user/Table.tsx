import {
  faPencilAlt,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, ButtonGroup, Form, Modal, Table } from "react-bootstrap";
import { useForm, FormProvider } from "react-hook-form";

import { User } from "@/src/entities/User";
import { useWindowSize } from "@/src/rharuow-admin/Hooks/windowsize";
import { splitString } from "@/src/rharuow-admin/util/textHandler";
import { deleteUser } from "@/src/service/docs/users";
import { useUsersContext } from ".";

import Fields from "./Form/Fields";

function TableComponent() {
  const { users } = useUsersContext();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [user, setUser] = useState<User>();

  const { isMobile } = useWindowSize();

  const methods = useForm();

  const handleDelete = (index: number) => {
    setUser(users[index]);
    setShowDeleteModal(true);
  };

  const handleEdit = (index: number) => {
    setUser(users[index]);
    setShowEditModal(true);
  };

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <Table responsive variant="secondary" striped>
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Body>
          Você realmente deseja deletar <strong>{user?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="outline-danger"
            onClick={async () => {
              user && (await deleteUser(user.id));
              setShowDeleteModal(false);
              window.location.reload();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <Modal.Header closeButton>
              <Modal.Title>
                Editar {user && splitString(user.name, 1)}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>{user && <Fields user={user} />}</Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-danger"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="outline-success"
                onClick={async () => {
                  setShowEditModal(false);
                  window.location.reload();
                }}
              >
                Salvar
              </Button>
            </Modal.Footer>
          </Form>
        </FormProvider>
      </Modal>

      <thead>
        <tr>
          <th>Nome</th>
          <th>Ativo</th>
          <th>Wallet</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td className="fw-bold text-center align-middle p-1 text-primary">
              {splitString(user.name, 2)}
            </td>
            <td
              className={`fw-bold text-center align-middle p-1 ${
                user.isActive ? "text-success" : "text-danger"
              }`}
            >
              {user.isActive ? "Sim" : "Não"}
            </td>
            <td
              className={`fw-bold text-center align-middle p-1 ${
                user.wallet > 0 ? "text-success" : "text-danger"
              }`}
            >
              {user.wallet.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </td>
            <td className="align-middle">
              <div className="d-flex">
                {isMobile ? (
                  <ButtonGroup>
                    <Button
                      size="sm"
                      variant="warning-dark"
                      onClick={() => handleEdit(index)}
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </Button>
                    <Button
                      size="sm"
                      variant="danger-dark"
                      onClick={() => handleDelete(index)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </ButtonGroup>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="warning-dark"
                      onClick={() => handleEdit(index)}
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </Button>
                    <Button
                      size="sm"
                      className="ms-1"
                      variant="danger-dark"
                      onClick={() => handleDelete(index)}
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
  );
}

export default TableComponent;
