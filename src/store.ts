import { create } from "zustand";
import { combine } from "zustand/middleware";
import type { Colors } from "./types";
import { generateColorShades } from "./utilities";
import {
  INITIAL_COLOR_LEVELS,
  INITIAL_NEUTRAL_COLOR,
  INITIAL_PRIMARY_COLOR,
} from "./constants";

export const useStore = create(
  combine(
    {
      colors: {
        primary: {
          base: INITIAL_PRIMARY_COLOR,
          shades: generateColorShades(
            INITIAL_PRIMARY_COLOR,
            INITIAL_COLOR_LEVELS
          ),
        },
        neutral: {
          base: INITIAL_NEUTRAL_COLOR,
          shades: generateColorShades(
            INITIAL_NEUTRAL_COLOR,
            INITIAL_COLOR_LEVELS
          ),
        },
      } satisfies Record<Colors, { base: string; shades: string[] }>,
    },
    (set) => ({
      setBase: (color: Colors, base: string) =>
        set((state) => {
          const levels = state.colors[color].shades.length;

          return {
            colors: {
              ...state.colors,
              [color]: {
                base,
                shades: generateColorShades(base, levels),
              },
            },
          };
        }),
      setLevels: (color: Colors, levels: number) =>
        set((state) => {
          const base = state.colors[color].base;

          return {
            colors: {
              ...state.colors,
              [color]: {
                base,
                shades: generateColorShades(base, levels),
              },
            },
          };
        }),
    })
  )
);
