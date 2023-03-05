/* eslint-disable react-hooks/exhaustive-deps */
import { Creams, Menu, Size, Toppings } from "@/src/entities/Product";
import ReactLoadingComponent from "@/src/rharuow-admin/components/ReactLoading";
import { getCreamTotalPage, getCreams } from "@/src/service/docs/creams";
import { getMenus, getMenuTotalPage } from "@/src/service/docs/menus";
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

    menusTotalPage: number;
    setMenusTotalPage: React.Dispatch<React.SetStateAction<number>>;

    menus: Array<Menu>;
    setMenus: React.Dispatch<React.SetStateAction<Array<Menu>>>;
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

  const [menus, setMenus] = useState<Array<Menu>>([]);
  const [menusTotalPage, setMenusTotalPage] = useState<number>(1);

  const loadConditions = async () => {
    const initialToppings = await getToppings();
    setToppings(initialToppings);
    setToppingsTotalPage(await getToppingTotalPage());

    const initialCreams = await getCreams();
    setCreams(initialCreams);
    setCreamsTotalPage(await getCreamTotalPage());

    const initialSizes = await getSizes();
    setSizes(initialSizes);
    setSizesTotalPage(await getSizeTotalPage());

    initialToppings.length > 0 &&
      initialCreams.length > 0 &&
      initialSizes.length > 0 &&
      setMenus(await getMenus());
    setMenusTotalPage(await getMenuTotalPage());

    setLoading(false);
  };

  useEffect(() => {
    loading && loadConditions();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        menus,
        menusTotalPage,
        setMenus,
        setMenusTotalPage,
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

          {sizes.length > 0 && creams.length > 0 && toppings.length > 0 && (
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <span className="fw-bold text-primary">Cardápio</span>
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
