import { Topping } from "@/src/entities/Product";
import { createTopping } from "@/src/service/docs/toppings";
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
  const methods = useForm<Topping>();
  const [validated, setValidated] = useState(false);

  const onSubmit = async (data: Topping) => {
    setValidated(true);

    const dataFormatted: Topping = {
      ...data,
      value: parseFloat(`${data.value}`.replace(/,/g, ".")),
    };

    const toppingCreated = await createTopping(dataFormatted);
    Swal.fire({
      title: toppingCreated ? "Perfeito" : "Opss",
      text: toppingCreated
        ? "O acompanhamento foi criado com sucesso!"
        : "Os acompanhamentos devem ter nomes diferentes...",
      icon: toppingCreated ? "success" : "error",
      confirmButtonText: "OK",
    }).then(() => {
      toppingCreated && action && action();
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
