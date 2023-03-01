import React from "react";
import { Accordion } from "react-bootstrap";
import CreateSize from "./Size/Create";
import ListSize from "./Size/List";

function ProductsPage() {
  return (
    <Accordion>
      <Accordion.Item eventKey="1">
        <Accordion.Header className="fw-bold text-primary">
          Tamanho
        </Accordion.Header>
        <Accordion.Body className="bg-secondary px-1">
          <ListSize />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default ProductsPage;
