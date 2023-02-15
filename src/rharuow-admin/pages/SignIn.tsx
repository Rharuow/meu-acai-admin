import React from "react";
import Image from "next/image";
import { Button, Card, Form } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";

type Inputs = {
  username: string;
  password: string;
};

export default function SignIn() {
  const { register, handleSubmit, watch } = useForm<Inputs>();

  const hasData = !!watch("username") && !!watch("password");

  const route = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    console.log("data = ", data);
    route.push("/dashboard");
  };

  return (
    <div className="min-h-100vh d-flex justify-content-center align-items-center">
      <div className="d-flex flex-wrap">
        <div className="d-flex justify-content-center w-100">
          <Image
            alt="logo"
            priority
            src="/product/meu-açai.png"
            className="rounded-circle"
            width={150}
            height={150}
          />
        </div>
        <Card bg="primary" className="w-100">
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Username</Form.Label>
                <Form.Control
                  placeholder="ex: Fulano de tal"
                  {...register("username")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Digite sua senha"
                  {...register("password")}
                />
              </Form.Group>
              <Form.Group className="d-flex flex-wrap justify-content-center">
                <Button
                  type="submit"
                  variant="secondary"
                  className="mb-1"
                  disabled={!hasData && process.env.NODE_ENV !== "development"}
                >
                  Entrar
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
