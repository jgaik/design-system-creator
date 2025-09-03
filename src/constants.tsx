import type { SupportedTag } from "./types";

export const INITIAL_COLOR_STEP = 20;

export const INITIAL_STATE = {
  color: {
    primary: "#4285f4",
    neutral: "#cccccc",
  },
  mappings: {
    bg: {
      "default": "neutral-0",
      "field": "neutral:0",
      "field-disabled": "neutral:-1",
      "action": "primary:0",
      "action-hover": "primary:-1",
      "action-active": "primary:1",
      "action-disabled": "neutral:-1",
    },
    text: {
      "default": "neutral:1",
      "field": "neutral:1",
      "field-placeholder": "neutral:0",
      "action": "primary:0",
      "action-hover": "primary:-1",
      "action-active": "primary:1",
      "action-disabled": "neutral:-1",
      "disabled": "neutral:-1",
    },
    border: {
      "default": "neutral:0",
      "field": "neutral:1",
      "field-focus": "primary:0",
      "field-disabled": "neutral:-1",
      "action": "primary:0",
      "action-hover": "primary:-1",
      "action-active": "primary:1",
      "action-disabled": "neutral:-1",
    },
  },
};

export const SUPPORTED_TAGS: Array<SupportedTag> = [
  {
    tag: "button",
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
        type: "bg",
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
        type: "bg",
        property: "accentColor",
      },
    ],
    states: ["active", "hover", "disabled"],
  },
];
