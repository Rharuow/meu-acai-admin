import { Cream } from "@/src/entities/Product";
import { createCream } from "@/src/service/docs/creams";
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
  const methods = useForm<Cream>();
  const [validated, setValidated] = useState(false);

  const onSubmit = async (data: Cream) => {
    setValidated(true);

    const creamCreated = await createCream(data);
    Swal.fire({
      title: creamCreated ? "Perfeito" : "Opss",
      text: creamCreated
        ? "O creme foi criado com sucesso!"
        : "Os cremes devem ter nomes diferentes...",
      icon: creamCreated ? "success" : "error",
      confirmButtonText: "OK",
    }).then(() => {
      creamCreated && action && action();
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
