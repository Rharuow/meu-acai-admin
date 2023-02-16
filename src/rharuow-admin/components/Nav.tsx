import { faUser, IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { faGear, faReceipt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import { Nav, Navbar, Offcanvas } from "react-bootstrap";

import { useLayoutContext } from "../context/Layout";

import { useWindowSize } from "../Hooks/windowsize";

export default function NavComponent({
  width = 45,
  height = 45,
  size,
  menuItems = [],
  className = " ",
}: {
  width?: number;
  height?: number;
  size?: number;
  menuItems?: Array<{ text: string; icon?: IconDefinition }>;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const { isMobile } = useWindowSize();

  const { theme } = useLayoutContext();

  return (
    <div className={`d-flex p-3 bg-primary rounded-bottom ${className}`}>
      <Image
        alt="logo"
        priority
        src={`/product/logo${theme === "dark" ? "-dark.png" : ".png"}`}
        className="rounded-circle"
        width={size ? size : width}
        height={size ? size : height}
      />
      <div className="d-flex"></div>
      <div className="d-flex w-100 justify-content-end">
        <Navbar expand="md" expanded={expanded}>
          <Navbar.Toggle
            aria-controls="header-button"
            onClick={() => setExpanded((prevState) => !prevState)}
            className="text-secondary bg-secondary-dark"
          />
          <Navbar.Offcanvas
            id="header-button"
            aria-labelledby="header-button-to-control-content"
            placement="end"
          >
            <Offcanvas.Header
              closeButton
              onClick={() => setExpanded((prevState) => !prevState)}
              className="justify-content-end"
            ></Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column">
              {menuItems.map((item, index) => (
                <Nav.Link
                  key={index}
                  className="mb-3 text-primary fw-bold"
                  onClick={() => {
                    setExpanded((prevState) => !prevState);
                  }}
                >
                  {item.icon && (
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="text-primary"
                    />
                  )}{" "}
                  {item.text}
                </Nav.Link>
              ))}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
      </div>
    </div>
  );
}
