import { Menu } from "@/src/entities/Product";
import { useWindowSize } from "@/src/rharuow-admin/Hooks/windowsize";
import { deleteMenu, listMenu } from "@/src/service/docs/menus";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Modal, Table } from "react-bootstrap";
import ReactLoading from "react-loading";
import Create from "./Create";
import Edit from "./Edit";

export default function List() {
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState<Array<Menu>>([]);
  const [menu, setMenu] = useState<Menu>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { isMobile } = useWindowSize();

  const handleDelete = (index: number) => {
    setMenu(menus[index]);
    setShowDeleteModal(true);
  };

  const handleEdit = (index: number) => {
    setMenu(menus[index]);
    setShowEditModal(true);
  };

  const getMenus = async () => {
    const menusRecovery = await listMenu();
    setMenus(menusRecovery);
    setLoading(false);
  };

  useEffect(() => {
    getMenus();
  }, []);

  return (
    <>
      <Modal centered show={showEditModal}>
        <Modal.Header onHide={() => setShowEditModal(false)}>
          <Modal.Title>Editar Acompanhamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Edit
            menu={menu}
            action={async () => {
              setShowEditModal(false);
              await getMenus();
            }}
          >
            <div className="d-flex justify-content-end">
              <Button
                variant="danger text-white me-2"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
              <Button variant="success" type="submit">
                Salvar
              </Button>
            </div>
          </Edit>
        </Modal.Body>
      </Modal>

      <Modal centered show={showDeleteModal}>
        <Modal.Header onHide={() => setShowDeleteModal(false)}>
          <Modal.Title>Apagar Acompanhamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Vc tem certeza que deseja apagar o produto{" "}
            <strong>{menu?.name}</strong>?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger text-white"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="success text-white"
            onClick={async () => {
              setLoading(true);
              setShowDeleteModal(false);
              menu && (await deleteMenu(menu.id));
              await getMenus();
              setLoading(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal centered show={showCreateModal}>
        <Modal.Header onHide={() => setShowCreateModal(false)}>
          <Modal.Title>Criando Acompanhamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Create
            action={async () => {
              setShowCreateModal(false);
              await getMenus();
            }}
          >
            <div className="d-flex justify-content-end">
              <Button
                variant="danger text-white me-2"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button variant="success" type="submit">
                Salvar
              </Button>
            </div>
          </Create>
        </Modal.Body>
      </Modal>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <ReactLoading type="spinningBubbles" />
        </div>
      ) : (
        <div className="d-flex justify-content-center flex-wrap align-items-center">
          {menus.length > 0 ? (
            <>
              <Table responsive variant="secondary" striped>
                <thead>
                  <tr>
                    <th className=" text-center text-truncate">Nome</th>
                    <th className=" text-center text-truncate">Valor</th>
                    <th className="text-center text-truncate">Visível</th>
                    <th className="text-center text-truncate">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {menus.map((m, index) => (
                    <tr key={m.id}>
                      <td className="fw-bold text-center align-middle p-1 text-primary">
                        {m.name}
                      </td>
                      <td className="fw-bold text-center align-middle p-1 text-primary">
                        R${" "}
                        {m.value.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td
                        className={`fw-bold text-center align-middle p-1 text-${
                          m.visible ? "success" : "danger"
                        }`}
                      >
                        {m.visible ? "Sim" : "Não"}
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
              <Button className="mt-3" onClick={() => setShowCreateModal(true)}>
                Add Produto
              </Button>
            </>
          ) : (
            <div className="d-flex justify-content-center flex-wrap align-items-center">
              <p className="fw-bold mb-0">Nenhum produto cadastrado</p>
              <Button className="mt-3" onClick={() => setShowCreateModal(true)}>
                Criar Produto
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
