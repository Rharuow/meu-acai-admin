import React from "react";
import LottiePlayer from "lottie-react";
import useSWR from "swr";
import { Card, ListGroup } from "react-bootstrap";

import { getOrders } from "@/src/service/docs/order";
import { useStoreContext } from "@/src/context/store";

import noOrder from "@/src/components/lottie/no-order.json";
import waitOrder from "@/src/components/lottie/waiting-order.json";

import ReactLoading from "@/src/rharuow-admin/components/ReactLoading";
import Step from "../../Step";
import { glossary } from "@/src/utils/glossary";
import { OrderStatus } from "@/src/entities/Order";

function LastOrder() {
  const { data, isLoading, error } = useSWR("lastorders", getOrders);

  const { isOpen } = useStoreContext();

  const stepIsDone = (status: OrderStatus, currentStatus: OrderStatus) => {
    if (status === "delivering" && currentStatus === "making") return true;
    return false;
  };

  return (
    <>
      {isLoading ? (
        <ReactLoading type="spinningBubbles" color="#46295a" height={28} />
      ) : data && data?.length > 0 ? (
        data.map((order, index) => (
          <Card key={order.id} className="w-100 mb-2" bg="primary-dark">
            <Card.Header className="text-center text-white fw-bold">
              Pedido {index + 1}
            </Card.Header>
            <Card.Body>
              <p className="fw-bold text-white">
                Tamanho: {order.product.size.name}
              </p>

              <ListGroup className="mb-3">
                <ListGroup.Item className="fw-bold text-primary">
                  Cremes
                </ListGroup.Item>
                {order.product.creams.map((cream, index) => (
                  <ListGroup.Item key={index} className="fw-bold">
                    {index + 1} - {cream.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {order.product.toppings && (
                <ListGroup className="mb-3">
                  <ListGroup.Item className="fw-bold text-primary">
                    Acompanhamentos
                  </ListGroup.Item>
                  {order.product.toppings.map((topping, index) => (
                    <ListGroup.Item key={index} className="fw-bold">
                      {index + 1} - {topping.name}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}

              {order.product.extras && (
                <ListGroup className="mb-3">
                  <ListGroup.Item className="fw-bold text-primary">
                    Extras
                  </ListGroup.Item>
                  {order.product.extras.map((extra, index) => (
                    <ListGroup.Item key={index} className="fw-bold">
                      {index + 1} - {extra.name}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}

              <p className="fw-bold text-white">
                Valor: R${" "}
                {order.product.value.toLocaleString("pt-BR", {
                  currency: "BRL",
                  minimumFractionDigits: 2,
                })}
              </p>
              <div className="d-flex justify-content-between w-100">
                {order.status === "waiting" &&
                  ["waiting"].map((status) => (
                    <Step
                      key={status}
                      text={`${
                        glossary.status.pt[status as OrderStatus]
                      } (${data.find((or) => or.id === order.id)})`}
                      className="w-100 text-center"
                      isCurrent={order.status === status}
                    />
                  ))}
              </div>
              <div className="d-flex justify-content-between w-100">
                {["making", "delivering", "done"].map((status, index) => (
                  <Step
                    key={status}
                    text={glossary.status.pt[status as OrderStatus]}
                    className="w-100 text-center"
                    isCurrent={order.status === status}
                    isDone={stepIsDone(order.status, status as OrderStatus)}
                  />
                ))}
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div className="w-100 d-flex justify-content-center flex-wrap">
          <LottiePlayer animationData={isOpen ? waitOrder : noOrder} />
          <span className="fw-bold">
            {isOpen ? "Esperando por pedidos" : "Ná há pedidos!"}
          </span>
        </div>
      )}
    </>
  );
}

export default LastOrder;
