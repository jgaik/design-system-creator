import { Colors } from "./components";
import { useStore } from "./store";

export default function App() {
  const colors = useStore((state) => state.colors);

  return (
    <main>
      <style>
        {`:root {
            ${Object.entries(colors)
              .map(([name, { shades }]) =>
                shades.map((shade, idx) => `--color-${name}-${idx}: ${shade};`)
              )
              .flat()
              .join("\n")}`}
      </style>
      <Colors />
    </main>
  );
}
