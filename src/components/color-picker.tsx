import { useMemo } from "react";
import { useStore } from "../store";
import type { Colors } from "../types";

type ColorPickerProps = {
  name: Colors;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({ name }) => {
  const { base, step, ...rest } = useStore((state) => state.color[name]);
  const setBase = useStore((state) => state.setColorBase);
  const setStep = useStore((state) => state.setColorStep);

  const shades = useMemo(() => Object.keys(rest), [rest]);

  return (
    <>
      <tr>
        <th scope="row" rowSpan={shades.length + 1}>
          {name}
        </th>
        <td colSpan={2}>
          <input
            type="color"
            onChange={(e) => setBase(name, e.currentTarget.value)}
            value={base}
          />
          <input
            type="range"
            min={5}
            max={45}
            step={5}
            value={step}
            onChange={(e) => setStep(name, e.currentTarget.valueAsNumber)}
          />
          {step}
        </td>
      </tr>
      {shades.map((shade) => {
        const variable = `--color-${name}-${shade}`;

        return (
          <tr key={variable}>
            <td
              style={{
                backgroundColor: `var(${variable})`,
              }}
            />
            <td>{variable}</td>
          </tr>
        );
      })}
    </>
  );
};
