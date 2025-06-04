import type { SupportedTag } from "./types";

export const INITIAL_COLOR_LEVELS = 5;

export const COLORS = {
  primary: "#4285f4",
  neutral: "#cccccc",
};

export type Colors = keyof typeof COLORS;

export const SUPPORTED_TAGS: Array<SupportedTag> = [
  {
    tag: "button",
    customization: [
      {
        type: "border",
        property: "borderColor",
      },
      {
        type: "surface",
        property: "backgroundColor",
      },
      {
        type: "text",
        property: "color",
      },
    ],
    states: ["active", "hover", "disabled"],
  },
  {
    name: "Link",
    tag: "a",
    customization: [
      {
        type: "text",
        property: "color",
      },
    ],
    states: ["active", "hover", "visited"],
  },
  {
    name: "Checkbox",
    tag: "input",
    props: {
      type: "checkbox",
    },
    customization: [
      {
        type: "surface",
        property: "accentColor",
      },
    ],
    states: ["active", "hover", "disabled"],
  },
  {
    name: "Radio",
    tag: "input",
    props: {
      type: "radio",
    },
    customization: [
      {
        type: "surface",
        property: "accentColor",
      },
    ],
    states: ["active", "hover", "disabled"],
  },
];
