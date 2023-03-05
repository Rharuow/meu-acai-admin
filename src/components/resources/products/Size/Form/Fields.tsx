import { Size } from "@/src/entities/Product";
import React from "react";
import { Form } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { useFormContext } from "react-hook-form";

function Fields({ size }: { size?: Size }) {
  const { register, setValue } = useFormContext();

  return (
    <>
      <Form.Group className="mb-3" controlId="formSize">
        <Form.Label className="fw-bold text-primary">Nome</Form.Label>
        <Form.Control
          required
          placeholder="Ex: P / M / G ou 300ml / 500ml"
          {...(size?.name && { defaultValue: size.name })}
          {...register("name")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSize">
        <Form.Label className="fw-bold text-primary">Valor</Form.Label>
        <CurrencyInput
          required
          {...register("value")}
          className="form-control"
          placeholder="Qual o valor para esse tamanho?"
          prefix="R$"
          decimalsLimit={2}
          onValueChange={(value, name = "value") => {
            setValue(name, value);
          }}
          {...(size?.value && { defaultValue: size.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSize">
        <Form.Label className="fw-bold text-primary">
          Quantidade de Acompanhamentos
        </Form.Label>
        <Form.Control
          required
          {...register("amountOptions")}
          placeholder="Quantos acompanhamentos?"
          type="number"
          defaultValue={size?.amountOptions ? size.amountOptions : 1}
          min={1}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSize">
        <Form.Label className="fw-bold text-primary">
          Quantidade de Cremes
        </Form.Label>
        <Form.Control
          required
          placeholder="Quantos acompanhamentos?"
          type="number"
          defaultValue={size?.amountCreams ? size.amountCreams : 1}
          {...register("amountCreams")}
          min={1}
        />
      </Form.Group>
    </>
  );
}

export default Fields;
