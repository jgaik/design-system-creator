import { create } from "zustand";
import { combine } from "zustand/middleware";
import { generateBaseColor, generateColorShades } from "./utilities";
import { INITIAL_COLOR_STEP, INITIAL_STATE } from "./constants";
import { getTypedObjectEntries } from "@yamori-shared/react-utilities";
import type { Colors, Mappings } from "./types";

function initializeColorMappings(
  colors: Record<
    Colors,
    { base: string; step: number } & Record<number, string>
  >
): Record<Mappings, Record<string, string>> {
  const findColor = (value: string) => {
    if (value.includes(":")) {
      const [colorName, shadeString] = value.split(":");

      if (!(colorName in colors))
        throw new Error("Incorrect mapping color name");

      const shades = Object.keys(colors[colorName as Colors]).filter((key) =>
        /^\d+$/.test(key)
      );

      const shadeIdx = Math.floor(shades.length / 2) + parseInt(shadeString);

      return `--color-${colorName}-${shades[shadeIdx]}`;
    }

    return `--color-${value}`;
  };

  return Object.fromEntries(
    getTypedObjectEntries(INITIAL_STATE["mappings"]).map(([name, base]) => [
      name,
      Object.fromEntries(
        Object.entries(base).map(([subname, defaultValue]) => [
          subname,
          findColor(defaultValue),
        ])
      ),
    ])
  ) as unknown as Record<Mappings, Record<string, string>>;
}

function createInitialState() {
  const color = Object.fromEntries(
    getTypedObjectEntries(INITIAL_STATE["color"]).map(([name, base]) => [
      name,
      {
        base,
        step: INITIAL_COLOR_STEP,
        ...generateColorShades(base, INITIAL_COLOR_STEP, name),
      },
    ])
  ) as unknown as Record<
    Colors,
    { base: string; step: number } & Record<number, string>
  >;

  return {
    color,
    mappings: initializeColorMappings(color),
  };
}

export const useStore = create(
  combine(createInitialState(), (set) => ({
    setColorBase: (color: Colors, base: string) =>
      set((state) => {
        const step = state.color[color].step;
        const updatedBase = generateBaseColor(base, color);

        return {
          ...state,
          color: {
            ...state.color,
            [color]: {
              base: updatedBase,
              step,
              ...generateColorShades(updatedBase, step, color),
            },
          },
        };
      }),
    setColorStep: (color: Colors, step: number) =>
      set((state) => {
        const base = state.color[color].base;
        const nextColor = {
          ...state.color,
          [color]: {
            base,
            step,
            ...generateColorShades(base, step, color),
          },
        };

        return {
          ...state,
          color: nextColor,
          mappings: initializeColorMappings(nextColor),
        };
      }),
    setMapping: (mapping: Mappings, variable: string, color: string) =>
      set((state) => {
        const currentMapping = state.mappings[mapping];

        return {
          ...state,
          mappings: {
            ...state.mappings,
            [mapping]: {
              ...currentMapping,
              [variable]: color,
            },
          },
        };
      }),
  }))
);
