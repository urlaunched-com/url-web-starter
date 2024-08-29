const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./i18n.ts");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import("next").NextConfig} */

const nextConfig = {
  sassOptions: {
    includePaths: ["./src/core/styles/"],
    // eslint-disable-next-line quotes
    prependData: '@import "helper.scss";',
  },
  images: {
    formats: ["image/webp"],
  },

  webpack(config) {
    const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.(".svg"));

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        cleanupIds: false,
                        removeViewBox: false,
                      },
                    },
                  },
                  "removeXMLNS",
                ],
              },
            },
          },
        ],
      }
    );
    return config;
  },
};

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
