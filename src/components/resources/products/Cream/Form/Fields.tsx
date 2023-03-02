import { Cream } from "@/src/entities/Product";
import React from "react";
import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

function Fields({ cream }: { cream?: Cream }) {
  const { register } = useFormContext();

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
    </>
  );
}

export default Fields;
