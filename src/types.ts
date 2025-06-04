import type { CSSProperties, HTMLProps, JSX } from "react";

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
