import { Size } from "@/src/entities/Product";
import { updateSize } from "@/src/service/docs/sizes";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Fields from "./Form/Fields";

function Edit({
  size,
  children,
  action,
}: {
  size?: Size;
  children?: JSX.Element;
  action?: () => void;
}) {
  const methods = useForm<Size>();
  const [validated, setValidated] = useState(false);

  const onSubmit = async (data: Size) => {
    setValidated(true);

    const dataFormatted: Size = { ...data, value: parseFloat(`${data.value}`) };

    const sizeEdited = size && (await updateSize(size.id, dataFormatted));
    Swal.fire({
      title: sizeEdited ? "Perfeito" : "Opss",
      text: sizeEdited
        ? "O tamanho foi editado com sucesso!"
        : "Os tamanhos devem ter nomes diferentes...",
      icon: sizeEdited ? "success" : "error",
      confirmButtonText: "OK",
    }).then(() => {
      sizeEdited && action && action();
    });
  };
  return (
    <FormProvider {...methods}>
      <Form validated={validated} onSubmit={methods.handleSubmit(onSubmit)}>
        <>
          <Fields size={size} />
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
