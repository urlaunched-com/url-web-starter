"use client";

import { FC } from "react";

import { createBem } from "@/shared";

import styles from "./not-found.module.scss";

const NotFound: FC = () => {
  const bem = createBem("not-found", styles);

  return (
    <section className={bem("")}>
      <h1>404</h1>
      <p>Page not found</p>
    </section>
  );
};

export default NotFound;
