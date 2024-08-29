"use client";

import { Analytics, getAnalytics, isSupported } from "@firebase/analytics";

import { FirebaseOptions, initializeApp } from "@firebase/app";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "apiKey",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "authDomain",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "projectId",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "storageBucket",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "messagingSenderId",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "appId",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "measurementId",
};

export const app = initializeApp(firebaseConfig);

export const initFirebaseAnalytics = () => {
  getAnalytics(app);
};

export const getFirebaseAnalytics = () => {
  if (typeof window !== "undefined") {
    return getAnalytics(app);
  }
  return null;
};
export const firebaseAnalyticsInstance: Analytics | null = getFirebaseAnalytics();

isSupported().then(supported => supported && getAnalytics(app));
