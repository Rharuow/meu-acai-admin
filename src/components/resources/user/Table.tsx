import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, ButtonGroup, Form, Modal, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";

import { User } from "@/src/entities/User";
import { useWindowSize } from "@/src/rharuow-admin/Hooks/windowsize";
import { timeStampToDateFormTag } from "@/src/rharuow-admin/util/dateHandler";
import { splitString } from "@/src/rharuow-admin/util/textHandler";
import { deleteUser, getUser } from "@/src/service/docs/users";
import { useUsersContext } from ".";
import { phoneFormatter } from "@/src/rharuow-admin/util/phoneHandler";

function TableComponent() {
  const { users } = useUsersContext();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [user, setUser] = useState<User>();

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

  const { isMobile } = useWindowSize();

  const { register, handleSubmit } = useForm();

  user && user.birthday && console.log(phoneFormatter(user.phone));

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
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label className="fw-bold text-primary">Nome</Form.Label>
              <Form.Control
                {...register("name")}
                placeholder="Ex: Fulano de tal"
                defaultValue={user?.name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="birthday">
              <Form.Label className="fw-bold text-primary">
                Aniversário
              </Form.Label>
              <Form.Control
                {...register("birthday")}
                type="date"
                {...(user &&
                  user.birthday && {
                    defaultValue: `${timeStampToDateFormTag(user.birthday)}`,
                  })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="birthday">
              <Form.Label className="fw-bold text-primary">Carteira</Form.Label>
              <Form.Control
                {...register("wallet")}
                type="number"
                defaultValue={user?.wallet}
                min={0}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-primary">Telefone</Form.Label>
              <InputMask
                className="form-control"
                mask="+55(099)99999-9999"
                placeholder="Digite seu número"
                {...(user &&
                  user.phone && {
                    defaultValue: `${phoneFormatter(user.phone)}`,
                  })}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
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
