import { getTypedObjectKeys } from "@yamori-shared/react-utilities";
import type { SupportedElement } from "./types";

export const INITIAL_COLOR_STEP = 20;

export const INITIAL_STATE = {
  color: {
    primary: "#4285f4",
    neutral: "#cccccc",
  },
  mappings: {
    color: {
      names: ["bg", "text", "border"] as const,
      levels: {
        "softest": -2,
        "softer": -1,
        "": 0,
        "stronger": 1,
        "strongest": 2,
      },
    },
  },
};

export const SUPPORTED_COLORS = getTypedObjectKeys(INITIAL_STATE["color"]);

export const SUPPORTED_ELEMENTS: Array<SupportedElement> = [
  {
    tag: "button",
    props: {
      children: "button",
    },
    style: {
      all: "unset",
    },
    customization: [
      {
        type: "border",
        property: "borderColor",
      },
      {
        type: "bg",
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
    name: "link",
    tag: "a",
    props: {
      children: "link",
      href: "#",
    },
    customization: [
      {
        type: "text",
        property: "color",
      },
    ],
    states: ["active", "hover", "visited"],
  },
  {
    name: "checkbox",
    tag: "input",
    props: {
      type: "checkbox",
    },
    customization: [
      {
        type: "bg",
        property: "accentColor",
      },
    ],
    states: ["active", "hover", "disabled"],
  },
  {
    name: "radio",
    tag: "input",
    props: {
      type: "radio",
    },
    customization: [
      {
        type: "bg",
        property: "accentColor",
      },
    ],
    states: ["active", "hover", "disabled"],
  },
];
