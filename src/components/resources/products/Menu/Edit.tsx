import { Menu } from "@/src/entities/Product";
import { updateMenu } from "@/src/service/docs/menus";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Fields from "./Form/Fields";

function Edit({
  menu,
  children,
  action,
}: {
  menu?: Menu;
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

    const menuEdited = menu && (await updateMenu(menu.id, dataFormatted));
    Swal.fire({
      title: menuEdited ? "Perfeito" : "Opss",
      text: menuEdited
        ? "O produto foi editado com sucesso!"
        : "Os produtos devem ter nomes diferentes...",
      icon: menuEdited ? "success" : "error",
      confirmButtonText: "OK",
    }).then(() => {
      menuEdited && action && action();
    });
  };
  return (
    <FormProvider {...methods}>
      <Form validated={validated} onSubmit={methods.handleSubmit(onSubmit)}>
        <>
          <Fields menu={menu} />
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

export default Edit;
