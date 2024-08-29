"use client";

import { MouseEvent, useCallback } from "react";

const useSmoothScroll = () => {
  return useCallback((event?: MouseEvent<HTMLAnchorElement>, id?: string) => {
    if (event) {
      event.preventDefault();
    }
    const targetId = id || (event?.currentTarget.getAttribute("href")?.substring(1) ?? "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
};

export default useSmoothScroll;
