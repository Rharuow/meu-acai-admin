import { Size } from "@/src/entities/Product";
import { createSize } from "@/src/service/docs/sizes";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Fields from "./Form/Fields";

export default function Create({
  children,
  action,
}: {
  children?: JSX.Element;
  action?: () => void;
}) {
  const methods = useForm<Size>();
  const [validated, setValidated] = useState(false);

  const onSubmit = async (data: Size) => {
    setValidated(true);

    const dataFormatted: Size = {
      ...data,
      amountCreams: parseInt(`${data.amountCreams}`),
      amountOptions: parseInt(`${data.amountOptions}`),
      value: parseFloat(`${data.value}`.replace(/,/g, ".")),
    };

    const sizeCreated = await createSize(dataFormatted);
    Swal.fire({
      title: sizeCreated ? "Perfeito" : "Opss",
      text: sizeCreated
        ? "O tamanho foi criado com sucesso!"
        : "Os tamanhos devem ter nomes diferentes...",
      icon: sizeCreated ? "success" : "error",
      confirmButtonText: "OK",
    }).then(() => {
      sizeCreated && action && action();
    });
  };
  return (
    <FormProvider {...methods}>
      <Form validated={validated} onSubmit={methods.handleSubmit(onSubmit)}>
        <>
          <Fields />
          {children ? (
            children
          ) : (
            <div className="d-flex justify-content-end">
              <Button variant="success" type="submit">
                Salvar
              </Button>
            </div>
          )}
        </>
      </Form>
    </FormProvider>
  );
}
