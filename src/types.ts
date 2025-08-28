import type { CSSProperties, HTMLProps, JSX } from "react";
import type { INITIAL_STATE } from "./constants";

export type SupportedTag = {
  name?: string;
  props?: HTMLProps<HTMLElement>;
  tag: keyof JSX.IntrinsicElements;
  customization: Array<{
    type: "surface" | "border" | "text";
    property: keyof CSSProperties;
  }>;
  states: Array<"hover" | "active" | "disabled" | "visited">;
};

export type StoreState = typeof INITIAL_STATE;

export type Colors = keyof StoreState["colors"];

export type Mappings = keyof StoreState["mappings"];

export type ColorHSL = {
  hue: number;
  saturation: number;
  lightness: number;
};
