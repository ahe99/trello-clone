import "../styles/globals.css";

import { ModalProvider } from "@context/modal";

export const decorators = [
  (Story) => {
    return (
      <ModalProvider>
        <Story />
      </ModalProvider>
    );
  },
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },

  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "base",
    values: [
      {
        name: "base",
        value: "#f5f5f5",
      },
      {
        name: "light",
        value: "#ffffff",
      },
      {
        name: "dark",
        value: "rgb(51, 51, 51)",
      },
    ],
  },

  options: {
    storySort: {
      includeName: true,
      method: "",
      order: ["pages", "atoms", "molecules", "organisms", "templates"],
    },
    panelPosition: "right",
  },
};

// Add support for Next.js `NextImage` component feature
import * as NextImage from "next/image";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
