import React from "react";
import Image from "next/image";
import { Button, Card, Form } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import { useSessionContext } from "../context/Session";
import Cookies from "js-cookie";

type Inputs = {
  username: string;
  password: string;
};

export default function SignIn() {
  const { register, handleSubmit, watch } = useForm<Inputs>();

  const { setUser } = useSessionContext();

  const hasData = !!watch("username") && !!watch("password");

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    if (
      data.username === process.env.NEXT_PUBLIC_USERNAME &&
      data.password === process.env.NEXT_PUBLIC_PASSWORD
    ) {
      Cookies.set("name", JSON.stringify(data.username));
      setUser({ name: data.username });
      router.push("/");
    } else
      Swal.fire({
        title: "Opps...",
        icon: "error",
        text: "Parece que você digitou a senha errada!",
      });
  };

  return (
    <div className="min-h-100vh d-flex justify-content-center align-items-center">
      <div className="d-flex flex-wrap px-3">
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
                  disabled={!hasData}
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
