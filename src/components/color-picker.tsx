import { useStore } from "../store";
import type { Colors } from "../constants";
import { BemClassNamesCreator } from "@yamori-shared/react-utilities";
import "./color-picker.scss";

type ColorPickerProps = {
  name: Colors;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({ name }) => {
  const colors = useStore((state) => state.colors[name]);
  const setBase = useStore((state) => state.setBase);
  const setStep = useStore((state) => state.setStep);

  const bemClassNames = BemClassNamesCreator.create(
    "color-picker",
    undefined,
    "shades"
  );

  const maxShades = name === "neutral" ? 19 : 17;

  return (
    <details open>
      <summary>{name}</summary>
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
      <ol className={bemClassNames["shades"]}>
        {colors.shades.map(({ key, shade: backgroundColor }) => (
          <li key={key} data-step={key}>
            <div
              style={{
                backgroundColor,
                height: `${(1.5 * maxShades) / colors.shades.length}rem`,
              }}
            />
          </li>
        ))}
      </ol>
    </details>
  );
};
