import { FC } from "react";

import { Container, createBem } from "@/shared";

import styles from "./footer.module.scss";

const Footer: FC = () => {
  const bem = createBem("footer", styles);
  return (
    <footer className={bem("")}>
      <Container className={bem("container")} />
    </footer>
  );
};

export default Footer;
