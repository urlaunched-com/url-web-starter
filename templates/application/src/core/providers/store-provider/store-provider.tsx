"use client";

import React, { FC, PropsWithChildren, useRef } from "react";
import { Provider } from "react-redux";

import { AppStore } from "@/shared";

import { makeStore } from "../../model";

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
