import { getTypedObjectEntries } from "@yamori-shared/react-utilities";
import { useStore } from "../store";

export const Styles: React.FC = () => {
  const colors = useStore((state) => state.colors);

  return (
    <style>{`:root {
\t${getTypedObjectEntries(colors)
      .map(([name, value]) =>
        value.shades.map(
          ({ key, shade }) => `--color-${name}-${key}: ${shade};`
        )
      )
      .flat()
      .join("\n\t")}
}`}</style>
  );
};
