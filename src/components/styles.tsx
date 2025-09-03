import { useStore } from "../store";
import { flattenObject } from "../utilities";

export const Styles: React.FC = () => {
  const color = useStore((state) => state.color);
  const mappings = useStore((state) => state.mappings);

  return (
    <style>{`:root {
\t${flattenObject(color)
      .map(([key, value]) => `--color-${key}: ${value};`)
      .join("\n\t")}
\n\t${flattenObject(mappings)
      .map(([key, value]) => `--${key}: var(${value});`)
      .join("\n\t")}
}`}</style>
  );
};
