import type { CSSProperties, JSX } from "react";
import type { INITIAL_STATE, SUPPORTED_COLORS } from "./constants";

export type SupportedElement = {
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>;
  tag: keyof JSX.IntrinsicElements;
  style?: CSSProperties;
  customization: Array<{
    type: Mappings;
    property: keyof CSSProperties;
  }>;
  states: Array<"hover" | "active" | "disabled" | "visited">;
};

export type StoreState = typeof INITIAL_STATE;

export type Colors = (typeof SUPPORTED_COLORS)[number];

export type Mappings = StoreState["mappings"]["color"]["names"][number];

export type MappingsLevels = keyof StoreState["mappings"]["color"]["levels"];

export type ColorHSL = {
  hue: number;
  saturation: number;
  lightness: number;
};

export type DeepObject = {
  [key: string]: string | number | DeepObject;
};

export type ColorsState = Record<
  Colors,
  { base: string; step: number } & Record<number, string>
>;
