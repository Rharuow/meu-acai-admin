/* eslint-disable react-hooks/exhaustive-deps */
import { Creams, Size, Toppings } from "@/src/entities/Product";
import ReactLoadingComponent from "@/src/rharuow-admin/components/ReactLoading";
import { listCreams } from "@/src/service/docs/creams";
import { listSize } from "@/src/service/docs/sizes";
import { listTopping } from "@/src/service/docs/toppings";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import ListCream from "./Cream/List";
import ListMenu from "./Menu/List";
import ListSize from "./Size/List";
import ListTopping from "./Topping/List";

const ProductContext = createContext(
  {} as {
    productLoading: boolean;
    productSetLoading: React.Dispatch<React.SetStateAction<boolean>>;
    creams: Creams;
    setCreams: React.Dispatch<React.SetStateAction<Creams>>;
    toppings: Toppings;
    setToppings: React.Dispatch<React.SetStateAction<Toppings>>;
    sizes: Array<Size>;
    setSizes: React.Dispatch<React.SetStateAction<Array<Size>>>;
  }
);

export const useProductContext = () => useContext(ProductContext);

function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [hasProducts, setHasProducts] = useState<boolean>();

  const [toppings, setToppings] = useState<Toppings>([]);
  const [creams, setCreams] = useState<Creams>([]);
  const [sizes, setSizes] = useState<Array<Size>>([]);

  const loadConditions = async () => {
    const getToppings = await listTopping();
    setToppings(getToppings);
    const getCreams = await listCreams();
    setCreams(getCreams);
    const getSizes = await listSize();
    setSizes(getSizes);
    const conditions =
      getToppings.length > 0 && getCreams.length > 0 && getSizes.length > 0;
    setHasProducts(conditions);
    setLoading(false);
  };

  useEffect(() => {
    loadConditions();
  }, [toppings, creams, sizes]);

  return (
    <ProductContext.Provider
      value={{
        productLoading: loading,
        productSetLoading: setLoading,
        creams,
        setCreams,
        setSizes,
        setToppings,
        sizes,
        toppings,
      }}
    >
      {loading ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <ReactLoadingComponent size={120} />
        </div>
      ) : (
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
          {hasProducts && (
            <Accordion.Item eventKey="4">
              <Accordion.Header className="fw-bold text-primary">
                La carte
              </Accordion.Header>
              <Accordion.Body className="bg-secondary px-1">
                <ListMenu />
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
      )}
    </ProductContext.Provider>
  );
}

export default ProductsPage;
