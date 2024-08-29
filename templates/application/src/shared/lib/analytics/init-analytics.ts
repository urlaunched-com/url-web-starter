import * as amplitude from "@amplitude/analytics-browser";

import { initFirebaseAnalytics } from "@/shared";

const AMPLITUDE_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || "";

export const amplitudeAnalyticsInstance = amplitude.createInstance();
export const initAmplitudeAnalytics = () => {
  amplitudeAnalyticsInstance.init(AMPLITUDE_KEY);
};

export const initAnalytics = () => {
  initFirebaseAnalytics();
  initAmplitudeAnalytics();
};
