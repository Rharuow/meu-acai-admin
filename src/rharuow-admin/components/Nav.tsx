import { faUser, IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { faGear, faReceipt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Nav, Navbar, Offcanvas } from "react-bootstrap";

import { useLayoutContext } from "../context/Layout";

import { useWindowSize } from "../Hooks/windowsize";

export default function NavComponent({
  width = 60,
  height = 60,
  size,
  menuItems = [],
  className = " ",
}: {
  width?: number;
  height?: number;
  size?: number;
  menuItems?: Array<{ text: string; icon?: IconDefinition; router: string }>;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const { isMobile } = useWindowSize();

  const router = useRouter();

  const { theme } = useLayoutContext();

  return (
    <div className={`d-flex p-3 bg-primary rounded-bottom mb-3 ${className}`}>
      <Image
        alt="logo"
        priority
        src={`/product/logo${theme === "dark" ? "-dark.png" : ".png"}`}
        className="rounded-circle"
        width={size ? size : width}
        height={size ? size : height}
      />
      <div className="d-flex"></div>
      <div className="d-flex w-100 align-items-center justify-content-end">
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
                  className="mb-3 text-primary fw-bold nav-link"
                  onClick={() => {
                    setExpanded((prevState) => !prevState);
                    router.push(item.router);
                  }}
                >
                  {item.icon && (
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="text-primary w-50px"
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
