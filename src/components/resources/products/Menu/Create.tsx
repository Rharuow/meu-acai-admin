import { Menu } from "@/src/entities/Product";
import { createMenu } from "@/src/service/docs/menus";
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
  const methods = useForm<Menu>();
  const [validated, setValidated] = useState(false);

  const onSubmit = async (data: Menu) => {
    setValidated(true);

    const dataFormatted: Menu = {
      ...data,
      value: parseFloat(`${data.value}`.replace(/,/g, ".")),
    };

    const menuCreated = await createMenu(dataFormatted);
    Swal.fire({
      title: menuCreated ? "Perfeito" : "Opss",
      text: menuCreated
        ? "O produto foi criado com sucesso!"
        : "Os produtos devem ter nomes diferentes...",
      icon: menuCreated ? "success" : "error",
      confirmButtonText: "OK",
    }).then(() => {
      menuCreated && action && action();
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
