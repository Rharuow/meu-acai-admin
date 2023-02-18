import Lottie from "lottie-react";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Switch from "react-switch";

import noOrderAnimation from "../../lottie/no-order.json";
import waitingOrderAnimation from "../../lottie/waiting-order.json";

import { mockedOrders } from "@/src/entities/Order";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const waitingOrder = mockedOrders.find((order) => order.status === "making");

  console.log(waitingOrder);

  const handleStatus = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="d-flex p-3 flex-wrap">
      <div className="w-100 mb-3">
        <label className="d-flex align-items-center justify-content-end">
          <span className="text-primary-light me-3">Aberto?</span>
          <Switch
            onChange={handleStatus}
            checked={isOpen}
            onColor="#198754"
            offColor="#ff4136"
          />
        </label>
      </div>
      <Card bg="primary" className="w-100">
        <Card.Header>
          <h1 className="text-white fs-3 text-center m-0">Últimos Pedidos</h1>
        </Card.Header>
        <Card.Body>
          <Card bg="secondary">
            <Card.Body>
              {waitingOrder ? (
                <div className="row">
                  <div className="col-4 pe-0">
                    <p className="fw-bold">Pedido:</p>
                  </div>
                  <div className="col-8 ps-0">
                    <p className="fw-bold">{waitingOrder.id}</p>
                  </div>
                  <div className="col-4 pe-0">
                    <p className="fw-bold">Cremes:</p>
                  </div>
                  <div className="col-8 ps-0">
                    <p className="fw-bold">
                      {waitingOrder.product.creams.map((cream) => (
                        <>{cream.name}</>
                      ))}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-center flex-wrap">
                  <Lottie
                    animationData={
                      isOpen ? waitingOrderAnimation : noOrderAnimation
                    }
                  />
                  <p className="fw-bold">
                    {isOpen ? "Esperando por pedidos!" : "Nenhum pedido feito!"}
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </div>
  );
}
