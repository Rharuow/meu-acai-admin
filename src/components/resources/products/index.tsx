import React from "react";
import { Accordion } from "react-bootstrap";
import ListCream from "./Cream/List";
import ListSize from "./Size/List";
import ListTopping from "./Topping/List";

function ProductsPage() {
  return (
    <Accordion>
      <Accordion.Item eventKey="1">
        <Accordion.Header className="fw-bold text-primary">
          Tamanhos
        </Accordion.Header>
        <Accordion.Body className="bg-secondary px-1">
          <ListSize />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header className="fw-bold text-primary">
          Cremes
        </Accordion.Header>
        <Accordion.Body className="bg-secondary px-1">
          <ListCream />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header className="fw-bold text-primary">
          Acompanhamentos
        </Accordion.Header>
        <Accordion.Body className="bg-secondary px-1">
          <ListTopping />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default ProductsPage;
