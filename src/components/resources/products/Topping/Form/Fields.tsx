import { Topping } from "@/src/entities/Product";
import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { useFormContext } from "react-hook-form";
import Switch from "react-switch";

function Fields({ topping }: { topping?: Topping }) {
  const { register, setValue, watch } = useFormContext();

  useEffect(() => {
    topping && setValue("visible", topping.visible);
    topping && setValue("justExtra", topping.justExtra);
    topping && setValue("isExtra", topping.isExtra);
    topping && setValue("value", topping.value);
  }, [setValue, topping]);

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
          {...register("unit")}
          {...(topping?.unit && { defaultValue: topping?.unit })}
        />
      </Form.Group>
      <Form.Group className="mb-3 d-flex" controlId="value">
        <Form.Label className="fw-bold text-primary me-3">
          Somente Extra?
        </Form.Label>
        <Switch
          {...register("justExtra")}
          onChange={(e) => {
            setValue("justExtra", e);
            setValue("isExtra", e);
          }}
          checked={watch("justExtra")}
          onColor="#198754"
          offColor="#ff4136"
        />
      </Form.Group>
      <Form.Group className="mb-3 d-flex" controlId="value">
        <Form.Label className="fw-bold text-primary me-3">Extra?</Form.Label>
        <Switch
          {...register("isExtra")}
          onChange={(e) => {
            !watch("justExtra") && setValue("isExtra", e);
          }}
          checked={watch("isExtra")}
          onColor="#198754"
          offColor="#ff4136"
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
