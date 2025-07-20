import type { SupportedTag } from "./types";

export const INITIAL_COLOR_STEP = 20;

export const INITIAL_STATE = {
  colors: {
    primary: "#4285f4",
    neutral: "#cccccc",
  },
  mappings: {
    surface: {
      primary: "neutral-500",
      action: "primary-500",
    },
  },
};

export type StoreState = typeof INITIAL_STATE;

export type Colors = keyof StoreState["colors"];

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
