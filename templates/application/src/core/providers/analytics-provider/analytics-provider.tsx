"use client";

import { FC, PropsWithChildren, useEffect, useState } from "react";

import { initAnalytics } from "@/shared";

const AnalyticsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [analyticsLoaded, setAnalyticsLoaded] = useState(false);

  useEffect(() => {
    if (!analyticsLoaded) {
      initAnalytics();
      setAnalyticsLoaded(true);
    }
  }, [analyticsLoaded]);

  return children;
};

export default AnalyticsProvider;
