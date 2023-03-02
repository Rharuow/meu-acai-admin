import { Topping } from "@/src/entities/Product";
import React from "react";
import { Form } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { useFormContext } from "react-hook-form";

function Fields({ topping }: { topping?: Topping }) {
  const { register, setValue } = useFormContext();

  return (
    <>
      <Form.Group className="mb-3" controlId="formTopping">
        <Form.Label className="fw-bold text-primary">Nome</Form.Label>
        <Form.Control
          required
          placeholder="Ex: Granola, Nutela"
          {...(topping?.name && { defaultValue: topping.name })}
          {...register("name")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formTopping">
        <Form.Label className="fw-bold text-primary">Valor</Form.Label>
        <CurrencyInput
          required
          {...register("value")}
          className="form-control"
          placeholder="Qual o valor desse acompanhamento?"
          prefix="R$"
          decimalsLimit={2}
          onValueChange={(value, name = "value") => {
            setValue(name, value);
          }}
          {...(topping?.value && { defaultValue: topping.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formTopping">
        <Form.Label className="fw-bold text-primary">
          Acompanhamentos em estoque
        </Form.Label>
        <Form.Control
          {...register("amount")}
          placeholder="Quantos acompanhamentos?"
          type="number"
          {...(topping?.amount && { defaultValue: topping.amount })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formTopping">
        <Form.Label className="fw-bold text-primary">
          Unidade de medida
        </Form.Label>
        <Form.Control
          placeholder="Ex: Pacotes, sacos, gramas"
          type="number"
          {...register("unit")}
          {...(topping?.unit && { defaultValue: topping?.unit })}
        />
      </Form.Group>
    </>
  );
}

export default Fields;
