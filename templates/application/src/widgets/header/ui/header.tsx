import Link from "next/link";
import { FC } from "react";

import { Container, createBem, E_ROUTES } from "@/shared";

import styles from "./header.module.scss";

const Header: FC = () => {
  const bem = createBem("header", styles);
  return (
    <header className={bem("")}>
      <Container className={bem("container")}>
        <Link href={E_ROUTES.HOME} title="">
          Link
        </Link>
      </Container>
    </header>
  );
};

export default Header;
