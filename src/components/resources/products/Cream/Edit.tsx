import { Cream } from "@/src/entities/Product";
import { updateCream } from "@/src/service/docs/creams";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Fields from "./Form/Fields";

function Edit({
  cream,
  children,
  action,
}: {
  cream?: Cream;
  children?: JSX.Element;
  action?: () => void;
}) {
  const methods = useForm<Cream>();
  const [validated, setValidated] = useState(false);

  const onSubmit = async (data: Cream) => {
    setValidated(true);

    const creamEdited = cream && (await updateCream(cream.id, data));
    Swal.fire({
      title: creamEdited ? "Perfeito" : "Opss",
      text: creamEdited
        ? "O creme foi editado com sucesso!"
        : "Os cremes devem ter nomes diferentes...",
      icon: creamEdited ? "success" : "error",
      confirmButtonText: "OK",
    }).then(() => {
      creamEdited && action && action();
    });
  };
  return (
    <FormProvider {...methods}>
      <Form validated={validated} onSubmit={methods.handleSubmit(onSubmit)}>
        <>
          <Fields cream={cream} />
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
