import { create } from "zustand";
import { combine } from "zustand/middleware";
import { generateBaseColor, generateColorShades } from "./utilities";
import {
  INITIAL_COLOR_STEP,
  INITIAL_STATE,
  SUPPORTED_COLORS,
  SUPPORTED_ELEMENTS,
} from "./constants";
import { getTypedObjectEntries } from "@yamori-shared/react-utilities";
import type { Colors, ColorsState, Mappings, StoreState } from "./types";

function generateColorMappings(
  colors: ColorsState
): Record<Mappings, Record<string, string>> {
  const getVariableEntry = (
    color: Colors,
    level: [keyof StoreState["mappings"]["color"]["levels"], number]
  ): [string, string] => {
    const [levelName, levelIdx] = level;

    const levelSuffix = levelName ? `-${levelName}` : "";

    const shades = Object.keys(colors[color]).filter((key) =>
      /^\d+$/.test(key)
    );

    const baseIdx = Math.floor(shades.length / 2);

    const shadeIdx = Math.min(
      Math.max(baseIdx + levelIdx, 0),
      shades.length - 1
    );

    return [color + levelSuffix, `--color-${color}-${shades[shadeIdx]}`];
  };

  return Object.fromEntries(
    INITIAL_STATE["mappings"]["color"]["names"].map((name) => [
      name,
      Object.fromEntries(
        SUPPORTED_COLORS.flatMap((color) =>
          getTypedObjectEntries(
            INITIAL_STATE["mappings"]["color"]["levels"]
          ).map((level) => getVariableEntry(color, level))
        )
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
  ) as unknown as ColorsState;

  const elements = Object.fromEntries(
    SUPPORTED_ELEMENTS.map((element) => [
      element.name ?? element.tag,
      Object.fromEntries(
        ["default", ...element.states].map((state) => [
          state,
          element.customization.map((customization) => ({
            ...customization,
            value: "none",
          })),
        ])
      ),
    ])
  );

  return {
    color,
    mappings: generateColorMappings(color),
    elements,
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
          mappings: generateColorMappings(nextColor),
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
