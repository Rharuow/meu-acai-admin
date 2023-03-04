import LottiePlayer from "lottie-react";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Modal, Pagination, Table } from "react-bootstrap";
import ReactLoading from "react-loading";
import { useProductContext } from "..";
import Create from "./Create";
import Edit from "./Edit";

import { Size } from "@/src/entities/Product";
import { useWindowSize } from "@/src/rharuow-admin/Hooks/windowsize";
import {
  deleteSize,
  getAllSizes,
  getSizes,
  getSizeTotalPage,
} from "@/src/service/docs/sizes";

import finishedAnimation from "@/src/components/lottie/finished.json";

export default function List() {
  const {
    productSetLoading,
    sizes,
    sizesTotalPage,
    setSizes,
    setSizesTotalPage,
  } = useProductContext();

  const [loading, setLoading] = useState(true);
  const [loadingSize, setLoadingSize] = useState(false);
  const [size, setSize] = useState<Size>();
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handlePagination = async () => {
    setLoadingSize(true);
    const newToppgings = await getSizes(currentPage + 1);
    setSizes((prevState) => [...prevState, ...newToppgings]);
    setCurrentPage(currentPage + 1);
    setLoadingSize(false);
  };

  const { isMobile } = useWindowSize();

  const handleDelete = (index: number) => {
    setSize(sizes[index]);
    setShowDeleteModal(true);
  };

  const handleEdit = (index: number) => {
    setSize(sizes[index]);
    setShowEditModal(true);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Modal centered show={showEditModal}>
        <Modal.Header onHide={() => setShowEditModal(false)}>
          <Modal.Title>Editar Tamanho</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Edit
            size={size}
            action={async () => {
              setShowEditModal(false);
              // await getSizes();
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
          <Modal.Title>Apagar Tamanho</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Vc tem certeza que deseja apagar o tamanho{" "}
            <strong>{size?.name}</strong>?
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
              size && (await deleteSize(size.id));
              const allSizes = await getAllSizes();
              sizes && setSizes(await getSizes(1, sizes.length));
              setCurrentPage(allSizes.length);
              setSizesTotalPage(allSizes.length);
              setLoading(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal centered show={showCreateModal}>
        <Modal.Header onHide={() => setShowCreateModal(false)}>
          <Modal.Title>Criando Tamanho</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Create
            action={async () => {
              setShowCreateModal(false);
              const sizesTotalPage = await getSizeTotalPage();
              setSizes(await getAllSizes());
              setSizesTotalPage(sizesTotalPage);
              setCurrentPage(sizesTotalPage);
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
          {sizes.length > 0 ? (
            <>
              <Table responsive variant="secondary" striped>
                <thead>
                  <tr>
                    <th className=" px-1 text-center text-truncate">Nome</th>
                    <th className=" px-1 text-center text-truncate">Valor</th>
                    <th className=" px-1 max-w-65px text-center text-truncate">
                      Acompanhamento
                    </th>
                    <th className=" px-1 text-center text-truncate">Cremes</th>
                    <th className=" px-1text-center text-truncate">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((s, index) => (
                    <tr key={s.id}>
                      <td className="fw-bold text-center align-middle p-1 text-primary">
                        {s.name}
                      </td>
                      <td className="fw-bold text-center align-middle p-1 text-primary">
                        R${" "}
                        {s.value.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="fw-bold text-center align-middle p-1 text-primary">
                        {s.amountOptions}
                      </td>
                      <td className="fw-bold text-center align-middle p-1 text-primary">
                        {s.amountOptions}
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
                <tfoot>
                  <tr>
                    <td
                      colSpan={5}
                      className={sizesTotalPage >= currentPage ? " " : "p-0"}
                    >
                      {sizesTotalPage >= currentPage + 1 ? (
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

              <div className="d-flex justify-content-center w-100 mt-3">
                <Button onClick={() => setShowCreateModal(true)}>
                  Add Acompanhamento
                </Button>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-center flex-wrap align-items-center">
              <p className="fw-bold mb-0">Nenhum tamanho cadastrado</p>
              <Button className="mt-3" onClick={() => setShowCreateModal(true)}>
                Criar Tamanho
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
