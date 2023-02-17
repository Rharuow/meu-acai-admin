import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Switch from "react-switch";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleStatus = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="d-flex p-3 flex-wrap">
      <div className="w-100 mb-3">
        <label className="d-flex align-items-center justify-content-end">
          <span className="text-primary-light me-3">Aberto?</span>
          <Switch
            onChange={handleStatus}
            checked={isOpen}
            onColor="#198754"
            offColor="#ff4136"
          />
        </label>
      </div>
      <Card bg="primary" className="w-100">
        <Card.Body></Card.Body>
      </Card>
    </div>
  );
}
