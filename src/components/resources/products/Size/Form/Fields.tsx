import { Size } from "@/src/entities/Product";
import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { useFormContext } from "react-hook-form";
import Switch from "react-switch";

function Fields({ size }: { size?: Size }) {
  const { register, setValue, watch } = useFormContext<Size>();

  useEffect(() => {
    size && setValue("visible", size.visible);
    size && setValue("value", size.value);
  }, []);

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
          onValueChange={(value) => {
            value &&
              setValue("value", parseFloat(`${value}`.replace(/,/g, ".")));
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
      <Form.Group className="mb-3 d-flex" controlId="value">
        <Form.Label className="fw-bold text-primary me-3">Visível</Form.Label>
        <Switch
          {...register("visible")}
          onChange={(e) => setValue("visible", e)}
          checked={watch("visible")}
          onColor="#198754"
          offColor="#ff4136"
        />
      </Form.Group>
    </>
  );
}

export default Fields;
