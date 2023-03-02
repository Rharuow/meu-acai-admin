import { Size } from "@/src/entities/Product";
import { useWindowSize } from "@/src/rharuow-admin/Hooks/windowsize";
import { deleteSize, listSize } from "@/src/service/docs/sizes";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Modal, Table } from "react-bootstrap";
import ReactLoading from "react-loading";
import Create from "./Create";
import Edit from "./Edit";

export default function List() {
  const [loading, setLoading] = useState(true);
  const [sizes, setSizes] = useState<Array<Size>>([]);
  const [size, setSize] = useState<Size>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { isMobile } = useWindowSize();

  const handleDelete = (index: number) => {
    setSize(sizes[index]);
    setShowDeleteModal(true);
  };

  const handleEdit = (index: number) => {
    setSize(sizes[index]);
    setShowEditModal(true);
  };

  const getSizes = async () => {
    const sizesRecovery = await listSize();
    setSizes(sizesRecovery);
    setLoading(false);
  };

  useEffect(() => {
    getSizes();
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
              await getSizes();
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
              await getSizes();
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
              await getSizes();
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
                    <th className=" text-center text-truncate">Nome</th>
                    <th className=" text-center text-truncate">Valor</th>
                    <th className="max-w-80px text-center text-truncate">
                      Acompanhamentos
                    </th>
                    <th className="text-center text-truncate">Cremes</th>
                    <th className="text-center text-truncate">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((s, index) => (
                    <tr key={s.id}>
                      <td className="fw-bold text-center align-middle p-1 text-primary">
                        {s.name}
                      </td>
                      <td className="fw-bold text-center align-middle p-1 text-primary">
                        {s.value}
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
              </Table>
              <Button className="mt-3" onClick={() => setShowCreateModal(true)}>
                Add Tamanho
              </Button>
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
