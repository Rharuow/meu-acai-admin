import React from "react";
import { Card } from "react-bootstrap";

function LastOrder() {
  return (
    <Card bg="primary" className="w-100">
      <Card.Header>
        <h1 className="text-white fs-3 text-center m-0">Últimos Pedidos</h1>
      </Card.Header>
      <Card.Body></Card.Body>
    </Card>
  );
}

export default LastOrder;
