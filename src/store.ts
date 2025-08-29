import { create } from "zustand";
import { combine } from "zustand/middleware";
import { generateBaseColor, generateColorShades } from "./utilities";
import { INITIAL_COLOR_STEP, INITIAL_STATE } from "./constants";
import { getTypedObjectEntries } from "@yamori-shared/react-utilities";
import type { Colors, Mappings } from "./types";

function createInitialState() {
  const colors = Object.fromEntries(
    getTypedObjectEntries(INITIAL_STATE["colors"]).map(([name, base]) => [
      name,
      {
        base,
        step: INITIAL_COLOR_STEP,
        shades: generateColorShades(base, INITIAL_COLOR_STEP, name),
      },
    ])
  ) as unknown as Record<
    Colors,
    { base: string; step: number; shades: [number, string][] }
  >;

  const findColor = (value: string) => {
    if (value.includes(":")) {
      const [color, shadeString] = value.split(":");

      if (!(color in colors)) throw new Error("Incorrect mapping color name");

      const shades = colors[color as Colors].shades;

      const [shade] =
        shades[Math.floor(shades.length / 2) + parseInt(shadeString)];

      return `--color-${color}-${shade}`;
    }

    return `--color-${value}`;
  };

  const mappings = Object.fromEntries(
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

  return {
    colors,
    mappings,
  };
}

export const useStore = create(
  combine(createInitialState(), (set) => ({
    setColorBase: (color: Colors, base: string) =>
      set((state) => {
        const step = state.colors[color].step;
        const updatedBase = generateBaseColor(base, color);

        return {
          ...state,
          colors: {
            ...state.colors,
            [color]: {
              base: updatedBase,
              step,
              shades: generateColorShades(updatedBase, step, color),
            },
          },
        };
      }),
    setColorStep: (color: Colors, step: number) =>
      set((state) => {
        const base = state.colors[color].base;

        return {
          colors: {
            ...state.colors,
            [color]: {
              base,
              step,
              shades: generateColorShades(base, step, color),
            },
          },
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
