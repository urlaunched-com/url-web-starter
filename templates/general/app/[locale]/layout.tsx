import { Metadata, Viewport } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations } from "next-intl/server";
import React, { FC, PropsWithChildren } from "react";

import { AnalyticsProvider, classname, E_SupportedLocales } from "@/core";

import "@/core/styles/main.scss";
import { Footer, Header } from "@/widgets";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL("https://canonical.com"),
    title: t("home.title"),
    description: t("home.description"),
    openGraph: {
      title: t("home.openGraph.title"),
      description: t("home.openGraph.description"),
      url: "/",
      type: "website",
      images: "/assets/images/meta-picture.png",
      siteName: "WebStarter",
    },
    alternates: {
      canonical: "/",
    },
    icons: [
      {
        rel: "icon",
        url: "/assets/icons/favicons/favicon.ico",
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        sizes: "any",
        url: "/assets/icons/favicons/favicon.svg",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/assets/icons/favicons/android-chrome-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        url: "/assets/icons/favicons/favicon-96x96.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/assets/icons/favicons/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/assets/icons/favicons/favicon-16.png",
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "32x32",
        url: "/assets/icons/favicons/favicon-32.png",
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "16x16",
        url: "/assets/icons/favicons/favicon-16.png",
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "180x180",
        url: "/assets/icons/favicons/apple-touch-icon-180x180.png",
      },
      {
        rel: "manifest",
        url: "/manifest",
      },
    ],
  };
}

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

interface IRootLayoutProps {
  params: {
    locale: E_SupportedLocales;
  };
}

const RootLayout: FC<PropsWithChildren<IRootLayoutProps>> = ({ params: { locale }, children }) => {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <head lang={locale || E_SupportedLocales.EN} />
      <body className={classname}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <AnalyticsProvider>
          <Header/>
          <main className="main">{children}</main>
          <Footer/>
        </AnalyticsProvider>
      </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
