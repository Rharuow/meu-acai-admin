import LottiePlayer from "lottie-react";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Modal, Pagination, Table } from "react-bootstrap";
import ReactLoading from "react-loading";
import { useProductContext } from "..";
import Create from "./Create";
import Edit from "./Edit";

import { Topping } from "@/src/entities/Product";
import { useWindowSize } from "@/src/rharuow-admin/Hooks/windowsize";
import {
  deleteTopping,
  getToppingTotalPage,
  getToppings,
  getAllToppings,
} from "@/src/service/docs/toppings";
import finishedAnimation from "@/src/components/lottie/finished.json";

export default function List() {
  const {
    toppings,
    toppingsTotalPage,
    setToppingsTotalPage,
    setToppings,
    productSetLoading,
  } = useProductContext();

  const [loading, setLoading] = useState(true);
  const [loadingToppings, setLoadingToppings] = useState(false);
  const [topping, setTopping] = useState<Topping>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePagination = async () => {
    setLoadingToppings(true);
    const newToppgings = await getToppings(currentPage + 1);
    setToppings((prevState) => [...prevState, ...newToppgings]);
    setCurrentPage(currentPage + 1);
    setLoadingToppings(false);
  };

  const { isMobile } = useWindowSize();

  const handleDelete = (index: number) => {
    setTopping(toppings[index]);
    setShowDeleteModal(true);
  };

  const handleEdit = (index: number) => {
    setTopping(toppings[index]);
    setShowEditModal(true);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Modal centered show={showEditModal}>
        <Modal.Header onHide={() => setShowEditModal(false)}>
          <Modal.Title>Editar Acompanhamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Edit
            topping={topping}
            action={async () => {
              setLoading(true);
              setShowEditModal(false);
              setToppings(await getToppings(1, toppings.length));
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
          <Modal.Title>Apagar Acompanhamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Vc tem certeza que deseja apagar o acompanhamento{" "}
            <strong>{topping?.name}</strong>?
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
              topping && (await deleteTopping(topping.id));
              const allToppings = await getAllToppings();
              toppings && setToppings(await getToppings(1, toppings.length));
              setCurrentPage(allToppings.length);
              setToppingsTotalPage(allToppings.length);
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
              const toppingsTotalPage = await getToppingTotalPage();
              setToppings(await getAllToppings());
              setToppingsTotalPage(toppingsTotalPage);
              setCurrentPage(toppingsTotalPage);
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
          {toppings.length > 0 ? (
            <>
              <Table className="w-100" variant="secondary" striped>
                <thead>
                  <tr>
                    <th className=" text-center text-truncate">Nome</th>
                    <th className=" text-center text-truncate">Valor</th>
                    <th className="text-center text-truncate">Estoque</th>
                    <th className="text-center text-truncate">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {toppings.map((t, index) => (
                    <tr key={t.id}>
                      <td className="fw-bold text-center align-middle p-1 text-primary">
                        {t.name}
                      </td>
                      <td className="fw-bold text-center align-middle p-1 text-primary">
                        R${" "}
                        {t.value.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="fw-bold text-center align-middle p-1 text-primary">
                        {t.amount} {t.unit}
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
                  {loadingToppings && (
                    <tr>
                      <td colSpan={4}>
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
                      className={toppingsTotalPage >= currentPage ? " " : "p-0"}
                    >
                      {toppingsTotalPage >= currentPage + 1 ? (
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
                  Add Acompanhamento
                </Button>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-center flex-wrap align-items-center">
              <p className="fw-bold mb-0">Nenhum acompanhamento cadastrado</p>
              <Button className="mt-3" onClick={() => setShowCreateModal(true)}>
                Criar Acompanhamento
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
