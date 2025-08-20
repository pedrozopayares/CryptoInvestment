/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import plugin from 'tailwindcss/plugin';
import { parseColor } from "tailwindcss/lib/util/color";

/** Converts HEX color to RGB */
const toRGB = (value) => {
  return parseColor(value).color.join(" ");
};

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        primary_dark: "rgb(var(--color-primary-dark) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        pending: "rgb(var(--color-pending) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        light: "rgb(var(--color-light) / <alpha-value>)",
        dark: "rgb(var(--color-dark) / <alpha-value>)",
      },
    },
  },
  plugins: [
    forms,
    plugin(function ({ addBase }) {
      addBase({
        // Default colors
        ":root": {
          "--color-primary": toRGB('#4BB517'),
          "--color-primary-dark": toRGB('#235E29'),
          "--color-secondary": toRGB('#FED04F'),
          "--color-success": toRGB('#69B538'),
          "--color-info": toRGB('#69B538'),
          "--color-warning": toRGB('#F9AD20'),
          "--color-pending": toRGB("#f97316"),
          "--color-danger": toRGB('#e3342f'),
          "--color-light": toRGB("#f1f5f9"),
          "--color-dark": toRGB("#1e293b"),
        },
      });
    }),
  ],
}

