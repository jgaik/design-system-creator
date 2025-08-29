import { getTypedObjectKeys } from "@yamori-shared/react-utilities";
import { SettingsSection, Styles } from "./components";
import { INITIAL_STATE } from "./constants";

export default function App() {
  return (
    <main>
      <Styles />
      {getTypedObjectKeys(INITIAL_STATE).map((setting) => (
        <SettingsSection key={setting} setting={setting} />
      ))}
    </main>
  );
}
