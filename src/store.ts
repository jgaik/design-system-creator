import { create } from "zustand";
import { combine } from "zustand/middleware";
import { generateBaseColor, generateColorShades } from "./utilities";
import { INITIAL_COLOR_STEP, INITIAL_STATE, type Colors } from "./constants";
import { getTypedObjectEntries } from "@yamori-shared/react-utilities";

export const useStore = create(
  combine(
    {
      colors: Object.fromEntries(
        getTypedObjectEntries(INITIAL_STATE["colors"]).map(([name, base]) => [
          name,
          {
            base,
            step: INITIAL_COLOR_STEP,
            shades: generateColorShades(base, INITIAL_COLOR_STEP, name),
          },
        ])
      ) as Record<
        Colors,
        {
          base: string;
          step: number;
          shades: Array<{ key: number; shade: string }>;
        }
      >,
      // mappings: Object.fromEntries(getTypedObjectEntries(INITIAL_STATE['mappings']).map()),
    },
    (set) => ({
      setBase: (color: Colors, base: string) =>
        set((state) => {
          const step = state.colors[color].step;
          const updatedBase = generateBaseColor(base, color);

          return {
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
      setStep: (color: Colors, step: number) =>
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
    })
  )
);
