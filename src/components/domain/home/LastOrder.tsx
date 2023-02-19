import Lottie from "lottie-react";
import React, { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import Switch from "react-switch";

import { mockedOrders } from "@/src/entities/Order";
import { glossary } from "@/src/utils/glossary";

import noOrderAnimation from "../../lottie/no-order.json";
import waitingOrderAnimation from "../../lottie/waiting-order.json";

function LastOrder({ isOpen }: { isOpen: boolean }) {
  const waitingOrder = mockedOrders.find((order) => order.status === "making");

  const handleDone = () => {};

  return (
    <Card bg="primary" className="w-100">
      <Card.Header>
        <h1 className="text-white fs-3 text-center m-0">Últimos Pedidos</h1>
      </Card.Header>
      <Card.Body>
        <Card bg="secondary">
          <Card.Body>
            {waitingOrder ? (
              <div className="row">
                <div className="col-6 pe-0">
                  <p className="fw-bold">Pedido:</p>
                </div>
                <div className="col-6 ps-0">
                  <p className="fw-bold">{waitingOrder.id}</p>
                </div>

                <div className="col-6 pe-0">
                  <p className="fw-bold">Tamanho:</p>
                </div>
                <div className="col-6 ps-0">
                  <p className="fw-bold">{waitingOrder.product.size.name}</p>
                </div>

                <div className="col-6 pe-0">
                  <p className="fw-bold">Cremes:</p>
                </div>
                <div className="col-6 ps-0">
                  <ListGroup>
                    {waitingOrder.product.creams.map((cream, index) => (
                      <ListGroup.Item
                        key={index}
                        className={`p-1 fw-bold ${
                          index % 2 === 0
                            ? "bg-secondary-dark"
                            : "bg-primary text-white"
                        }`}
                      >
                        {cream.name}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>

                {waitingOrder.product.toppings && (
                  <>
                    <div className="col-6 pe-0">
                      <p className="fw-bold">Acomp:</p>
                    </div>
                    <div className="col-6 ps-0">
                      <ListGroup>
                        {waitingOrder.product.toppings.map((topping, index) => (
                          <ListGroup.Item
                            key={index}
                            className={`fw-bold p-1 ${
                              index % 2 === 0
                                ? "bg-secondary-dark"
                                : "bg-primary text-white"
                            }`}
                          >
                            {topping.name}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </div>
                  </>
                )}

                {waitingOrder.product.extras && (
                  <>
                    <div className="col-6 pe-0">
                      <p className="fw-bold">Extras:</p>
                    </div>
                    <div className="col-6 ps-0">
                      <ListGroup>
                        {waitingOrder.product.extras.map((extra, index) => (
                          <ListGroup.Item
                            key={index}
                            className={`fw-bold p-1 ${
                              index % 2 === 0
                                ? "bg-secondary-dark"
                                : "bg-primary text-white"
                            }`}
                          >
                            {extra.name}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </div>
                  </>
                )}

                <div className="col-6 pe-0">
                  <p className="fw-bold">Status:</p>
                </div>
                <div className="col-6 ps-0">
                  <p className="fw-bold">
                    {glossary.status.pt[waitingOrder.status]}
                  </p>
                </div>

                <div className="col-6 pe-0">
                  <p className="fw-bold">Pagamento:</p>
                </div>
                <div className="col-6 ps-0">
                  <p className="fw-bold">
                    {waitingOrder.payment_method || "Pendente"}
                  </p>
                </div>

                <div className="col-6 pe-0">
                  <p className="fw-bold">Valor:</p>
                </div>
                <div className="col-6 ps-0">
                  <p className="fw-bold">
                    R${" "}
                    {waitingOrder.product.value.toLocaleString("pt-BR", {
                      currency: "BRL",
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div className="col-6 pe-0">
                  <label className="d-flex align-items-center">
                    <span className="fw-bold me-3">Pronto?</span>
                  </label>
                </div>
                <div className="col-6 ps-0">
                  <Switch
                    onChange={handleDone}
                    checked={!waitingOrder}
                    onColor="#198754"
                    offColor="#ff4136"
                  />
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
  );
}

export default LastOrder;
