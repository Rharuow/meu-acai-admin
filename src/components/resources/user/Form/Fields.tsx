import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFieldArray, useFormContext } from "react-hook-form";
import InputMask from "react-input-mask";
import Switch from "react-switch";
import Lottie from "lottie-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";

import { User } from "@/src/entities/User";
import { phoneFormatter } from "@/src/rharuow-admin/util/phoneHandler";
import listAddress from "@/src/utils/address";
import Separator from "@/src/rharuow-admin/components/Separator";
import animationNoUser from "@/src/components/lottie/no-user.json";

function Fields({ user }: { user: User }) {
  const { register, setValue, control } = useFormContext();
  const { houses, squares } = listAddress();

  const [isActive, setIsActive] = useState(!!user?.isActive);
  const [isBloqued, setIsBloqued] = useState(!!user?.isBloqued);

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "members",
  });

  const handleActivated = () => {
    setIsActive((pervState) => !pervState);
    setValue("isActive", !isActive);
  };
  const handleBloqued = () => {
    setIsBloqued((pervState) => !pervState);
    setValue("isBloqued", !isBloqued);
  };

  useEffect(() => {
    if (user) {
      setIsActive(!!user.isActive);
      setValue("isActive", !!user.isActive);
      setValue("isBloqued", !!user.isBloqued);
      user.members &&
        user.members.length > fields.length &&
        user.members.forEach((member) => {
          console.log("Passou");
          append({ name: member.name, birthday: member.birthday });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ToastContainer />
      <Form.Group className="mb-3" controlId="name">
        <Form.Label className="fw-bold text-primary">Nome</Form.Label>
        <Form.Control
          {...register("name")}
          required
          placeholder="Ex: Fulano de tal"
          defaultValue={user?.name}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="birthday">
        <Form.Label className="fw-bold text-primary">Aniversário</Form.Label>
        <Form.Control
          {...register("birthday")}
          type="date"
          {...(user &&
            user.birthday && {
              defaultValue: user.birthday,
            })}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="name">
        <Form.Label className="fw-bold text-primary">
          Código de validação
        </Form.Label>
        <Form.Control
          onClick={() => {
            copy(user?.hashCode);
            toast("Código copiado com sucesso!");
          }}
          {...register("hashCode")}
          readOnly
          defaultValue={user?.hashCode}
        />
        <Form.Text className="text-muted">
          Clique para copiar o código
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="wallet">
        <Form.Label className="fw-bold text-primary">Carteira</Form.Label>
        <Form.Control
          {...register("wallet")}
          type="number"
          required
          defaultValue={user?.wallet}
          min={0}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold text-primary">Telefone</Form.Label>
        <InputMask
          {...register("phone")}
          className="form-control"
          mask="+55(099)99999-9999"
          placeholder="Digite seu número"
          required
          defaultValue={phoneFormatter(user?.phone)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold text-primary">Endereço</Form.Label>
        <Form.Select
          {...register("address.square")}
          aria-label="What's your square house address"
          className="mb-3"
          required
          defaultValue={user?.address.square}
        >
          {squares.map((square, index) => (
            <option key={index} value={index + 1}>
              Quadra {index + 1}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          {...register("address.house")}
          defaultValue={user?.address.house}
          aria-label="What's your house number address"
        >
          {houses.map((house, index) => (
            <option key={index} value={index + 1}>
              Casa {index + 1}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold text-primary">
          {isActive ? "Ativo" : "Inativo"}
        </Form.Label>
        <div className="d-flex align-items-center">
          <Switch
            {...register("isActive")}
            onChange={handleActivated}
            checked={!!isActive}
            onColor="#198754"
            offColor="#ff4136"
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold text-primary">
          {isBloqued ? "Desbloquear?" : "Bloquear?"}
        </Form.Label>
        <div className="d-flex align-items-center">
          <Switch
            {...register("isBloqued")}
            onChange={handleBloqued}
            checked={!!isBloqued}
            onColor="#198754"
            offColor="#ff4136"
          />
        </div>
      </Form.Group>

      <p className="fs-4 fw-bold text-primary">Membros</p>
      <Separator className="mb-3" />
      {fields &&
        fields.map((member: any, index) => (
          <div key={member.id}>
            {index > 0 && <Separator dashed className="mb-3" />}
            <Form.Group className="mb-1">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                {...register(`members.${index}.name`)}
                required
                placeholder="Digite o nome do membro"
                defaultValue={member.name}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Aniversário</Form.Label>
              <Form.Control
                {...register(`members.${index}.birthday`)}
                required
                defaultValue={member.birthday}
                type="date"
              />
            </Form.Group>
            <Button
              variant="danger"
              className="mb-3"
              onClick={() => remove(index)}
            >
              <FontAwesomeIcon
                size="sm"
                className="text-white"
                icon={faTrash}
              />
            </Button>
          </div>
        ))}
      {fields.length > 0 ? (
        <Form.Group className="mb-3">
          <Button onClick={() => append({})}>+ Membro</Button>
        </Form.Group>
      ) : (
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          <Lottie animationData={animationNoUser} size={10} />
          <div className="w-100">
            <p className="fw-bold text-center">Ninguém por aqui</p>
          </div>
          <Button className="mb-3" onClick={() => append({})}>
            Adicionar primeiro membro
          </Button>
        </div>
      )}

      <Separator className="mb-3" />
    </div>
  );
}

export default Fields;
