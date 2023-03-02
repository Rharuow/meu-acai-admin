import { Topping } from "@/src/entities/Product";
import { updateTopping } from "@/src/service/docs/toppings";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Fields from "./Form/Fields";

function Edit({
  topping,
  children,
  action,
}: {
  topping?: Topping;
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

    const toppingEdited =
      topping && (await updateTopping(topping.id, dataFormatted));
    Swal.fire({
      title: toppingEdited ? "Perfeito" : "Opss",
      text: toppingEdited
        ? "O acompanhamento foi editado com sucesso!"
        : "Os acompanhamentos devem ter nomes diferentes...",
      icon: toppingEdited ? "success" : "error",
      confirmButtonText: "OK",
    }).then(() => {
      toppingEdited && action && action();
    });
  };
  return (
    <FormProvider {...methods}>
      <Form validated={validated} onSubmit={methods.handleSubmit(onSubmit)}>
        <>
          <Fields topping={topping} />
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
