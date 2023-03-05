import { Menu, Size } from "@/src/entities/Product";
import React from "react";
import { Form } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { AsyncPaginate, LoadOptions } from "react-select-async-paginate";
import { useFormContext } from "react-hook-form";
import {
  getSizes,
  getSizesByName,
  getSizeTotalPage,
} from "@/src/service/docs/sizes";

function Fields({ menu }: { menu?: Menu }) {
  const { register, setValue } = useFormContext();

  // LoadOptions<Size, GroupBase<Size>, { page: any; }>

  const loadSizes = async (
    search: string,
    prevOptions: unknown,
    { page }: { page: number }
  ) => {
    const sizes = !!search
      ? await getSizesByName(search, page)
      : await getSizes(page);
    const sizeTotalPage = await getSizeTotalPage();

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
    const sizes = !!search
      ? await getSizesByName(search, page)
      : await getSizes(page);
    const sizeTotalPage = await getSizeTotalPage();

    return {
      options: sizes.map((size) => ({ value: size, label: size.name })),
      hasMore: sizeTotalPage > page,
      additional: {
        page: page + 1,
      },
    };
  };

  return (
    <>
      <Form.Group className="mb-3" controlId="formMenu">
        <Form.Label className="fw-bold text-primary">Nome</Form.Label>
        <Form.Control
          required
          placeholder="Ex: Supremo de Nutela"
          {...(menu?.name && { defaultValue: menu.name })}
          {...register("name")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMenu">
        <Form.Label className="fw-bold text-primary">Preço</Form.Label>
        <CurrencyInput
          required
          {...register("value")}
          className="form-control"
          placeholder="Qual o valor desse produto?"
          prefix="R$"
          decimalsLimit={2}
          onValueChange={(value, name = "value") => {
            setValue(name, value);
          }}
          {...(menu?.value && { defaultValue: menu.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMenu">
        <Form.Label className="fw-bold text-primary">Tamanhos</Form.Label>
        <AsyncPaginate
          isMulti
          additional={{
            page: 1,
          }}
          // @ts-expect-error
          loadOptions={loadSizes}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMenu">
        <Form.Label className="fw-bold text-primary">Cremes</Form.Label>
        <AsyncPaginate
          isMulti
          additional={{
            page: 1,
          }}
          // @ts-expect-error
          loadOptions={loadCreams}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMenu">
        <Form.Label className="fw-bold text-primary">Descrição</Form.Label>
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
