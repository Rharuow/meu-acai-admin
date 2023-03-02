import { Menu } from "@/src/entities/Product";
import React from "react";
import { Form } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { useFormContext } from "react-hook-form";

function Fields({ menu }: { menu?: Menu }) {
  const { register, setValue } = useFormContext();

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
        <Form.Label className="fw-bold text-primary">Valor</Form.Label>
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
        <Form.Label className="fw-bold text-primary">Preço</Form.Label>
        <Form.Select aria-label="Default select example">
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
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
