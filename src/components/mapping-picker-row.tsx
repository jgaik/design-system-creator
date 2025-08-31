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
  const shades = useStore((state) => state.colors);
  const setMapping = useStore((state) => state.setMapping);

  const mappingVariable = `--${mapping}-${name}`;

  const shadesInfo = useMemo(
    () =>
      getTypedObjectEntries(shades)
        .map(([color, info]) =>
          info.shades.map(
            ([lightness, shade]) =>
              [
                `--color-${color}-${lightness}`,
                shade,
                lightness >= 50 ? "white" : "black",
              ] as const
          )
        )
        .flat(),
    [shades]
  );

  const getSelectStyle = (mappingValue: string) => {
    const [, backgroundColor, color] = getNonNullable(
      shadesInfo.find(([shade]) => shade === mappingValue),
      "shade for a mapping value"
    );

    return { backgroundColor, color };
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
          {shadesInfo.map(([shadeName, shadeColor, color]) => (
            <option
              key={shadeName}
              value={shadeName}
              style={{ backgroundColor: shadeColor, color }}
            >
              {shadeName}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
};
