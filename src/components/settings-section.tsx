import { useStore } from "../store";
import type { StoreState } from "../types";

type SettingsSectionProps<Setting extends keyof StoreState> = {
  setting: Setting;
  render: React.FC<{ name: keyof StoreState[Setting] }>;
};

export const SettingsSection = <Setting extends keyof StoreState>({
  setting,
  render: Render,
}: SettingsSectionProps<Setting>) => {
  const storeSetting = useStore((state) => state[setting]);

  return (
    <details name="settings">
      <summary>{setting.toUpperCase()}</summary>
      <ul>
        {Object.keys(storeSetting).map((settingKey) => (
          <li key={settingKey}>
            <Render name={settingKey as keyof StoreState[Setting]} />
          </li>
        ))}
      </ul>
    </details>
  );
};
