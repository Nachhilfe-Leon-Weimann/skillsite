import React from "react";

import type { Preview } from "@storybook/nextjs-vite";

import "./preview.css";

/* The apps inject --font-hanken / --font-bricolage via next/font; the
   workbench falls back to the system stack declared in the theme. */
const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Colour scheme",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === "dark" ? "dark" : "light";
      document.documentElement.dataset.theme = theme;
      return <Story />;
    },
  ],
};

export default preview;
