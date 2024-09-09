import classNames from "classnames";
import { Inter } from "next/font/google";
// Uncomment the following line if you want to use a local font or delete it if you don't need it
// import localFont from "next/font/local";

// Define the fonts here
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

// Add more fonts here
// const greatVibes = localFont({ src: "./GreatVibes-Regular.ttf", variable: "--font-great-vibes" });

export const classname = classNames(
  inter.variable,
);
