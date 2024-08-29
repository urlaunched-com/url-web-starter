"use client";

import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { IPortalProps } from "./portal.types";

const Portal: FC<PropsWithChildren<IPortalProps>> = ({ children, element }) => {
  const ref = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      ref.current = element || document.body;
      setMounted(true);
    }
  }, [element]);

  return mounted ? createPortal(children, ref.current!) : null;
};

export default Portal;
