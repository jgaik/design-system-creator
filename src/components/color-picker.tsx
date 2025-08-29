import { useStore } from "../store";
import type { Colors } from "../types";

type ColorPickerProps = {
  name: Colors;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({ name }) => {
  const colors = useStore((state) => state.colors[name]);
  const setBase = useStore((state) => state.setColorBase);
  const setStep = useStore((state) => state.setColorStep);

  return (
    <>
      <tr>
        <th scope="row" rowSpan={colors.shades.length + 1}>
          {name}
        </th>
        <td colSpan={2}>
          <input
            type="color"
            onChange={(e) => setBase(name, e.currentTarget.value)}
            value={colors.base}
          />
          <input
            type="range"
            min={5}
            max={45}
            step={5}
            value={colors.step}
            onChange={(e) => setStep(name, e.currentTarget.valueAsNumber)}
          />
          {colors.step}
        </td>
      </tr>
      {colors.shades.map(([key, backgroundColor]) => (
        <tr key={key} data-step={key}>
          <td
            style={{
              backgroundColor,
            }}
          />

          <td>
            --color-{name}-{key}
          </td>
        </tr>
      ))}
    </>
  );
};
