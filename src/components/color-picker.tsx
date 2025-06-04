import { useStore } from "../store";
import type { Colors } from "../constants";

type ColorPickerProps = {
  name: Colors;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({ name }) => {
  const colors = useStore((state) => state.colors[name]);
  const setBase = useStore((state) => state.setBase);
  const setLevels = useStore((state) => state.setLevels);

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
        min={3}
        max={10}
        value={colors.shades.length}
        onChange={(e) => setLevels(name, e.currentTarget.valueAsNumber)}
      />
      <ol>
        {colors.shades.map((shade) => (
          <li key={shade}>
            <div
              style={{
                backgroundColor: shade,
                height: `${15 / colors.shades.length}rem`,
              }}
            />
          </li>
        ))}
      </ol>
    </details>
  );
};
