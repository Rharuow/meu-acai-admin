import { Size } from "@/src/entities/Product";
import { createSize } from "@/src/service/docs/sizes";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import Fields from "./Form/Fields";

function Edit({ size }: { size?: Size }) {
  const methods = useForm<Size>();
  const [validated, setValidated] = useState(false);

  const onSubmit = async (data: Size) => {
    setValidated(true);
    // const sizeCreated = await createSize(data);
    const dataFormatted: Size = { ...data, value: parseFloat(`${data.value}`) };

    console.log(dataFormatted);
  };
  return (
    <FormProvider {...methods}>
      <Form validated={validated} onSubmit={methods.handleSubmit(onSubmit)}>
        <Fields size={size} />
      </Form>
    </FormProvider>
  );
}

export default Edit;
