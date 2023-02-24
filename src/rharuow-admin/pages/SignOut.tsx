import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import SignOutAnimation from "../components/SignOut";
import { useSessionContext } from "../context/Session";

function SignOut() {
  const { setUser } = useSessionContext();

  const makingSignOut = () => {
    setTimeout(() => {
      Cookies.remove("user");
      setUser(undefined);
    }, 2000);
  };

  useEffect(() => {
    makingSignOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal show={true} centered>
      <Modal.Body className="bg-primary border-radius-2">
        <SignOutAnimation />
      </Modal.Body>
    </Modal>
  );
}

export default SignOut;
