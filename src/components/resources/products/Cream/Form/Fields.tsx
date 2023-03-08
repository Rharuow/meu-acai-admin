import { Cream } from "@/src/entities/Product";
import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import Switch from "react-switch";

function Fields({ cream }: { cream?: Cream }) {
  const { register, setValue, watch } = useFormContext();

  useEffect(() => {
    cream && setValue("visible", cream.visible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Form.Group className="mb-3" controlId="formCream">
        <Form.Label className="fw-bold text-primary">Nome</Form.Label>
        <Form.Control
          required
          placeholder="Ex: Açai, Creme de Ninho"
          {...(cream?.name && { defaultValue: cream.name })}
          {...register("name")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCream">
        <Form.Label className="fw-bold text-primary">
          Quantidade em estoque
        </Form.Label>
        <Form.Control
          {...register("amount")}
          placeholder="Qual total em estoque?"
          type="number"
          {...(cream?.amount && { defaultValue: cream.amount })}
          min={1}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCream">
        <Form.Label className="fw-bold text-primary">
          Unidade de medida
        </Form.Label>
        <Form.Control
          {...register("unit")}
          placeholder="Ex: L, litros, Caixas"
          {...(cream?.unit && { defaultValue: cream?.unit })}
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
