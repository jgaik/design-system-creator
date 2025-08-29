import { getTypedObjectEntries } from "@yamori-shared/react-utilities";
import { useStore } from "../store";

export const Styles: React.FC = () => {
  const colors = useStore((state) => state.colors);
  const mappings = useStore((state) => state.mappings);

  return (
    <style>{`:root {
\t${getTypedObjectEntries(colors)
      .map(([name, value]) =>
        value.shades.map(([key, shade]) => `--color-${name}-${key}: ${shade};`)
      )
      .flat()
      .join("\n\t")}
\t${getTypedObjectEntries(mappings)
      .map(([name, value]) =>
        Object.entries(value).map(
          ([key, mapping]) => `--${name}-${key}: var(${mapping});`
        )
      )
      .flat()
      .join("\n\t")}
}`}</style>
  );
};
