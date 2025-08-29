import {
  getNonNullable,
  getTypedObjectEntries,
} from "@yamori-shared/react-utilities";
import { useStore } from "../store";
import type { Mappings } from "../types";
import { useMemo } from "react";

type MappingPickerProps = {
  name: Mappings;
};

export const MappingPicker: React.FC<MappingPickerProps> = ({ name }) => {
  const shades = useStore((state) => state.colors);
  const mapping = useStore((state) => state.mappings[name]);
  const setMapping = useStore((state) => state.setMapping);

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

  const mappingEntries = useMemo(() => Object.entries(mapping), [mapping]);

  return (
    <>
      <tr>
        <th scope="row" rowSpan={mappingEntries.length + 1}>
          {name}
        </th>
      </tr>
      {mappingEntries.map(([mappingName, mappingValue]) => {
        const mappingVariable = `--${name}-${mappingName}`;

        return (
          <tr key={mappingName}>
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
                  setMapping(name, mappingName, e.currentTarget.value);
                  e.currentTarget.size = 1;
                  e.currentTarget.blur();
                }}
                style={getSelectStyle(mappingValue)}
                value={mappingValue}
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
      })}
    </>
  );
};
