import { create } from "zustand";
import { combine } from "zustand/middleware";
import { generateColorShades } from "./utilities";
import { COLORS, INITIAL_COLOR_LEVELS, type Colors } from "./constants";
import { getTypedObjectEntries } from "@yamori-shared/react-utilities";

export const useStore = create(
  combine(
    {
      colors: Object.fromEntries(
        getTypedObjectEntries(COLORS).map(([name, base]) => [
          name,
          { base, shades: generateColorShades(base, INITIAL_COLOR_LEVELS) },
        ])
      ) as Record<Colors, { base: string; shades: string[] }>,
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
