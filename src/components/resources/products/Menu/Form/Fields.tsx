import { Cream, Menu, Topping } from "@/src/entities/Product";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { AsyncPaginate } from "react-select-async-paginate";
import { useFormContext } from "react-hook-form";
import {
  getSizes,
  getSizesByName,
  getSizeTotalPage,
} from "@/src/service/docs/sizes";
import {
  getCreams,
  getCreamsByName,
  getCreamTotalPage,
} from "@/src/service/docs/creams";
import {
  getToppings,
  getToppingsByName,
  getToppingTotalPage,
} from "@/src/service/docs/toppings";
import Switch from "react-switch";

function Fields({ menu }: { menu?: Menu }) {
  const { register, setValue, watch, getValues } = useFormContext();

  const [creamsOptions, setCreamsOptions] = useState(
    menu
      ? menu.creams.map((cream) => ({ value: cream, label: cream.name }))
      : []
  );

  const [toppingsOptions, setToppingsOptions] = useState(
    menu && menu.toppings
      ? menu.toppings.map((topping) => ({
          value: topping,
          label: topping.name,
        }))
      : []
  );

  const loadSizes = async (
    search: string,
    prevOptions: unknown,
    { page }: { page: number }
  ) => {
    const sizes = !!search
      ? await getSizesByName(search, page)
      : await getSizes(page);
    const sizeTotalPage = getSizeTotalPage(sizes.length);

    return {
      options: sizes.map((size) => ({ value: size, label: size.name })),
      hasMore: sizeTotalPage > page,
      additional: {
        page: page + 1,
      },
    };
  };

  const loadCreams = async (
    search: string,
    prevOptions: unknown,
    { page }: { page: number }
  ) => {
    const creams = !!search
      ? await getCreamsByName(search, page)
      : await getCreams(page);
    const creamTotalPage = getCreamTotalPage(creams.length);

    const options = creams.filter((cream) =>
      creamsOptions.every((c) => c.value.name !== cream.name)
    );

    return {
      options: options.map((cream) => ({ value: cream, label: cream.name })),
      hasMore: creamTotalPage > page,
      additional: {
        page: page + 1,
      },
    };
  };

  const loadToppings = async (
    search: string,
    prevOptions: unknown,
    { page }: { page: number }
  ) => {
    const toppings = !!search
      ? await getToppingsByName(search, page)
      : await getToppings(page);
    const toppingTotalPage = getToppingTotalPage(toppings.length);

    const options = toppings.filter((topping) =>
      toppingsOptions.every((t) => t.value.name !== topping.name)
    );

    return {
      options: options.map((topping) => ({
        value: topping,
        label: topping.name,
      })),
      hasMore: toppingTotalPage > page,
      additional: {
        page: page + 1,
      },
    };
  };

  useEffect(() => {
    menu && menu.creams && setValue("creams", menu.creams);
    menu && menu.toppings && setValue("toppings", menu.toppings);
    menu && menu.visible && setValue("visible", menu.visible);
    menu && menu.value && setValue("value", menu.value);
    menu && menu.size && setValue("size", menu.size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label className="fw-bold text-primary">Nome</Form.Label>
        <Form.Control
          required
          placeholder="Ex: Supremo de Nutela"
          {...(menu?.name && { defaultValue: menu.name })}
          {...register("name")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="value">
        <Form.Label className="fw-bold text-primary">Pre??o</Form.Label>
        <CurrencyInput
          required
          {...register("price")}
          className="form-control"
          placeholder="Qual o valor desse produto?"
          prefix="R$"
          decimalsLimit={2}
          onValueChange={(value) => {
            setValue("value", parseFloat(`${value?.replace(/,/g, ".")}`));
          }}
          {...(menu?.value && { defaultValue: menu.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="sizes">
        <Form.Label className="fw-bold text-primary">Tamanho</Form.Label>
        <AsyncPaginate
          required
          {...register("size")}
          onChange={(e) => {
            setValue("size", e?.value);
          }}
          {...(menu?.size && {
            defaultValue: { value: menu.size, label: menu.size.name },
          })}
          additional={{
            page: 1,
          }}
          // @ts-expect-error
          loadOptions={loadSizes}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="creams">
        <Form.Label className="fw-bold text-primary">Cremes</Form.Label>
        <AsyncPaginate
          {...(menu && { key: creamsOptions.length })}
          {...register("creams")}
          isMulti
          required
          onChange={(e) => {
            setValue(
              "creams",
              e.map(({ value }) => value)
            );
            setCreamsOptions(
              getValues("creams").map((cream: Cream) => ({
                value: cream,
                label: cream.name,
              }))
            );
          }}
          {...(menu?.creams && {
            defaultValue: creamsOptions,
          })}
          additional={{
            page: 1,
          }}
          // @ts-expect-error
          loadOptions={loadCreams}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="toppings">
        <Form.Label className="fw-bold text-primary">
          Acompanhamentos
        </Form.Label>
        <AsyncPaginate
          {...(menu && { key: toppingsOptions.length })}
          {...register("toppings")}
          isMulti
          onChange={(e) => {
            setValue(
              "toppings",
              e.map(({ value }) => value)
            );
            setCreamsOptions(
              getValues("toppings").map((topping: Topping) => ({
                value: topping,
                label: topping.name,
              }))
            );
          }}
          {...(menu?.toppings && {
            defaultValue: toppingsOptions,
          })}
          additional={{
            page: 1,
          }}
          required
          // @ts-expect-error
          loadOptions={loadToppings}
        />
      </Form.Group>

      <Form.Group className="mb-3 d-flex" controlId="value">
        <Form.Label className="fw-bold text-primary me-3">Vis??vel</Form.Label>
        <Switch
          {...register("visible")}
          onChange={(e) => setValue("visible", e)}
          checked={watch("visible")}
          onColor="#198754"
          offColor="#ff4136"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMenu">
        <Form.Label className="fw-bold text-primary">Descri????o</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Ex: Este produto tem granola..."
          {...(menu?.description && { defaultValue: menu.description })}
          {...register("description")}
        />
      </Form.Group>
    </>
  );
}

export default Fields;
