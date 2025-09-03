import {
  getNonNullable,
  getTypedObjectEntries,
} from "@yamori-shared/react-utilities";
import { useStore } from "../store";
import type { Mappings } from "../types";
import { useMemo } from "react";

type MappingPickerRowProps = {
  mapping: Mappings;
  name: string;
  value: string;
};

export const MappingPickerRow: React.FC<MappingPickerRowProps> = ({
  mapping,
  name,
  value,
}) => {
  const shades = useStore((state) => state.color);
  const setMapping = useStore((state) => state.setMapping);

  const mappingVariable = `--${mapping}-${name}`;

  const shadesInfo = useMemo(
    () =>
      getTypedObjectEntries(shades)
        .map(([color, info]) =>
          Object.keys(info)
            .filter((key) => /^\d+$/.test(key))
            .map(
              (lightness) =>
                [
                  `--color-${color}-${lightness}`,
                  parseInt(lightness, 10) >= 50 ? "white" : "black",
                ] as const
            )
        )
        .flat(),
    [shades]
  );

  const getSelectStyle = (mappingValue: string) => {
    const [shadeName, color] = getNonNullable(
      shadesInfo.find(([shade]) => shade === mappingValue),
      "shade for a mapping value"
    );

    return { backgroundColor: `var(${shadeName})`, color };
  };

  return (
    <tr key={name}>
      <td>
        <label htmlFor={mappingVariable}>{mappingVariable}</label>
      </td>
      <td>
        <select
          id={mappingVariable}
          onFocus={(e) => {
            e.currentTarget.size = shadesInfo.length;
          }}
          onBlur={(e) => {
            e.currentTarget.size = 0;
          }}
          onChange={(e) => {
            setMapping(mapping, name, e.currentTarget.value);
            e.currentTarget.size = 1;
            e.currentTarget.blur();
          }}
          style={getSelectStyle(value)}
          value={value}
        >
          {shadesInfo.map(([shadeName, color]) => (
            <option
              key={shadeName}
              value={shadeName}
              style={{ backgroundColor: `var(${shadeName})`, color }}
            >
              {shadeName}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
};
