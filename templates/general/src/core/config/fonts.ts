import classNames from "classnames";
import { Inter, Lora, Source_Sans_3 } from "next/font/google";
// Uncomment the following line if you want to use a local font or delete it if you don't need it
// import localFont from "next/font/local";

// Define the fonts here
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const lora = Lora({ variable: "--font-lora", subsets: ["latin"] });
const sourceCodePro400 = Source_Sans_3({ weight: "400", variable: "--font-source-400", subsets: ["latin"] });
const sourceCodePro700 = Source_Sans_3({ weight: "700", variable: "--font-source-700", subsets: ["latin"] });

// Add more fonts here
// const greatVibes = localFont({ src: "./GreatVibes-Regular.ttf", variable: "--font-great-vibes" });

export const classname = classNames(
  inter.variable,
  lora.variable,
  sourceCodePro400.variable,
  sourceCodePro700.variable
);
