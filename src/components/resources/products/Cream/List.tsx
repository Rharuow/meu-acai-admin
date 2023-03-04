import LottiePlayer from "lottie-react";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Modal, Table } from "react-bootstrap";
import ReactLoading from "react-loading";

import { useProductContext } from "..";
import Create from "./Create";
import Edit from "./Edit";
import { Cream } from "@/src/entities/Product";
import { useWindowSize } from "@/src/rharuow-admin/Hooks/windowsize";
import {
  deleteCream,
  getAllCreams,
  getCreams,
  getCreamTotalPage,
} from "@/src/service/docs/creams";
import finishedAnimation from "@/src/components/lottie/finished.json";

export default function List() {
  const { creams, creamsTotalPage, setCreams, setCreamsTotalPage } =
    useProductContext();

  const [loading, setLoading] = useState(true);
  const [loadingCreams, setLoadingCreams] = useState(false);
  const [cream, setCream] = useState<Cream>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { isMobile } = useWindowSize();

  const handleDelete = (index: number) => {
    setCream(creams[index]);
    setShowDeleteModal(true);
  };

  const handlePagination = async () => {
    setLoadingCreams(true);
    const newToppgings = await getCreams(currentPage + 1);
    setCreams((prevState) => [...prevState, ...newToppgings]);
    setCurrentPage(currentPage + 1);
    setLoadingCreams(false);
  };

  const handleEdit = (index: number) => {
    setCream(creams[index]);
    setShowEditModal(true);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Modal centered show={showEditModal}>
        <Modal.Header onHide={() => setShowEditModal(false)}>
          <Modal.Title>Editar Creme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Edit
            cream={cream}
            action={async () => {
              setShowEditModal(false);
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
          <Modal.Title>Apagar Creme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Vc tem certeza que deseja apagar o creme{" "}
            <strong>{cream?.name}</strong>?
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
              cream && (await deleteCream(cream.id));
              const allCreams = await getAllCreams();
              creams && setCreams(await getCreams(1, creams.length));
              setCurrentPage(allCreams.length);
              setCreamsTotalPage(allCreams.length);
              setLoading(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal centered show={showCreateModal}>
        <Modal.Header onHide={() => setShowCreateModal(false)}>
          <Modal.Title>Criando Creme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Create
            action={async () => {
              setShowCreateModal(false);
              const creamsTotalPage = await getCreamTotalPage();
              setCreams(await getAllCreams());
              setCreamsTotalPage(creamsTotalPage);
              setCurrentPage(creamsTotalPage);
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
          {creams.length > 0 ? (
            <>
              <Table variant="secondary" className="w-100" striped>
                <thead>
                  <tr>
                    <th className=" text-center text-truncate">Nome</th>
                    <th className=" text-center text-truncate">Estoque</th>
                    <th className="text-center text-truncate">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {creams.map((c, index) => (
                    <tr key={c.id}>
                      <td className="fw-bold text-center align-middle p-1 text-primary">
                        {c.name}
                      </td>
                      <td className="fw-bold text-center align-middle p-1 text-primary">
                        {c.amount} {c.unit}
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
                  {loadingCreams && (
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
                      colSpan={3}
                      className={creamsTotalPage >= currentPage ? " " : "p-0"}
                    >
                      {creamsTotalPage >= currentPage + 1 ? (
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
                  Add Creme
                </Button>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-center flex-wrap align-items-center">
              <p className="fw-bold mb-0">Nenhum creme cadastrado</p>
              <Button className="mt-3" onClick={() => setShowCreateModal(true)}>
                Criar Creme
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
