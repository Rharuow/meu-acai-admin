import { Menu } from "@/src/entities/Product";
import { useWindowSize } from "@/src/rharuow-admin/Hooks/windowsize";
import {
  deleteMenu,
  getAllMenus,
  getMenus,
  getMenuTotalPage,
} from "@/src/service/docs/menus";
import {
  faEye,
  faPencilAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LottiePlayer from "lottie-react";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Modal, Table } from "react-bootstrap";
import ReactLoading from "react-loading";
import { useProductContext } from "..";
import Create from "./Create";
import Edit from "./Edit";
import finishedAnimation from "@/src/components/lottie/finished.json";

export default function List() {
  const { menus, menusTotalPage, setMenus, setMenusTotalPage } =
    useProductContext();

  const [loading, setLoading] = useState(true);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [menu, setMenu] = useState<Menu>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { isMobile } = useWindowSize();

  const handleDelete = (index: number) => {
    setMenu(menus[index]);
    setShowDeleteModal(true);
  };

  const handlePagination = async () => {
    setLoadingMenu(true);
    const newToppgings = await getMenus(currentPage + 1);
    setMenus((prevState) => [...prevState, ...newToppgings]);
    setCurrentPage(currentPage + 1);
    setLoadingMenu(false);
  };

  const handleEdit = (index: number) => {
    setMenu(menus[index]);
    setShowEditModal(true);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Modal centered show={showEditModal}>
        <Modal.Header onHide={() => setShowEditModal(false)}>
          <Modal.Title>Editar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Edit
            menu={menu}
            action={async () => {
              setLoading(true);
              setShowEditModal(false);
              setMenus(await getMenus(1, menus.length));
              setLoading(false);
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
          <Modal.Title>Apagar Produto</Modal.Title>
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
              const allMenus = await getAllMenus();
              setMenus(allMenus);
              setCurrentPage(1);
              setMenusTotalPage(Math.ceil(allMenus.length / 5));
              setLoading(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal centered show={showCreateModal}>
        <Modal.Header onHide={() => setShowCreateModal(false)}>
          <Modal.Title>Criando Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Create
            action={async () => {
              setShowCreateModal(false);
              const allMenus = await getAllMenus();
              setMenus(allMenus);
              const menusTotalPage = getMenuTotalPage(allMenus.length);
              setMenusTotalPage(menusTotalPage);
              setCurrentPage(menusTotalPage);
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
              <Table responsive variant="primary" striped>
                <thead>
                  <tr>
                    <th className=" text-center text-primary text-truncate">
                      Nome
                    </th>
                    <th className=" text-center text-primary text-truncate">
                      Valor
                    </th>
                    <th className=" px-1 text-primary max-w-65px text-center  text-truncate">
                      {isMobile ? (
                        <FontAwesomeIcon className="text-dark" icon={faEye} />
                      ) : (
                        "Vis??vel"
                      )}
                    </th>
                    <th className="text-center text-primary text-truncate">
                      A????es
                    </th>
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
                        {m.visible ? "Sim" : "N??o"}
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
                                <FontAwesomeIcon
                                  className="text-white"
                                  icon={faPencilAlt}
                                />
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
                                className="text-white"
                                onClick={() => handleEdit(index)}
                              >
                                <FontAwesomeIcon
                                  className="text-white"
                                  icon={faPencilAlt}
                                />
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
                  {loadingMenu && (
                    <tr>
                      <td colSpan={3}>
                        <div className="d-flex justify-content-center">
                          <ReactLoading
                            type="spinningBubbles"
                            color="#46295a"
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      colSpan={4}
                      className={menusTotalPage >= currentPage ? " " : "p-0"}
                    >
                      {menusTotalPage >= currentPage + 1 ? (
                        <div className="d-flex justify-content-center">
                          <Button
                            className="success-outline"
                            onClick={() => handlePagination()}
                          >
                            +
                          </Button>
                        </div>
                      ) : (
                        <LottiePlayer
                          animationData={finishedAnimation}
                          className="h-80px"
                        />
                      )}
                    </td>
                  </tr>
                </tfoot>
              </Table>
              <div className="d-flex justify-content-center w-100">
                <Button onClick={() => setShowCreateModal(true)}>
                  Add Produto
                </Button>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-center flex-wrap align-items-center">
              <div className="w-100">
                <p className="fw-bold mb-0 text-center">
                  Nenhum produto cadastrado
                </p>
              </div>
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
