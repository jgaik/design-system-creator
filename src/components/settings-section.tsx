import { useMemo } from "react";
import { useStore } from "../store";
import type { StoreState } from "../types";
import { ColorPicker } from "./color-picker";
import { MappingPicker } from "./mapping-picker";

const SETTING_RENDER: {
  [Setting in keyof StoreState]: {
    render: React.FC<{ name: keyof StoreState[Setting] }>;
    columns: Array<string>;
  };
} = {
  color: {
    render: ColorPicker,
    columns: ["Color", "Shades", "Variables"],
  },
  mappings: {
    render: MappingPicker,
    columns: ["Name", "Variable", "Value"],
  },
};

type SettingsSectionProps<Setting extends keyof StoreState> = {
  setting: Setting;
};

export const SettingsSection = <Setting extends keyof StoreState>({
  setting,
}: SettingsSectionProps<Setting>) => {
  const storeSetting = useStore((state) => state[setting]);

  const { render: Render, columns } = useMemo(
    () => SETTING_RENDER[setting],
    [setting]
  );

  return (
    <details name="settings">
      <summary>{setting.toUpperCase()}</summary>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <td key={col}>{col}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(storeSetting).map((settingKey) => (
            <Render
              key={settingKey}
              name={settingKey as keyof StoreState[Setting]}
            />
          ))}
        </tbody>
      </table>
    </details>
  );
};
