import React from "react";
import Image from "next/image";
import { Button, Card, Form } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { MD5, SHA256 } from "crypto-js";

import { useSessionContext } from "../context/Session";
import Cookies from "js-cookie";
import { getAdmin } from "@/src/service/docs/admin";

type Inputs = {
  username: string;
  password: string;
};

export default function SignIn() {
  const { register, handleSubmit, watch } = useForm<Inputs>();

  const { setUser } = useSessionContext();

  const hasData = !!watch("username") && !!watch("password");

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const admin = await getAdmin({
      name: data.username,
      password: SHA256(data.password).toString(),
    });
    if (admin) {
      Cookies.set(
        "user",
        JSON.stringify({
          name: admin.name,
          password: SHA256(admin.password).toString(),
        })
      );
      setUser({ ...admin, password: SHA256(admin.password).toString() });
      router.push("/");
    } else
      Swal.fire({
        title: "Opps...",
        icon: "error",
        text: "Parece que você errou a senha ou usuário!",
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-wrap">
      <div className="d-flex justify-content-center align-items-center w-100">
        <Image
          alt="logo"
          priority
          src="/product/meu-açai.png"
          className="rounded-circle"
          width={150}
          height={150}
        />
      </div>
      <Card bg="primary">
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
  );
}
