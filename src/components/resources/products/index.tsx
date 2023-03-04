/* eslint-disable react-hooks/exhaustive-deps */
import { Creams, Size, Toppings } from "@/src/entities/Product";
import ReactLoadingComponent from "@/src/rharuow-admin/components/ReactLoading";
import { getCreamTotalPage, getCreams } from "@/src/service/docs/creams";
import { getSizes, getSizeTotalPage } from "@/src/service/docs/sizes";
import { getToppingTotalPage, getToppings } from "@/src/service/docs/toppings";
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

    creamsTotalPage: number;
    setCreamsTotalPage: React.Dispatch<React.SetStateAction<number>>;

    creams: Creams;
    setCreams: React.Dispatch<React.SetStateAction<Creams>>;

    toppingsTotalPage: number;
    setToppingsTotalPage: React.Dispatch<React.SetStateAction<number>>;

    toppings: Toppings;
    setToppings: React.Dispatch<React.SetStateAction<Toppings>>;

    sizesTotalPage: number;
    setSizesTotalPage: React.Dispatch<React.SetStateAction<number>>;

    sizes: Array<Size>;
    setSizes: React.Dispatch<React.SetStateAction<Array<Size>>>;
  }
);

export const useProductContext = () => useContext(ProductContext);

function ProductsPage() {
  const [loading, setLoading] = useState(true);

  const [sizes, setSizes] = useState<Array<Size>>([]);
  const [sizesTotalPage, setSizesTotalPage] = useState<number>(1);

  const [toppings, setToppings] = useState<Toppings>([]);
  const [toppingsTotalPage, setToppingsTotalPage] = useState<number>(1);

  const [creams, setCreams] = useState<Creams>([]);
  const [creamsTotalPage, setCreamsTotalPage] = useState<number>(1);

  const loadConditions = async () => {
    setToppings(await getToppings());
    setToppingsTotalPage(await getToppingTotalPage());

    setCreams(await getCreams());
    setCreamsTotalPage(await getCreamTotalPage());

    setSizes(await getSizes());
    setSizesTotalPage(await getSizeTotalPage());

    setLoading(false);
  };

  useEffect(() => {
    loading && loadConditions();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        creamsTotalPage,
        setCreamsTotalPage,
        setToppingsTotalPage,
        toppingsTotalPage,
        sizesTotalPage,
        setSizesTotalPage,
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
            <Accordion.Header>
              <span className="fw-bold text-primary">Tamanhos</span>
            </Accordion.Header>
            <Accordion.Body className="bg-secondary px-1">
              <ListSize />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <span className="fw-bold text-primary">Cremes</span>
            </Accordion.Header>
            <Accordion.Body className="bg-secondary px-1">
              <ListCream />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <span className="fw-bold text-primary">Acompanhamentos</span>
            </Accordion.Header>
            <Accordion.Body className="bg-secondary px-1">
              <ListTopping />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <span className="fw-bold text-primary">La carte</span>
            </Accordion.Header>
            <Accordion.Body className="bg-secondary px-1">
              <ListMenu />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </ProductContext.Provider>
  );
}

export default ProductsPage;
