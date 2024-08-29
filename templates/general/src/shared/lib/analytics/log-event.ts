"use client";

import { Analytics, logEvent } from "firebase/analytics";

import { amplitudeAnalyticsInstance, firebaseAnalyticsInstance } from "@/shared";

const createEventLogger = <T = Record<string, any>>(eventName: string, defaultParams: T = {} as T) => {
  return (params: T = {} as T) => {
    const finalParams = { ...defaultParams, ...params } as Record<string, any>;
    if (firebaseAnalyticsInstance) {
      logEvent(firebaseAnalyticsInstance as Analytics, eventName, finalParams);
    }
    amplitudeAnalyticsInstance.track(eventName, finalParams);
  };
};

export const ANALYTICS = {};
