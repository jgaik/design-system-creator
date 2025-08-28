import {
  ColorPicker,
  MappingPicker,
  SettingsSection,
  Styles,
} from "./components";

export default function App() {
  return (
    <main>
      <Styles />
      <SettingsSection setting="colors" render={ColorPicker} />
      <SettingsSection setting="mappings" render={MappingPicker} />
    </main>
  );
}
